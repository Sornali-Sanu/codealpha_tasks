import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password didn't match!!!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const res = await axios.post("/api/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWraper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocialApp
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              className="loginInput"
              required
            />
            <input
              placeholder="Email"
              ref={email}
              className="loginInput"
              required
              type="email"
            />

            <input
              placeholder="Password"
              ref={password}
              className="loginInput"
              required
              type="password"
              minLength={6}
            />
            <input
              placeholder="Confirm Password"
              type="password"
              className="loginInput"
              ref={passwordAgain}
              required
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>

            <button className="loginRegister">Log Into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
