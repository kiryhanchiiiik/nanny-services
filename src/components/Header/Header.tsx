import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.scss";

type HeaderProps = {
  fullWidth?: boolean;
  theme?: "red" | "white";
};

const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(css.linkWrapper, isActive && css.active);

const Header = ({ fullWidth = false, theme = "red" }: HeaderProps) => {
  return (
    <header
      className={clsx(css.headerNav, {
        [css.fullWidth]: fullWidth,
        [css.redTheme]: theme === "red" && !fullWidth,
        [css.whiteTheme]: theme === "white",
      })}
    >
      <div className={css.headerBackground} />
      <div className={css.headerContent}>
        <NavLink to="/" className={css.logo}>
          Nanny.Services
        </NavLink>
        <div className={css.navAndBtn}>
          <ul className={css.navList}>
            <li>
              <NavLink to="/" className={buildLinkClass}>
                Home <span className={css.dot}></span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/nannies" className={buildLinkClass}>
                Nannies <span className={css.dot}></span>
              </NavLink>
            </li>
          </ul>
          <div className={css.btnContainer}>
            <button className={css.loginBtn}>Log In</button>
            <button className={css.regBtn}>Registration</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
