import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.scss";
import { useState } from "react";
import Modal from "../Modal/Modal";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { logoutUser } from "../../redux/auth/authSlice";
import sprite from "../../img/sprite.svg";

type HeaderProps = {
  fullWidth?: boolean;
  theme?: "red" | "white";
};

const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(css.linkWrapper, isActive && css.active);

const Header = ({ fullWidth = false, theme = "red" }: HeaderProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsModalOpen(true);
  const closeRegisterModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

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
          {user ? (
            <div className={css.userBox}>
              <div className={css.svgContainer}>
                <svg className={css.userIcon} width={24} height={24}>
                  <use href={`${sprite}#user`} />
                </svg>
              </div>
              <span className={css.userName}>{user.displayName}</span>
              <button className={css.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className={css.btnContainer}>
              <button className={css.loginBtn} onClick={openLoginModal}>
                Log In
              </button>
              <button className={css.regBtn} onClick={openRegisterModal}>
                Registration
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeRegisterModal}>
          <h2 className={css.regTitle}>Registration</h2>
          <p className={css.regSubTitle}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>
          <RegisterForm onSuccess={closeRegisterModal} />
        </Modal>
      )}

      {isLoginModalOpen && (
        <Modal onClose={closeLoginModal}>
          <h2 className={css.regTitle}>Log In</h2>
          <p className={css.regSubTitle}>
            Welcome back! Please enter your credentials to access your account
            and continue your babysitter search.
          </p>
          <LoginForm onSuccess={closeLoginModal} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
