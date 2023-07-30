import "./loader.scss";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-container">
      <TailSpin
        height="60"
        width="60"
        color="#104e7a"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass="loader"
        visible={true}
      />
    </div>
  );
};

export default Loader;
