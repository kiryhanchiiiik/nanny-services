import { useState, useRef, useEffect } from "react";
import sprite from "../../img/sprite.svg";
import css from "./TimePicker.module.scss";

interface TimePickerProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

const times = ["09:00", "09:30", "10:00", "10:30"];

const TimePicker = ({ value, onChange, error }: TimePickerProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={css.container}>
      <div onClick={() => setOpen(!open)} className={css.inputBox}>
        {value || "00:00"}{" "}
        <span className={css.icon}>
          <svg width={23} height={23}>
            <use href={`${sprite}#clock`}></use>
          </svg>
        </span>
      </div>

      {open && (
        <div className={css.dropdown}>
          <p className={css.title}>Meeting time</p>
          {times.map((t) => (
            <div
              key={t}
              className={`${css.option} ${t === value ? css.active : ""}`}
              onClick={() => {
                onChange(t);
                setOpen(false);
              }}
            >
              {t}
            </div>
          ))}
        </div>
      )}

      {error && <span className={css.error}>{error}</span>}
    </div>
  );
};

export default TimePicker;
