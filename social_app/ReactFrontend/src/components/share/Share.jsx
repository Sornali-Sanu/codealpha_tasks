import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const desc = useRef();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      data.append("file", file);

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/upload`,
          data
        );

        newPost.img = res.data.filename;
      } catch (err) {
        console.log("Upload error:", err);
      }
    }

    try {
      await axios.post("/api/posts", newPost);
      // window.location.reload();
      navigate(0);
    } catch (err) {
      console.log("Post creation error:", err);
    }
  };
  return (
    <>
      <div className="share">
        <div className="shareWraper">
          <div className="shareTop">
            <img
              src={
                user.profilePictue
                  ? PF + user.profilePictue
                  : PF + "profile/noAvater.png"
              }
              alt=""
              className="shareProfileImg"
            />
            <input
              type="text"
              className="shareInput"
              placeholder={"What's in your mind " + user.username + " ?"}
              ref={desc}
            />
          </div>

          <hr className="shareHr" />

          <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="shareOption">
                <LabelIcon htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <AddLocationIcon htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotionsIcon
                  htmlColor="goldenrod"
                  className="shareIcon"
                />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
