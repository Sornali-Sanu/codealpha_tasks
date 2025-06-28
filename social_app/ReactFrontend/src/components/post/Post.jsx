import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
export default function Post({ post }) {
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes.length);
  const [islike, setisLike] = useState(false);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  useEffect(() => {
    setisLike(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(islike ? like - 1 : like + 1);
    setisLike(!islike);
  };

  return (
    <div className="post">
      <div className="postWraper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePictue
                    ? PF + user.profilePictue
                    : PF + "profile/noAvater.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>

            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUpIcon
              htmlColor="blue"
              className="LikeIcon"
              onClick={likeHandler}
            />
            <FavoriteIcon
              htmlColor="red"
              className="heartIcon"
              onClick={likeHandler}
            />

            <span className="postLikeCount">{like} likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
