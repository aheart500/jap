import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import NewOrder from "./components/NewOrder";
import ServicesContext from "./contexts/ServicesContext/ServicesContext";
import Status from "./components/Status";
const App = () => {
  const {
    servicesState,
    getBalance,
    getServices,
    Add,
    checkStatus,
  } = useContext(ServicesContext);
  useEffect(() => {
    getBalance();
  }, []); //eslint-disable-line
  useEffect(() => {
    getServices();
  }, []); //eslint-disable-line
  return (
    <div className="app">
      <Header balance={servicesState.balance} />
      <NewOrder services={servicesState.services} Add={Add} />
      <Status check={checkStatus} />
    </div>
  );
};

export default App;
