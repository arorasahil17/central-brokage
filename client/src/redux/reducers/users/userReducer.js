import {
  BOOK_LOAD_ERROR,
  BOOK_LOAD_REQUEST,
  BOOK_LOAD_SUCCESS,
  CLEAR_MESSAGE,
} from "../../actions/bookings/booking";
import {
  CANCEL_BOOKING_ERROR,
  CANCEL_BOOKING_REQUEST,
  CANCEL_BOOKING_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CLEAR_USER_MESSAGE,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  GET_USER_BOOKINGS,
  GET_USER_BOOKINGS_REQUEST,
  INIT_USER,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  NEW_PASSWORD_ERROR,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESEND_OTP_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_PROCESSING,
  UPDATE_USER_REQUEST,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
} from "../../actions/users/userActions";

const initialStateUser = {
  users: null,
  user: null,
  success: "",
  isLoading: false,
  error: "",
  userId: "",
  bookings: [],
};

const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.payload };
    case INIT_USER:
      return { ...state, user: action.payload, isLoading: false };
    case REGISTER_USER_REQUEST:
      return { ...state, isLoading: true };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        user: action.payload.data,
      };
    case REGISTER_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case VERIFY_OTP_REQUEST:
      return { ...state, isLoading: true };
    case VERIFY_OTP_SUCCESS:
      return { ...state, isLoading: false, success: action.payload.message };
    case VERIFY_OTP_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case RESEND_OTP_REQUEST:
      return { ...state, isLoading: true };
    case RESEND_OTP_SUCCESS:
      return { ...state, isLoading: false, success: action.payload };
    case RESEND_OTP_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        success: "Logged in",
      };
    case LOGIN_FAILURE:
      if (
        action.payload.includes(
          "Operation `users.findOne()` buffering timed out"
        )
      ) {
        return {
          ...state,
          isLoading: false,
          error: "Server not responding. Please try again after sometimes",
        };
      }
      return { ...state, isLoading: false, error: action.payload };
    case CLEAR_USER_MESSAGE:
      return { ...state, error: "", success: "", isLoading: false };
    case UPDATE_USER_PROCESSING:
      return { ...state, isLoading: true };
    case UPDATE_USER_REQUEST:
      return { ...state, isLoading: false, success: action.payload.message };
    case UPDATE_USER_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case BOOK_LOAD_REQUEST:
      return { ...state, isLoading: true };
    case BOOK_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookings: [...state.bookings, action.payload.booking],
        success: "Booking Successfull",
      };
    case BOOK_LOAD_ERROR:
      if (
        action.payload.toLowerCase() === "invalid signature" ||
        action.payload.toLowerCase() === "jwt expired"
      ) {
        return { ...state, isLoading: false, error: "Please login first" };
      }
      return { ...state, isLoading: false, error: action.payload };
    case CLEAR_MESSAGE:
      return { ...state, isLoading: false, success: "", error: "" };
    case UPDATE_PROFILE_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        user: action.payload.user,
      };
    case UPDATE_PROFILE_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case GET_USER_BOOKINGS_REQUEST:
      return { ...state, isLoading: true };
    case GET_USER_BOOKINGS:
      return { ...state, isLoading: false, bookings: action.payload.data };
    case CANCEL_BOOKING_REQUEST:
      return { ...state, isLoading: true };
    case CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload.message,
        bookings: action.payload.bookings,
      };
    case CANCEL_BOOKING_ERROR:
      return {
        ...state,
        isLoading: false,
        error: "Something went wrong please try again after sometime",
      };
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, isLoading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, success: action.payload.message };
    case CHANGE_PASSWORD_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case FORGET_PASSWORD_REQUEST:
      return { ...state, isLoading: true };
    case FORGET_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, success: action.payload.message };
    case FORGET_PASSWORD_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case NEW_PASSWORD_REQUEST:
      return { ...state, isLoading: true };
    case NEW_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, success: action.payload.message };
    case NEW_PASSWORD_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case LOGOUT_USER_REQUEST:
      return { ...state, isLoading: true };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: "Logout Successfull",
        user: null,
      };
    case LOGOUT_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case DELETE_USER_REQUEST:
      return { ...state, isLoading: true };
    case DELETE_USER_SUCCESS:
      return { ...state, isLoading: false, success: "User Deleted" };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: "Something went wrong, please try again after sometime",
      };
    default:
      return state;
  }
};

export { userReducer };
