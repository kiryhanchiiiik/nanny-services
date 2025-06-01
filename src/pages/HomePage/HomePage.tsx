import css from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <section className={css.homePage}>
      <nav className={css.headerNav}>
        <a className={css.logo} href="#">
          Nanny.Services
        </a>
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
      </nav>

      <div className={css.heroSection}>
        <div className={css.heroContent}>
          <h1>Make Life Easier for the Family:</h1>
          <p>Find Babysitters Online for All Occasions</p>
          <button className={css.getStarted}>
            Get started <span>&rarr;</span>
          </button>
        </div>

        <div className={css.heroImage}>
          <div className={css.nanniesBadge}>
            <div className={css.checkIcon}>✔</div>
            <div>
              <span>Experienced nannies</span>
              <strong>15,000</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
