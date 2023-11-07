import axios from "axios";
import { getLoads } from "../loads/loads";

export const BOOK_LOAD_REQUEST = "BOOK_LOAD_REQUEST";
export const BOOK_LOAD_SUCCESS = "BOOK_LOAD_SUCCESS";
export const BOOK_LOAD_ERROR = "BOOK_LOAD_ERROR";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const GET_BOOKINGS_REQUEST = "GET_BOOKINGS_REQUEST";
export const GET_BOOKINGS = "GET_BOOKINGS";
export const GET_BOOKINGS_ERROR = "GET_BOOKINGS_ERROR";
export const UPDATE_BOOKING_REQUEST = "UPDATE_BOOKING_REQUEST";
export const UPDATE_BOOKING = "UPDATE_BOOKING";
export const UPDATE_BOOKING_ERROR = "UPDATE_BOOKING_ERROR";
export const DELETE_BOOKING_REQUEST = "DELETE_BOOKING_REQUEST";
export const DELETE_BOOKING = "DELETE_BOOKING";
export const DELETE_BOOKING_ERROR = "DELETE_BOOKING_ERROR";

export const makeLoadBooking = (loadId) => async (dispatch) => {
  dispatch({ type: BOOK_LOAD_REQUEST });
  try {
    const res = await axios.post("/api/booking", { loadId });
    if (res.data.status) {
      dispatch({ type: BOOK_LOAD_SUCCESS, payload: res.data });
      dispatch(getLoads());
    }
  } catch (error) {
    dispatch({ type: BOOK_LOAD_ERROR, payload: error.response.data.message });
  }
};

export const getBookings = () => async (dispatch) => {
  dispatch({ type: GET_BOOKINGS_REQUEST });
  try {
    const res = await axios.get("/api/all-bookings");
    if (res.data.status) {
      dispatch({ type: GET_BOOKINGS, payload: res.data.bookings });
    }
  } catch (error) {
    dispatch({ type: GET_BOOKINGS_ERROR });
  }
};

export const updateBookingStatus = (id, status) => async (dispatch) => {
  dispatch({ type: UPDATE_BOOKING_REQUEST });
  try {
    const res = await axios.patch(`/api/update-status/${id}`, { status });
    if (res.data.status) {
      dispatch({ type: UPDATE_BOOKING, payload: res.data.message });
      dispatch(getBookings());
    }
  } catch (error) {
    dispatch({
      type: UPDATE_BOOKING_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const deleteBooking = (id) => async (dispatch) => {
  dispatch({ type: DELETE_BOOKING_REQUEST });
  try {
    const res = await axios.delete(`/api/delete-booking/${id}`);
    if (res.data.status) {
      dispatch({ type: DELETE_BOOKING });
      dispatch(getBookings());
    }
  } catch (error) {
    dispatch({ type: DELETE_BOOKING_ERROR });
  }
};

export const clearBookingMessage = () => ({ type: CLEAR_MESSAGE });
