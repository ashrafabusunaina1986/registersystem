"use client";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";

const initial = {
  data: [],
  loading: false,
  error: null,
};

const ACTION = {
  API_REQUEST: "api-request",
  FETCH_DATA: "fetch-data",
  ERROR: "error",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.API_REQUEST:
      return { ...state, loading: true };
    case ACTION.ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTION.FETCH_DATA:
      return { ...state, data: action.payload, loading: false };
    default:
      return state;
  }
};
function useFetch(url, object) {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    dispatch({ type: "api-request" });
    axios({
      url: url,
      method: object && object.method ? object.method : "GET",
      data: object && object.data ? object.data : {},
    })
      .then((res) => {
        dispatch({ type: "fetch-data", payload: res.data });
      })
      .catch((error) => {
        dispatch({
          type: "error",
          payload: { message: error.message, data: error.response.data },
        });
      });
  }, [url, object]);
  return state;
}

export default useFetch;
