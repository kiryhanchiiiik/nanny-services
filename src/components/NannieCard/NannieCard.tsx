import React from "react";
import css from "./NannieCard.module.scss";
import sprite from "../../img/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import { Bounce, toast } from "react-toastify";

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

interface Props {
  nanny: Nannie;
  index: number;
  showMore: number | null;
  toggleReadMore: (index: number) => void;
  onBookClick: (nanny: Nannie) => void;
}

const NannieCard: React.FC<Props> = ({
  nanny,
  index,
  showMore,
  toggleReadMore,
  onBookClick,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const favorites = useSelector((state: RootState) => state.favorites.items);

  const email = useSelector((state: RootState) => state.auth.user?.email ?? "");

  const isFavorite = favorites.some((fav) => fav.name === nanny.name);

  const handleFavoriteClick = () => {
    if (!email) {
      return toast.error("You need to be logged in to add favorites", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
    if (isFavorite) {
      dispatch(removeFavorite({ nanny, email }));
    } else {
      dispatch(addFavorite({ nanny, email }));
    }
  };

  const getAge = (birthDateString: string): number => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <li className={css.teachersContainerItem}>
      <div className={css.teachersItem}>
        <div className={css.photoWrapper}>
          <img
            className={css.teacherImg}
            src={nanny.avatar_url}
            alt={nanny.name}
          />
          <span className={css.status}>
            <svg width={12} height={12}>
              <use href={`${sprite}#online`}></use>
            </svg>
          </span>
        </div>

        <div className={css.descWrapper}>
          <div className={css.teacherDesc}>
            <div className={css.teacherName}>
              <p>Nanny</p>
              <h3>{nanny.name}</h3>
            </div>
            <div className={css.wrapperImgAndAchieve}>
              <div className={css.teacherAchieve}>
                <p className={css.flexGap}>
                  <span>
                    <svg width={16} height={16}>
                      <use href={`${sprite}#map`}></use>
                    </svg>
                  </span>
                  {nanny.location}
                </p>
                <span className={css.line}></span>
                <p className={css.flexGap}>
                  <span>
                    <svg width={16} height={16}>
                      <use href={`${sprite}#star`}></use>
                    </svg>
                  </span>
                  Rating: {nanny.rating}
                </p>
                <span className={css.line}></span>
                <p>
                  Price / 1 hour:{" "}
                  <span className={css.priceColor}>
                    {nanny.price_per_hour}$
                  </span>
                </p>
              </div>
              <div className={css.ImgHeart}>
                <button type="button" onClick={handleFavoriteClick}>
                  <svg width={27} height={27}>
                    <use
                      href={`${sprite}#${
                        isFavorite ? "filled-heart" : "heart"
                      }`}
                    ></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={css.teacherInfo}>
            <div className={css.teacherInfoWrapperFlex}>
              <div className={css.teacherInfoContainer}>
                <span className={css.spanWordSkills}>Age:</span>
                <p
                  className={`${css.infoWrapperSkills} ${css.infoWrapperSkillsUnderline}`}
                >
                  {getAge(nanny.birthday)}
                </p>
              </div>
              <div className={css.teacherInfoContainer}>
                <span className={css.spanWordSkills}>Experience:</span>
                <p className={css.infoWrapperSkills}>{nanny.experience}</p>
              </div>
              <div className={css.teacherInfoContainer}>
                <span className={css.spanWordSkills}>Kids age:</span>
                <p className={css.infoWrapperSkills}>{nanny.kids_age}</p>
              </div>
              <div className={css.teacherInfoContainer}>
                <span className={css.spanWordSkills}>Characters:</span>
                <p className={css.infoWrapperSkills}>
                  {nanny.characters
                    .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
                    .join(", ")}
                </p>
              </div>
              <div className={css.teacherInfoContainer}>
                <span className={css.spanWordSkills}>Education:</span>
                <p className={css.infoWrapperSkills}>{nanny.education}</p>
              </div>
            </div>

            <p className={css.moreInfoDesc}>{nanny.about}</p>

            {showMore !== index && (
              <button
                className={css.readMoreBtn}
                onClick={() => toggleReadMore(index)}
              >
                Read more
              </button>
            )}

            {showMore === index && (
              <div className={css.moreInfo}>
                <ul className={css.moreInfoList}>
                  {nanny.reviews.map((review, idx) => (
                    <li key={idx}>
                      <div className={css.moreInfoWrapper}>
                        <div className={css.moreInfoItem}>
                          <div className={css.letterIcon}>
                            {review.reviewer.charAt(0)}
                          </div>
                          <div>
                            <span className={css.spanWord}>
                              {review.reviewer}
                            </span>
                            <p className={css.infoWrapperRating}>
                              <svg width={16} height={16}>
                                <use href={`${sprite}#star`}></use>
                              </svg>{" "}
                              {Number(review.rating).toFixed(1)}
                            </p>
                          </div>
                        </div>
                        <p className={css.infoWrapperComment}>
                          {review.comment}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showMore === index && (
              <div>
                <button
                  type="button"
                  className={css.bookBtn}
                  onClick={() => onBookClick(nanny)}
                >
                  Make an appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default NannieCard;
