import axios from "axios";
export const ADD_LOADS_REQUEST = "ADD_LOADS_REQUEST";
export const ADD_LOADS = "ADD_LOADS";
export const ADD_LOADS_ERROR = "ADD_LOADS_ERROR";
export const GET_LOADS_FALURE = "GET_LOADS_FALURE";
export const GET_LOADS_REQUEST = "GET_LOADS_REQUEST";
export const GET_LOADS_SUCCESS = "GET_LOADS_SUCCESS";
export const UPDATE_LOAD_REQUEST = "UPDATE_LOAD_REQUEST";
export const UPDATE_LOAD_FAILURE = "UPDATE_LOAD_FAILURE";
export const UPDATE_LOAD_SUCCESS = "UPDATE_LOAD_SUCCESS";
export const CLEAR_LOADS = "CLEAR_LOADS";
export const DELETE_LOADS_REQUEST = "DELETE_LOADS_REQUEST";
export const DELETE_LOADS_FAILURE = "DELETE_LOADS_FAILURE";
export const DELETE_LOADS_SUCCESS = "DELETE_LOADS_SUCCESS";

export const addLoads = (loadData) => async (dispatch) => {
  dispatch({ type: ADD_LOADS_REQUEST });
  try {
    const response = await axios.post("/api/load", loadData);
    if (response.data.status) {
      dispatch({ type: ADD_LOADS, payload: response.data.data });
    }
  } catch (err) {
    dispatch({ type: ADD_LOADS_ERROR, payload: err.response.data.message });
  }
};

const getLoadsRequest = () => ({ type: GET_LOADS_REQUEST });

export const getLoads = () => async (dispatch) => {
  dispatch(getLoadsRequest());
  try {
    const response = await axios.get("/api/loads");
    if (response.data.status) {
      dispatch({ type: GET_LOADS_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: GET_LOADS_FALURE });
    }
  } catch (err) {
    dispatch({ type: GET_LOADS_FALURE });
  }
};

export const updateLoad = (load) => async (dispatch) => {
  dispatch({ type: UPDATE_LOAD_REQUEST });
  try {
    const resposne = await axios.put("/api/update-load", load);
    if (resposne.data.status) {
      dispatch({ type: UPDATE_LOAD_SUCCESS, payload: resposne.data });
      dispatch(getLoads());
    }
  } catch (error) {
    dispatch({
      type: UPDATE_LOAD_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const deleteLoadAC = (id) => async (dispatch) => {
  dispatch({ type: DELETE_LOADS_REQUEST });
  try {
    const res = await axios.delete(`/api/delete-load/${id}`);
    if (res.data.status) {
      dispatch({ type: DELETE_LOADS_SUCCESS, payload: "Load Deleted" });
      dispatch(getLoads());
    }
  } catch (error) {
    dispatch({
      type: DELETE_LOADS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearLoads = () => ({ type: CLEAR_LOADS });
