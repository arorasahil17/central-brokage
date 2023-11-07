import {
  CLEAR_BIDS_MESSAGE,
  DELETE_BID_FAILURE,
  DELETE_BID_REQUEST,
  DELETE_BID_SUCCESS,
  FETCH_BIDS,
  FETCH_BIDS_ERROR,
  FETCH_BIDS_REQUEST,
  MAKE_BID_ERROR,
  MAKE_BID_REQUEST,
  MAKE_BID_SUCCESS,
  UPDATE_BIDS_ERROR,
  UPDATE_BIDS_REQUEST,
  UPDATE_BIDS_SUCCESS,
} from "../../actions/bids/bidsActions";

const initialStateBids = {
  isLoading: true,
  success: "",
  bids: [],
  error: "",
};

const bidsReducer = (state = initialStateBids, action) => {
  switch (action.type) {
    case FETCH_BIDS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_BIDS:
      return { ...state, isLoading: false, bids: action.payload.bidDetails };
    case FETCH_BIDS_ERROR:
      return { ...state, isLoading: false, bids: null };
    case UPDATE_BIDS_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_BIDS_SUCCESS:
      return { ...state, isLoading: false, success: "Bid Accepted" };
    case UPDATE_BIDS_ERROR:
      return { ...state, isLoading: false, error: "Something went wrong" };
    case CLEAR_BIDS_MESSAGE:
      return { ...state, success: "", error: "", isLoading: false };
    case MAKE_BID_REQUEST:
      return { ...state, isLoading: true };
    case MAKE_BID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bids: action.payload.bids,
        success:
          "Bid amount placed successfully! You will be notify soon about the Bid",
      };
    case MAKE_BID_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case DELETE_BID_REQUEST:
      return { ...state, isLoading: true };
    case DELETE_BID_SUCCESS:
      return { ...state, isLoading: true, success: "Bid Deleted" };
    case DELETE_BID_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export { bidsReducer };
