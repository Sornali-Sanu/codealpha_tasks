import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username, viewMode }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res =
        username && viewMode !== "all"
          ? await axios.get("/api/posts/profile/" + username)
          : viewMode === "timeline"
          ? await axios.get("/api/posts/timeline/" + user._id)
          : await axios.get("/api/posts/all");

      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    };
    fetchPost();
  }, [username, user._id, viewMode]);

  return (
    <div className="feed">
      <div className="feedWraper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
