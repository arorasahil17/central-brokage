import axios from "axios";
export const UPDATE_HERO_REQUEST = "UPDATE_HERO_REQUEST";
export const UPDATE_HERO_SUCCESS = "UPDATE_HERO_SUCCESS";
export const UPDATE_HERO_FAILURE = "UPDATE_HERO_FAILURE";
export const CLEAR_HERO_MESSAGE = "CLEAR_HERO_MESSAGE";
export const GET_HERO_REQUEST = "GET_HERO_REQUEST";
export const GET_HERO_SUCCESS = "GET_HERO_SUCCESS";
export const GET_HERO_FAILURE = "GET_HERO_FAILURE";
export const UPDATE_SERVICE_REQUEST = "UPDATE_SERVICE_REQUEST";
export const UPDATE_SERVICE_SUCCESS = "UPDATE_SERVICE_SUCCESS";
export const UPDATE_SERVICE_FAILURE = "UPDATE_SERVICE_FAILURE";
export const GET_SERVICES_REQUEST = "GET_SERVICES_REQUEST";
export const GET_SERVICES_SUCCESS = "GET_SERVICES_SUCCESS";
export const GET_SERVICES_FAILURE = "GET_SERVICES_FAILURE";
export const CLEAR_SERVICE_MESSAGE = "CLEAR_SERVICE_MESSAGE";
export const GET_CONTACT_REQUEST = "GET_CONTACT_REQUEST";
export const GET_CONTACT_SUCCESS = "GET_CONTACT_SUCCESS";
export const GET_CONTACT_FAILURE = "GET_CONTACT_FAILURE";
export const UPDATE_CONTACT_REQUEST = "UPDATE_CONTACT_REQUEST";
export const UPDATE_CONTACT_SUCCESS = "UPDATE_CONTACT_SUCCESS";
export const UPDATE_CONTACT_FAILURE = "UPDATE_CONTACT_FAILURE";
export const CLEAR_CONTACT_MESSAGE = "CLEAR_CONTACT_MESSAGE";

export const updateHero =
  (title, description, imageUrl, id) => async (dispatch) => {
    dispatch({ type: UPDATE_HERO_REQUEST });

    try {
      const response = await axios.put(`/api/update-hero/${id}`, {
        title,
        description,
        imageUrl,
      });
      if (response.data.status) {
        dispatch({ type: UPDATE_HERO_SUCCESS });
        dispatch(getHeroDetails());
      }
    } catch (error) {
      dispatch({ type: UPDATE_HERO_FAILURE });
    }
  };

export const getHeroDetails = () => async (dispatch) => {
  dispatch({ type: GET_HERO_REQUEST });
  try {
    const res = await axios.get(`/api/get-hero-details`);
    if (res.data.status) {
      dispatch({ type: GET_HERO_SUCCESS, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: GET_HERO_FAILURE });
  }
};

export const updateService =
  (title, description, imageUrl, id) => async (dispatch) => {
    dispatch({ type: UPDATE_SERVICE_REQUEST });
    try {
      const response = await axios.put(`/api/update-service/${id}`, {
        title,
        description,
        imageUrl,
      });
      if (response.data.status) {
        dispatch({ type: UPDATE_SERVICE_SUCCESS });
        dispatch(getService());
      }
    } catch (error) {
      dispatch({ type: UPDATE_SERVICE_FAILURE });
    }
  };

export const getService = (navigate) => async (dispatch) => {
  dispatch({ type: GET_SERVICES_REQUEST });
  try {
    const response = await axios.get("/api/get-services");
    if (response.data.status) {
      dispatch({ type: GET_SERVICES_SUCCESS, payload: response.data.services });
    }
  } catch (error) {
    dispatch({ type: GET_SERVICES_FAILURE });
    navigate("/server-error");
  }
};

export const getContact = (navigate) => async (dispatch) => {
  dispatch({ type: GET_CONTACT_REQUEST });
  try {
    const response = await axios.get("/api/get-contact");

    if (response.data.status) {
      const phone = response.data.contact.phone;
      const startNumber = phone.slice(0, 3);
      const endNumber = phone.slice(3, phone.length);
      const mainNumber = `(${startNumber})${endNumber}`;
      const details = {
        address: response.data.contact.address,
        email: response.data.contact.email,
        phone: mainNumber,
      };
      dispatch({ type: GET_CONTACT_SUCCESS, payload: details });
    }
  } catch (error) {
    dispatch({ type: GET_CONTACT_FAILURE });
    navigate("/server-error");
  }
};

export const updateContact =
  (email, phone, address, id) => async (dispatch) => {
    dispatch({ type: UPDATE_CONTACT_REQUEST });
    try {
      const response = await axios.put(`/api/update-contact/${id}`, {
        email,
        phone,
        address,
      });
      if (response.data.status) {
        dispatch({ type: UPDATE_CONTACT_SUCCESS });
        dispatch(getContact());
      }
    } catch (error) {
      dispatch({ type: UPDATE_CONTACT_FAILURE });
    }
  };
