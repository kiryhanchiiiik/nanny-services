import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import sprite from "../../img/sprite.svg";
import css from "./Filters.module.scss";
type FilterOption = {
  label: string;
  value: string;
};
const Filters = () => {
  const [filters, setFilters] = useState<FilterOption[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await axiosInstance.get("/filters.json");
        setFilters(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className={css.wrapper} ref={dropdownRef}>
      <label className={css.label}>Filters</label>
      <div className={css.customSelect}>
        <button
          type="button"
          className={css.selectButton}
          onClick={handleToggle}
        >
          {selectedFilter || "Select filter"}
          <div className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}>
            <svg className={css.svg} width="12" height="12">
              <use href={`${sprite}#down`} />
            </svg>
          </div>
        </button>
        {isOpen && filters && (
          <ul className={css.dropdownList}>
            {filters.map((filter) => (
              <li
                key={filter.value}
                className={css.dropdownItem}
                onClick={() => {
                  setSelectedFilter(filter.label);
                  setIsOpen(false);
                }}
              >
                {filter.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filters;
