// import Login from "./components/login/Login";
// import Register from "./components/register/Register";
// import Profile from "./pages/profile/Profile";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/home/Home";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";

// function App() {
//   const { user } = useContext(AuthContext);
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={user ? <Home /> : <Navigate to="/register" />}
//         />
//         <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
//         <Route
//           path="/register"
//           element={user ? <Navigate to="/" /> : <Register />}
//         />
//         <Route path="/profile/:username" element={<Profile />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
// import Login from "./components/login/Login";
// import Register from "./components/register/Register";
// import Profile from "./pages/profile/Profile";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/home/Home";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";
// function App() {
//   const { user, isInitialized } = useContext(AuthContext);

//   if (!isInitialized) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={user ? <Home /> : <Navigate to="/register" />}
//         />
//         <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
//         <Route
//           path="/register"
//           element={user ? <Navigate to="/" /> : <Register />}
//         />
//         <Route path="/profile/:username" element={<Profile />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./pages/profile/Profile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, isInitialized } = useContext(AuthContext);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
