import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.scss";
import { useState } from "react";
import Modal from "../Modal/Modal";

type HeaderProps = {
  fullWidth?: boolean;
  theme?: "red" | "white";
};

const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(css.linkWrapper, isActive && css.active);

const Header = ({ fullWidth = false, theme = "red" }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsModalOpen(true);
  const closeRegisterModal = () => setIsModalOpen(false);

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
            <button className={css.loginBtn} onClick={openLoginModal}>
              Log In
            </button>
            <button className={css.regBtn} onClick={openRegisterModal}>
              Registration
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeRegisterModal}>
          <h2 className={css.regTitle}>Registration</h2>
          <p className={css.regSubTitle}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information
          </p>
          {/* <RegisterForm onSuccess={closeRegisterModal} /> */}
        </Modal>
      )}

      {isLoginModalOpen && (
        <Modal onClose={closeLoginModal}>
          <h2 className={css.regTitle}>Log In</h2>
          <p className={css.regSubTitle}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for an teacher.
          </p>
          {/* <LoginForm onSuccess={closeLoginModal} /> */}
        </Modal>
      )}
    </header>
  );
};

export default Header;
