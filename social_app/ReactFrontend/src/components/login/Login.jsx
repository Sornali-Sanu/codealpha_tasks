import "./login.css";
import { useContext, useRef, useEffect } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "./../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    loginCall({ email: emailValue, password: passwordValue }, dispatch);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Updated user saved to localStorage:", user);
    }
  }, [user]);

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
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              minLength={6}
              required
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForget">Forget Password?</span>
            <button
              className="loginRegister"
              type="button"
              onClick={() => navigate("/register")}
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Create a new Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
