import axios from "axios";

export const FETCH_BIDS_REQUEST = "FECTH_BIDS_REQUEST";
export const FETCH_BIDS = "FETCH_BIDS";
export const FETCH_BIDS_ERROR = "FETCH_BIDS_ERROR";
export const UPDATE_BIDS_REQUEST = "UPDATE_BIDS_REQUEST";
export const UPDATE_BIDS_SUCCESS = "UPDATE_BID_SUCCESS";
export const UPDATE_BIDS_ERROR = "UPDATE_BIDS_ERROR";
export const CLEAR_BIDS_MESSAGE = "CLEAR_BIDS_MESSAGE";
export const MAKE_BID_REQUEST = "MAKE_BID_REQUEST";
export const MAKE_BID_SUCCESS = "MAKE_BID_SUCCESS";
export const MAKE_BID_ERROR = "MAKE_BID_ERROR";
export const DELETE_BID_REQUEST = "DELETE_BID_REQUEST";
export const DELETE_BID_SUCCESS = "DELETE_BID_SUCCESS";
export const DELETE_BID_FAILURE = "DELETE_BID_FAILURE";

export const fetchBids = () => async (dispatch) => {
  dispatch({ type: FETCH_BIDS_REQUEST });
  try {
    const response = await axios.get("/api/fetch-bids");
    if (response.data.status) {
      dispatch({ type: FETCH_BIDS, payload: response.data });
    } else {
      dispatch({ type: FETCH_BIDS_ERROR });
    }
  } catch (error) {
    dispatch({ type: FETCH_BIDS_ERROR });
  }
};

export const updateBids = (bidId, bidStatus) => async (dispatch) => {
  dispatch({ type: UPDATE_BIDS_REQUEST });
  try {
    const response = await axios.patch(`/api/update-bid/${bidId}`, {
      bidStatus,
    });
    if (response.data.status) {
      dispatch({ type: UPDATE_BIDS_SUCCESS });
      dispatch(fetchBids());
    }
  } catch (error) {
    dispatch({ type: UPDATE_BIDS_ERROR, payload: error.response.data.message });
  }
};

export const makeBid = (loadId, bidAmount) => async (dispatch) => {
  dispatch({ type: MAKE_BID_REQUEST });
  try {
    const response = await axios.post(`/api/make-bid/?loadId=${loadId}`, {
      bidAmount,
    });
    if (response.data.status) {
      dispatch({ type: MAKE_BID_SUCCESS, payload: response.data });
    }
  } catch (error) {
    dispatch({ type: MAKE_BID_ERROR, payload: error.response.data.message });
  }
};

export const deleteBid = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BID_REQUEST });
  try {
    const res = await axios.delete(`/api/delete-bid/${id}`);
    if (res.data.status) {
      dispatch({ type: DELETE_BID_SUCCESS });
      dispatch(fetchBids());
    }
  } catch (error) {
    dispatch({
      type: DELETE_BID_FAILURE,
      payload: error.response.data.message,
    });
  }
};
