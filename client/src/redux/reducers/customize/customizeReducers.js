import {
  CLEAR_CONTACT_MESSAGE,
  CLEAR_HERO_MESSAGE,
  CLEAR_SERVICE_MESSAGE,
  GET_CONTACT_FAILURE,
  GET_CONTACT_REQUEST,
  GET_CONTACT_SUCCESS,
  GET_HERO_FAILURE,
  GET_HERO_REQUEST,
  GET_HERO_SUCCESS,
  GET_SERVICES_FAILURE,
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  UPDATE_CONTACT_FAILURE,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_HERO_FAILURE,
  UPDATE_HERO_REQUEST,
  UPDATE_HERO_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
} from "../../actions/customize/customActions";

const initialStateHero = {
  details: {},
  isLoading: false,
  success: "",
  error: "",
};

const initialStateServices = {
  details: {},
  isLoading: false,
  success: "",
  error: "",
};

const initialStateContact = {
  isLoading: false,
  details: {},
  success: "",
  error: "",
};

const heroReducer = (state = initialStateHero, action) => {
  switch (action.type) {
    case UPDATE_HERO_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_HERO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: "Section Updated",
      };
    case UPDATE_HERO_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case GET_HERO_REQUEST:
      return { ...state, isLoading: true };
    case GET_HERO_SUCCESS:
      return { ...state, isLoading: false, details: action.payload.data };
    case GET_HERO_FAILURE:
      return { ...state, isLoading: false };
    case CLEAR_HERO_MESSAGE:
      return { ...state, isLoading: false, success: "", error: "" };
    default:
      return state;
  }
};

const serviceReducer = (state = initialStateServices, action) => {
  switch (action.type) {
    case GET_SERVICES_REQUEST:
      return { ...state, isLoading: true };
    case GET_SERVICES_SUCCESS:
      return { ...state, isLoading: false, details: action.payload };
    case GET_SERVICES_FAILURE:
      return { ...state, isLoading: false, error: "" };
    case CLEAR_SERVICE_MESSAGE:
      return { ...state, success: "", error: "" };
    case UPDATE_SERVICE_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: "Section Updated",
      };
    case UPDATE_SERVICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: "Failed to update, Plase try after sometimes",
      };
    default:
      return state;
  }
};

const contactReducer = (state = initialStateContact, action) => {
  switch (action.type) {
    case GET_CONTACT_REQUEST:
      return { ...state, isLoading: true };
    case GET_CONTACT_SUCCESS:
      return { ...state, isLoading: false, details: action.payload };
    case GET_CONTACT_FAILURE:
      return { ...state, isLoading: false };
    case UPDATE_CONTACT_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_CONTACT_SUCCESS:
      return { ...state, isLoading: false, success: "Section Updated" };
    case UPDATE_CONTACT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: "Failed to update, Plase try after sometimes",
      };
    case CLEAR_CONTACT_MESSAGE:
      return { ...state, success: "", error: "" };
    default:
      return state;
  }
};

export { heroReducer, serviceReducer, contactReducer };
