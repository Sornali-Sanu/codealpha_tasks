import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "./../../components/rightbar/Rightbar";
import Feed from "./../../components/feed/Feed";
import "./home.css";
import { useState } from "react";

export default function Home() {
  const [viewMode, setViewMode] = useState("timeline"); // timeline or all

  return (
    <>
      <Topbar viewMode={viewMode} setViewMode={setViewMode} />
      <div className="homeContainer">
        <Sidebar />

        <div className="homeFeed">
          <Feed viewMode={viewMode} />
        </div>

        <Rightbar />
      </div>
    </>
  );
}
