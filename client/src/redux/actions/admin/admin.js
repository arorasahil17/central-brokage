import axios from "axios";
export const ADMIN_AUTH_REQUEST = "ADMIN_AUTH_REQUEST";
export const ADMIN_AUTH = "ADMIN_AUTH";
export const ADMIN_AUTH_ERROR = "ADMIN_AUTH_ERROR";
export const ADMIN_LOGIN_REQUEST = "ADMIN_LOGIN_REQUEST";
export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const ADMIN_LOGIN_ERROR = "ADMIN_LOGIN_ERROR";
export const ADMIN_REGISTER_REQUEST = "ADMIN_REGISTER_REQUEST";
export const ADMIN_REGISTER = "ADMIN_REGISTER";
export const ADMIN_REGISTER_ERROR = "ADMIN_REGISTER_ERROR";
export const CLEAR_ADMIN = "CLEAR_ADMIN";
export const FORGET_PASSWORD_REQUEST = "FORGET_PASSWORD_REQUEST";
export const FORGET_PASSWORD = "FORGET_PASSWORD";
export const FORGET_PASSWORD_ERROR = "FORGET_PASSWORD_ERROR";
export const CHANGE_PASSWORD_ADMIN_REQ = "CHANGE_PASSWORD_ADMIN_REQ";
export const CHANGE_PASSWORD_ADMIN = "CHANGE_PASSWORD_ADMIN";
export const CHANGE_PASSWORD_ADMIN_ERR = "CHANGE_PASSWORD_ADMIN_ERR";

export const adminAuth = (navigate) => async (dispatch) => {
  // dispatch({ type: ADMIN_AUTH_REQUEST });
  try {
    const response = await axios.get("/api/admin-auth");

    if (response.data.success) {
      dispatch({ type: ADMIN_AUTH });
      navigate("/admin");
    }
  } catch (error) {
    navigate("/admin/sign");
    dispatch({
      type: ADMIN_AUTH_ERROR,
      errorMessage: error.response.data.message,
    });
  }
};

export const adminLogin =
  (username, password, navigate) => async (dispatch) => {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    try {
      const res = await axios.post("/api/admin-login", { username, password });
      if (res.data.status) {
        dispatch({ type: ADMIN_LOGIN, payload: res.data });
        navigate("/admin");
      }
    } catch (error) {
      dispatch({
        type: ADMIN_LOGIN_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const adminRegister = (formData, navigate) => async (dispatch) => {
  dispatch({ type: ADMIN_REGISTER_REQUEST });
  try {
    const res = await axios.post("/api/admin-sign", formData);
    if (res.data.status) {
      dispatch({ type: ADMIN_REGISTER, payload: res.data });
      navigate("/admin/sign");
    }
  } catch (error) {
    dispatch({
      type: ADMIN_REGISTER_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const forgetPasswordAdmin = (email) => async (dispatch) => {
  dispatch({ type: FORGET_PASSWORD_REQUEST });
  try {
    const res = await axios.post("/api/admin/password-reset", { email });
    if (res.data.status) {
      dispatch({ type: FORGET_PASSWORD, payload: res.data });
      // navigate("/admin/password-change");
    }
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const changePasswordAdmin =
  (token, newPassword, navigate) => async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_ADMIN_REQ });
    try {
      const res = await axios.post(
        `/api/admin/password-change?token=${token}`,
        { newPassword }
      );
      if (res.data.status) {
        dispatch({ type: CHANGE_PASSWORD_ADMIN });
        navigate("/admin/sign");
      }
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_ADMIN_ERR,
        payload: error.response.data.message,
      });
    }
  };
