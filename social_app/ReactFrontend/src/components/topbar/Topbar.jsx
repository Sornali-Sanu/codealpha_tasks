
import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar({ viewMode, setViewMode }) {
  const { user } = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocialApp</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for Friend, post or Video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {}
          <span
            className={`topbarLink ${
              viewMode === "all" ? "activeTopbarLink" : ""
            }`}
            onClick={() => setViewMode("all")}
            style={{ cursor: "pointer" }}
          >
            Homepage
          </span>
          <span
            className={`topbarLink ${
              viewMode === "timeline" ? "activeTopbarLink" : ""
            }`}
            onClick={() => setViewMode("timeline")}
            style={{ cursor: "pointer" }}
          >
            Timeline
          </span>
          <span className="topbarLink">
            <button onClick={handleLogout} className="logoutButton">
              Logout
            </button>
          </span>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
      </div>
      {user ? (
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePictue
                ? PF + user.profilePictue
                : PF + "profile/noAvater.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      ) : (
        <Link to="/login">
          <img src={PF + "profile/noAvatar.png"} alt="" className="topbarImg" />
        </Link>
      )}
    </div>
  );
}
