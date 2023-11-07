import {
  ADD_LOADS,
  ADD_LOADS_ERROR,
  ADD_LOADS_REQUEST,
  CLEAR_LOADS,
  DELETE_LOADS_FAILURE,
  DELETE_LOADS_REQUEST,
  DELETE_LOADS_SUCCESS,
  GET_LOADS_FALURE,
  GET_LOADS_REQUEST,
  GET_LOADS_SUCCESS,
  UPDATE_LOAD_FAILURE,
  UPDATE_LOAD_REQUEST,
  UPDATE_LOAD_SUCCESS,
} from "../../actions/loads/loads";

const initialStateLoads = {
  isLoading: false,
  loads: [],
  success: "",
  error: "",
};

const loadsReducer = (state = initialStateLoads, action) => {
  switch (action.type) {
    case ADD_LOADS_REQUEST:
      return { ...state, isLoading: true };
    case ADD_LOADS:
      return { ...state, isLoading: false, success: "Load Added" };
    case ADD_LOADS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case GET_LOADS_REQUEST:
      return { ...state, isLoading: true };
    case GET_LOADS_SUCCESS:
      return {
        ...state,
        loads: action.payload.data,
        isLoading: false,
      };
    case GET_LOADS_FALURE:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        loads: null,
      };
    case UPDATE_LOAD_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_LOAD_SUCCESS:
      return { ...state, isLoading: false, success: action.payload.message };
    case UPDATE_LOAD_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case CLEAR_LOADS:
      return { ...state, isLoading: false, error: "", success: "" };
    case DELETE_LOADS_REQUEST:
      return { ...state, isLoading: true };
    case DELETE_LOADS_SUCCESS:
      return { ...state, isLoading: false, success: action.payload };
    case DELETE_LOADS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export { loadsReducer };
