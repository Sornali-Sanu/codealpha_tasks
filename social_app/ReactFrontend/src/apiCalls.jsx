import axios from "axios";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      `${VITE_API_BASE_URL}/api/auth/login`,
      userCredential
    );

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: err,
    });
  }
};
