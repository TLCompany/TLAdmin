import { useState, createContext, useEffect } from "react";

const Context = createContext();

const Store = value => {
  const [auth, setAuth] = useState("");

  useEffect(() => {
    setAuth(InitializeLocal("auth", JSON.stringify({}), "object"));
  }, []);

  const actions = {
    setAuth: value => {
      window.localStorage.setItem("auth", JSON.stringify(value));
      setAuth(value);
    }
  };

  return { auth, actions };
};

const InitializeLocal = (key, init, type) => {
  let initialNumber = init;
  let loadLS = window.localStorage.getItem(key);
  !loadLS ? (initialNumber = init) : (initialNumber = loadLS);
  window.localStorage.setItem(key, initialNumber);
  return type === "object" ? JSON.parse(initialNumber) : initialNumber;
};

export { Context, Store };
