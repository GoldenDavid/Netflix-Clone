import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import "./navbar.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import { logout } from "../../authContext/AuthAction";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  window.onscroll = () => {
    if (window.pageYOffset) {
      setIsScrolled(true);
    } else setIsScrolled(false);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          ></img>
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
