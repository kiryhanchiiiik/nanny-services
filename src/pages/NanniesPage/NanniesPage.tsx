import css from "./NanniesPage.module.scss";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import NannieCard from "../../components/NannieCard/NannieCard";

interface Review {
  comment: string;
  rating: number;
  reviewer: string;
}

interface Nannie {
  about: string;
  avatar_url: string;
  birthday: string;
  characters: string[];
  education: string;
  experience: string;
  kids_age: string;
  location: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Review[];
}
const NanniesPage = () => {
  const [nannies, setNannies] = useState<Nannie[]>([]);
  const [showMore, setShowMore] = useState<number | null>(null);

  useEffect(() => {
    const fetchNannies = async () => {
      try {
        const response = await axiosInstance.get("/nannies.json");
        setNannies(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNannies();
  }, []);

  const toggleReadMore = (index: number) => {
    setShowMore((prev) => (prev === index ? null : index));
  };

  return (
    <section className={css.nannies}>
      <Header fullWidth theme="white" />
      <Filters />

      <ul className={css.teacherList}>
        {nannies.map((nanny) => (
          <NannieCard
            key={nanny.name}
            nanny={nanny}
            showMore={showMore}
            toggleReadMore={toggleReadMore}
          />
        ))}
      </ul>
    </section>
  );
};

export default NanniesPage;
