import axios from "../services/axiosInterceptor";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
