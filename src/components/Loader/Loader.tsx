import { HashLoader } from "react-spinners";
const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HashLoader color="#F03F3B" />
    </div>
  );
};

export default Loader;
