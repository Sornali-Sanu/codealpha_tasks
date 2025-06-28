import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img src={PF + user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.userName}</span>
    </li>
  );
}
