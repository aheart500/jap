import React, { useReducer } from "react";
import ServicesContex from "./ServicesContext";
import ServicesReducer from "./servicesReducer";
import axios from "axios";
const ServicesState = ({ children }) => {
  const [state, dispatch] = useReducer(ServicesReducer, {
    services: [],
    balance: "0.00",
  });
  const getServices = () => {
    axios
      .get("/api/services")
      .then((res) => {
        dispatch({ type: "services", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBalance = () => {
    axios
      .get("/api/balance")
      .then((res) => {
        dispatch({ type: "balance", payload: res.data.balance });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Add = async (data) => {
    const result = axios.post("/api/order", data);
    return result;
  };
  const checkStatus = async (id) => {
    const result = axios.get("/api/order/" + id);
    return result;
  };
  return (
    <ServicesContex.Provider
      value={{
        servicesState: state,
        getServices,
        getBalance,
        Add,
        checkStatus,
      }}
    >
      {children}
    </ServicesContex.Provider>
  );
};

export default ServicesState;
