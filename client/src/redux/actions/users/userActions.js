import axios from "axios";
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_REQUEST";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";
export const VERIFY_OTP_REQUEST = "VERIFY_OTP_REQUEST";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILURE = "VERIFY_OTP_FAILURE";
export const RESEND_OTP_REQUEST = "RESEND_OTP_REQUEST";
export const RESEND_OTP_FAILURE = "RESEND_OTP_FAILURE";
export const RESEND_OTP_SUCCESS = "RESEND_OTP_SUCCESS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const CLEAR_USER_MESSAGE = "CLEAR_USER_MESSAGE";
export const INIT_USER = "INIT_USER";
export const INIT_USER_REQ = "INIT_USER_REQ";
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const UPDATE_USER_PROCESSING = "UPDATE_USER_PROCESSING";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_ERROR = "UPDATE_USER_ERROR";
export const SET_USERID = "SET_USERID";
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";
export const GET_USER_BOOKINGS = "GET_USER_BOOKINGS";
export const GET_USER_BOOKINGS_REQUEST = "GET_USER_BOOKINGS_REQUEST";
export const CANCEL_BOOKING_REQUEST = "CANCEL_BOOKING_REQUEST";
export const CANCEL_BOOKING_SUCCESS = "CANCEL_BOOKING_SUCCESS";
export const CANCEL_BOOKING_ERROR = "CANCEL_BOOKING_ERROR";
export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";
export const FORGET_PASSWORD_REQUEST = "FORGET_PASSWORD_REQUEST";
export const FORGET_PASSWORD_SUCCESS = "FORGET_PASSWORD_SUCCESS";
export const FORGET_PASSWORD_ERROR = "FORGET_PASSWORD_ERROR";
export const NEW_PASSWORD_REQUEST = "NEW_PASSWORD_REQUEST";
export const NEW_PASSWORD_SUCCESS = "NEW_PASSWORD_SUCCESS";
export const NEW_PASSWORD_ERROR = "NEW_PASSWORD_ERROR";
export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const response = await axios.get("/api/users");
    if (response.data.status) {
      console.log("fetch");
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data.users });
    }
  } catch (err) {
    dispatch({ type: "FETCH_USER_ERROR" });
  }
};

export const checkAuth = () => async (dispatch) => {
  dispatch({ type: INIT_USER_REQ });
  try {
    const response = await axios.get("/api/check-auth");
    if (response.data.status) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({ type: INIT_USER, payload: response.data.user });
    }
  } catch (error) {
    dispatch({ type: "INIT_USER_ERROR" });
  }
};

const registerUserRequest = () => ({ type: REGISTER_USER_REQUEST });

const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

export const regitserUser = (user, navigate) => async (dispatch) => {
  dispatch(registerUserRequest());
  try {
    const response = await axios.post("/api/sign-up", user);
    if (response.data.status) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/verify-otp");
    }
  } catch (err) {
    dispatch(registerUserFailure(err.response.data.message));
  }
};

export const verifyOtpRequest = () => ({ type: VERIFY_OTP_REQUEST });

export const verifyOtpFailure = (error) => ({
  type: VERIFY_OTP_FAILURE,
  payload: error,
});

export const verifyOtp = (email, otp, navigate) => async (dispatch) => {
  dispatch(verifyOtpRequest());
  try {
    const response = await axios.post("/api/verify-otp", { email, otp });
    if (response.data.status) {
      navigate("/login");
      dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data });
    }
  } catch (err) {
    dispatch(verifyOtpFailure(err.response.data.message));
  }
};

export const resendOtp = (email) => async (dispatch) => {
  dispatch({ type: RESEND_OTP_FAILURE });
  try {
    const response = await axios.post("/api/resend-otp", { email });
    if (response.data.status) {
      dispatch({ type: RESEND_OTP_SUCCESS, payload: response.data.message });
    }
  } catch (error) {
    dispatch({
      type: RESEND_OTP_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const loginRequest = () => ({ type: LOGIN_REQUEST });

export const loginUser = (email, password, navigate) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post("/api/login", { email, password });
    if (response.data.status) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
      dispatch(checkAuth());
      navigate("/");
    }
  } catch (err) {
    dispatch(loginFailure(err.response.data.message));
  }
};

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const updateUserRequest = (id, status) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_PROCESSING });
  console.log(status);
  try {
    const response = await axios.patch(`/api/update-user-request/${id}`, {
      status,
    });
    dispatch({ type: UPDATE_USER_REQUEST, payload: response.data });
    dispatch(fetchUsers());
  } catch (error) {
    dispatch({ type: UPDATE_USER_ERROR, payload: error.response.data.message });
  }
};

export const setUserId = (user) => (dispatch) => {
  console.log(user);
  dispatch({ type: SET_USERID, payload: user._id });
};

export const updateUserProfile = (data) => async (dispatch) => {
  console.log("updated data", data);
  try {
    const response = await axios.put("/api/update-profile", data);

    if (response.data.status) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getUserBookings = () => async (dispatch) => {
  dispatch({ type: GET_USER_BOOKINGS_REQUEST });
  try {
    const res = await axios.get("/api/user-booking");
    if (res.data.status) {
      dispatch({ type: GET_USER_BOOKINGS, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: "GET_USER_BOOKING_FAILURE" });
  }
};

export const cancelBooking = (id) => async (dispatch) => {
  dispatch({ type: CANCEL_BOOKING_REQUEST });
  try {
    const res = await axios.patch(`/api/cancel-booking/${id}`);
    if (res.data.status) {
      dispatch({ type: CANCEL_BOOKING_SUCCESS, payload: res.data });
    }
  } catch (error) {
    dispatch({
      type: CANCEL_BOOKING_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });
    try {
      const response = await axios.post("/api/change-password", {
        oldPassword,
        newPassword,
      });
      if (response.data.status) {
        dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data });
      }
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const forgetPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGET_PASSWORD_REQUEST });
  try {
    const response = await axios.post("/api/forget-password", { email });
    if (response.data.status) {
      dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: response.data });
    }
  } catch (error) {
    if (error.message) {
      dispatch({ type: FORGET_PASSWORD_ERROR, payload: error.message });
      return;
    }
    dispatch({
      type: FORGET_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const newPasswordAC = (token, newPassword) => async (dispatch) => {
  dispatch({ type: NEW_PASSWORD_REQUEST });
  try {
    const response = await axios.post(`/api/reset-password?token=${token}`, {
      newPassword,
    });
    if (response.data.status) {
      dispatch({ type: NEW_PASSWORD_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  console.log("logout");
  dispatch({ type: LOGOUT_USER_REQUEST });
  try {
    const res = await axios.post("/api/logout");
    if (res.data.status) {
      dispatch({ type: LOGOUT_USER_SUCCESS });
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    const res = await axios.delete(`/api/delete-user/${id}`);
    if (res.data.status) {
      dispatch({ type: DELETE_USER_SUCCESS });
      dispatch(fetchUsers());
    }
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE });
  }
};

export const clearUserMessage = () => ({ type: CLEAR_USER_MESSAGE });
