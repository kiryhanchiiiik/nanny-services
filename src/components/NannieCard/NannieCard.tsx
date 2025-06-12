import css from "./NannieCard.module.scss";
import sprite from "../../img/sprite.svg";

interface Review {
  comment: string;
  rating: number;
  reviewer: string;
}

interface Nannie {
  about: string;
  avatar_url: string;
  birthday: string;
  characters: string;
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
  showMore: number | null;
  toggleReadMore: (index: number) => void;
}

const NannieCard: React.FC<Props> = ({ nanny, showMore, toggleReadMore }) => {
  const index = nanny.name.length;

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
            {/* {} */}
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
                <button
                  type="button"
                  // onClick={() => toggleFavorite(teacher, index)}
                >
                  <svg width={27} height={27}>
                    <use href={`${sprite}#${"heart"}`}></use>
                  </svg>
                </button>
              </div>
            </div>
            {/* {} */}
          </div>

          <div className={css.teacherInfo}>
            <div className={css.teacherInfoContainer}>
              <span className={css.spanWord}>Education:</span>
              <p className={css.infoWrapper}>{nanny.education}</p>
            </div>

            <div className={css.teacherInfoContainer}>
              <span className={css.spanWord}>Experience:</span>
              <p className={css.infoWrapper}>{nanny.experience}</p>
            </div>

            <div className={css.teacherInfoContainer}>
              <span className={css.spanWord}>Location:</span>
              <p className={css.infoWrapper}>{nanny.location}</p>
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
                      <div className={css.moreInfoItem}>
                        <div>
                          <span className={css.spanWord}>
                            {review.reviewer}
                          </span>
                          <p className={css.infoWrapper}>
                            <svg width={16} height={16}>
                              <use href={`${sprite}#star`}></use>
                            </svg>{" "}
                            {review.rating}.0
                          </p>
                        </div>
                      </div>
                      <p className={css.infoWrapper}>{review.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default NannieCard;
