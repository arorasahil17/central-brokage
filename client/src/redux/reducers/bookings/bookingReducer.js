import {
  CLEAR_MESSAGE,
  DELETE_BOOKING,
  DELETE_BOOKING_ERROR,
  DELETE_BOOKING_REQUEST,
  GET_BOOKINGS,
  GET_BOOKINGS_ERROR,
  GET_BOOKINGS_REQUEST,
  UPDATE_BOOKING,
  UPDATE_BOOKING_ERROR,
  UPDATE_BOOKING_REQUEST,
} from "../../actions/bookings/booking";

const initialStateBookings = {
  bookings: [],
  success: "",
  error: "",
  isLoading: false,
};

const bookingReducer = (state = initialStateBookings, action) => {
  switch (action.type) {
    case GET_BOOKINGS_REQUEST:
      return { ...state, isLoading: true };
    case GET_BOOKINGS:
      return { ...state, isLoading: false, bookings: action.payload };
    case GET_BOOKINGS_ERROR:
      return { ...state, isLoading: false, bookings: null };
    case UPDATE_BOOKING_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_BOOKING:
      return { ...state, isLoading: false, success: action.payload };
    case UPDATE_BOOKING_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case CLEAR_MESSAGE:
      return { ...state, success: "", error: "" };
    case DELETE_BOOKING_REQUEST:
      return { ...state, isLoading: true };
    case DELETE_BOOKING:
      return { ...state, isLoading: false, success: "Booking Deleted" };
    case DELETE_BOOKING_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export { bookingReducer };
