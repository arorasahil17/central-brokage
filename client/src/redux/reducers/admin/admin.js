import {
  ADMIN_AUTH,
  ADMIN_AUTH_ERROR,
  ADMIN_AUTH_REQUEST,
  ADMIN_LOGIN,
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGIN_REQUEST,
  ADMIN_REGISTER,
  ADMIN_REGISTER_ERROR,
  ADMIN_REGISTER_REQUEST,
  CHANGE_PASSWORD_ADMIN,
  CHANGE_PASSWORD_ADMIN_ERR,
  CHANGE_PASSWORD_ADMIN_REQ,
  CLEAR_ADMIN,
  FORGET_PASSWORD,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_REQUEST,
} from "../../actions/admin/admin";

const initialState = {
  admin: {},
  success: "",
  error: "",
  isLoading: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return { ...state, isLoading: true };
    case ADMIN_REGISTER:
      return { ...state, isLoading: false, success: "Admin Registered" };
    case ADMIN_REGISTER_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ADMIN_AUTH_REQUEST:
      return { ...state, isLoading: true };
    case ADMIN_AUTH:
      return { ...state, isLoading: false, admin: action.payload };
    case ADMIN_AUTH_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ADMIN_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case ADMIN_LOGIN:
      return { ...state, isLoading: false, admin: action.payload };
    case ADMIN_LOGIN_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case FORGET_PASSWORD_REQUEST:
      return { ...state, isLoading: true };
    case FORGET_PASSWORD:
      return {
        ...state,
        isLoading: false,
        success: "We have sent you a reset password link on your email",
      };
    case FORGET_PASSWORD_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case CHANGE_PASSWORD_ADMIN_REQ:
      return { ...state, isLoading: true };
    case CHANGE_PASSWORD_ADMIN:
      return { ...state, isLoading: false };
    case CHANGE_PASSWORD_ADMIN_ERR:
      return { ...state, isLoading: false, error: action.payload };
    case CLEAR_ADMIN:
      return { ...state, isLoading: false, success: "", error: "" };
    default:
      return state;
  }
};
export { adminReducer };
