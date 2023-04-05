import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";
export default function Watch() {
  const { movie } = useLocation().state;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        progress="true"
        autoPlay
        controls
        src={movie.video}
      ></video>
    </div>
  );
}
