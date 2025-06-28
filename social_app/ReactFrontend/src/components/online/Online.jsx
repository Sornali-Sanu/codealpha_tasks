import "./online.css";
export default function Online({ user }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={PF + user.profilePicture}
          alt=""
          className="rightbarProfileImg"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUserName">{user.userName}</span>
    </li>
  );
}
