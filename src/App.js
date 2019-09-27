import React from "react";
import "./App.scss";
import Router from "./router";
import { Context, Store } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Context.Provider value={{ ...Store() }}>
      <div className="App">
        <Router />
        <ToastContainer autoClose={2500} />
      </div>
    </Context.Provider>
  );
}

export default App;
