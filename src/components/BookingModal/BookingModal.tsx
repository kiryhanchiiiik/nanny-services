import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Modal from "../Modal/Modal";
import css from "./BookingModal.module.scss";
import TimePicker from "../TimePicker/TimePicker";

interface BookScheme {
  address: string;
  phone: string;
  childAge: string;
  email: string;
  parentName: string;
  comment: string;
  meetingTime: string;
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
  address: Yup.string().required("Required!"),
  phone: Yup.string()
    .matches(/^\+?[0-9\s\-]{7,15}$/, "Enter a valid phone number")
    .required("Required!"),
  childAge: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email").required("Required!"),
  parentName: Yup.string().required("Required!"),
  meetingTime: Yup.string().required("Select a time"),
  comment: Yup.string().default(""),
});

const BookingModal = ({ nanny, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<BookScheme>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      address: "",
      phone: "+380",
      childAge: "",
      email: "",
      parentName: "",
      comment: "",
      meetingTime: "",
    },
  });

  const onSubmit = async (data: BookScheme) => {
    console.log(data);
    toast.success("Your request has been sent!npm");
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
          <div className={css.flexWrapper}>
            <div className={css.formGroup}>
              <label>
                Address
                {errors.address && (
                  <span className={css.error}> - {errors.address.message}</span>
                )}
              </label>
              <input
                className={css.input}
                {...register("address")}
                placeholder="Address"
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
                placeholder="+380"
              />
            </div>
          </div>

          <div className={css.flexWrapper}>
            <div className={css.formGroup}>
              <label>
                Child's age
                {errors.childAge && (
                  <span className={css.error}>
                    {" "}
                    - {errors.childAge.message}
                  </span>
                )}
              </label>
              <input
                type="text"
                className={css.input}
                {...register("childAge")}
                placeholder="Age in years"
              />
            </div>

            <Controller
              name="meetingTime"
              control={control}
              render={({ field }) => (
                <div className={css.formGroup}>
                  <label>
                    Meeting time
                    {errors.meetingTime && (
                      <span className={css.error}>
                        {" "}
                        - {errors.meetingTime.message}
                      </span>
                    )}
                  </label>
                  <TimePicker value={field.value} onChange={field.onChange} />
                </div>
              )}
            />
          </div>

          <div className={css.formGroupFlex}>
            <label>
              Email
              {errors.email && (
                <span className={css.error}> - {errors.email.message}</span>
              )}
            </label>
            <input
              className={`${css.input} ${css.inputFlex}`}
              {...register("email")}
              placeholder="Email"
            />
          </div>

          <div className={css.formGroupFlex}>
            <label>
              Name
              {errors.parentName && (
                <span className={css.error}>
                  {" "}
                  - {errors.parentName.message}
                </span>
              )}
            </label>
            <input
              className={`${css.input} ${css.inputFlex}`}
              {...register("parentName")}
              placeholder="Father's or mother's name"
            />
          </div>

          <div className={css.formGroupFlex}>
            <label>
              Comment
              {errors.comment && (
                <span className={css.error}> - {errors.comment.message}</span>
              )}
            </label>
            <textarea
              className={`${css.input} ${css.inputFlex} ${css.textarea}`}
              {...register("comment")}
              placeholder="Comment..."
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
