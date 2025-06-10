import css from "./HomePage.module.scss";
import sprite from "../../img/sprite.svg";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

const HomePage = () => {
  return (
    <section className={css.homePage}>
      <div className={css.homePagePosition}>
        <Header />

        <div className={css.heroSection}>
          <div className={css.heroContent}>
            <h1>Make Life Easier for the Family:</h1>
            <p>Find Babysitters Online for All Occasions</p>
            <Link to="/nannies" className={css.getStarted}>
              Get started{" "}
              <span>
                <svg width={20} height={20}>
                  <use href={`${sprite}#rotate-arrow`}></use>
                </svg>
              </span>
            </Link>
          </div>

          <div className={css.heroImage}>
            <div className={css.nanniesBadge}>
              <div className={css.checkIcon}>
                <span>
                  <svg width={30} height={30}>
                    <use href={`${sprite}#check`}></use>
                  </svg>
                </span>
              </div>
              <div className={css.expNannie}>
                <p>Experienced nannies</p>
                <span>15,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
