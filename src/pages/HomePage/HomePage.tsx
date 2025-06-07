import css from "./HomePage.module.scss";
import sprite from "../../img/sprite.svg";

const HomePage = () => {
  return (
    <section className={css.homePage}>
      <div className={css.homePagePosition}>
        <nav className={css.headerNav}>
          <div className={css.logoContainer}>
            <a className={css.logo} href="#">
              Nanny.Services
            </a>
          </div>
          <div className={css.navAndBtn}>
            <ul className={css.navList}>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Nannies</a>
              </li>
            </ul>
            <div className={css.btnContainer}>
              <button className={css.loginBtn}>Log In</button>
              <button className={css.regBtn}>Registration</button>
            </div>
          </div>
        </nav>

        <div className={css.heroSection}>
          <div className={css.heroContent}>
            <h1>Make Life Easier for the Family:</h1>
            <p>Find Babysitters Online for All Occasions</p>
            <button className={css.getStarted}>
              Get started{" "}
              <span>
                <svg width={20} height={20}>
                  <use href={`${sprite}#rotate-arrow`}></use>
                </svg>
              </span>
            </button>
          </div>

          <div className={css.heroImage}>
            <div className={css.nanniesBadge}>
              <div className={css.checkIcon}>
                <svg width={30} height={30}>
                  <use href={`${sprite}#check`}></use>
                </svg>
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
