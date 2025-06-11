import css from "./NanniesPage.module.scss";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";

const NanniesPage = () => {
  return (
    <section className={css.nannies}>
      <Header fullWidth theme="white" />
      <Filters />
    </section>
  );
};

export default NanniesPage;
