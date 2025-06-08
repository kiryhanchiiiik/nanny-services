import css from "./NanniesPage.module.scss";
import Header from "../../components/Header/Header";

const NanniesPage = () => {
  return (
    <section className={css.nannies}>
      <Header fullWidth theme="white" />
    </section>
  );
};

export default NanniesPage;
