import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Modal from "../Modal/Modal";
import css from "./BookingModal.module.scss";

interface BookScheme {
  reason: string;
  name: string;
  email: string;
  phone: string;
}

interface Nannie {
  name: string;
  avatar_url: string;
}
interface Props {
  nanny: Nannie;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  reason: Yup.string().required("Please select a reason"),
  name: Yup.string()
    .min(3, "Too short!")
    .max(20, "Too long!")
    .required("Required!"),
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Required!"),
  phone: Yup.string()
    .matches(/^\+?[0-9\s\-]{7,15}$/, "Enter a valid phone number")
    .required("Required!"),
});

const BookingModal = ({ nanny, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookScheme>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      reason: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: BookScheme) => {
    console.log(data);
    toast.success("Booking successful!");
    reset();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.bookContainer}>
        <div className={css.bookDescContainer}>
          <h2 className={css.bookTrialTitle}>
            Make an appointment with a babysitter
          </h2>
          <p className={css.bookTrialSubTitle}>
            Arranging a meeting with a caregiver for your child is the first
            step to creating a safe and comfortable environment. Fill out the
            form below so we can match you with the perfect care partner.
          </p>
        </div>

        <div className={css.imageTextContainer}>
          <img className={css.avatar} src={nanny.avatar_url} alt={nanny.name} />
          <div className={css.teacherInfoContainer}>
            <p className={css.teacherName}>Your nanny</p>
            <p className={css.teacherNameSurname}>{nanny.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.formGroup}>
            <label>
              Name
              {errors.name && (
                <span className={css.error}> - {errors.name.message}</span>
              )}
            </label>
            <input
              className={css.input}
              {...register("name")}
              placeholder="Full Name"
            />
          </div>

          <div className={css.formGroup}>
            <label>
              Email
              {errors.email && (
                <span className={css.error}> - {errors.email.message}</span>
              )}
            </label>
            <input
              className={css.input}
              {...register("email")}
              placeholder="Email"
            />
          </div>

          <div className={css.formGroup}>
            <label>
              Phone
              {errors.phone && (
                <span className={css.error}> - {errors.phone.message}</span>
              )}
            </label>
            <input
              className={css.input}
              {...register("phone")}
              placeholder="Phone number"
            />
          </div>

          <button className={css.bookBtn} type="submit">
            Send
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default BookingModal;
