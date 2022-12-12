import { Spinner } from "../Spinner/Spinner";
import "./loader.scss";

type Props = {
  styles?: React.CSSProperties;
};

export const Loader = ({ styles }: Props) => {
  return (
    <div style={styles} className="loaderContainer">
      <Spinner />
    </div>
  );
};

export default Loader;
