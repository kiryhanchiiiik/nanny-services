import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
// import type { AppDispatch } from "../../redux/store";

import * as Yup from "yup";
import sprite from "../../img/sprite.svg";
import css from "./LoginForm.module.scss";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { loginUser } from "../../redux/auth/authSlice";

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Required!"),
  password: Yup.string().min(8, "Too short!").required("Required!"),
});

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const resultAction = await dispatch(
      loginUser({ email: data.email, password: data.password })
    );

    if (loginUser.fulfilled.match(resultAction)) {
      reset();
      onSuccess();
    } else {
      console.error("Login error:", resultAction.payload);

      toast.error("Incorrect email or password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div>
        <div className={css.labelWrapper}>
          <label htmlFor="email">Email</label>
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>
        <input
          className={css.input}
          type="email"
          {...register("email")}
          placeholder="Email"
        />
      </div>

      <div className={css.label}>
        <div className={css.labelWrapper}>
          <label htmlFor="password">Password</label>
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </div>
        <input
          className={`${css.input} ${css.lastInput}`}
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={css.eyeBtn}
          aria-label="Toggle password visibility"
        >
          <svg className={css.eyeIcon} width={25} height={25}>
            <use
              href={`${sprite}#${showPassword ? "icon-eye" : "icon-eye-off"}`}
            />
          </svg>
        </button>
      </div>

      <button className={css.registerBtn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
