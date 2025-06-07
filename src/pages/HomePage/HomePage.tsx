import css from "./HomePage.module.scss";
import sprite from "../../img/sprite.svg";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(css.linkWrapper, isActive && css.active);

const HomePage = () => {
  return (
    <section className={css.homePage}>
      <div className={css.homePagePosition}>
        <nav className={css.headerNav}>
          <div className={css.logoContainer}>
            <NavLink className={css.logo} to="/">
              Nanny.Services
            </NavLink>
          </div>
          <div className={css.navAndBtn}>
            <ul className={css.navList}>
              <li>
                <NavLink to="/" className={buildLinkClass}>
                  Home
                  <span className={css.dot}></span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/nannies" className={buildLinkClass}>
                  Nannies
                  <span className={css.dot}></span>
                </NavLink>
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
