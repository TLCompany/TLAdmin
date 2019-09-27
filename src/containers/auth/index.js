import React, { useState, useContext } from "react";
import { LoginForm, JoinForm } from "../../components/auth";
import axios from "axios";
import "./index.scss";
import { URL } from "../../store/url";
import { Context } from "../../store";
import { NetworkError } from "../../components/function";

const Auth = () => {
  const Store = useContext(Context);
  const [sign, setSign] = useState({
    masterID: "",
    password: ""
  });
  const [page, setPage] = useState(0);
  const [loading, isLoading] = useState(false);

  const onLogin = e => {
    e.preventDefault();
    isLoading(true);

    const axiosInstance = () => {
      axios
        .post(`${URL}/admin/auth/login`, { Data: sign })
        .then(res => {
          Store.actions.setAuth(res.data.Data);
          isLoading(false);
          document.location.href = "/admin/dashboard";
        })
        .catch(err => {
          NetworkError(err.response, Store, axiosInstance);
          isLoading(false);
        });
    };
    axiosInstance();
  };

  const viewPage = value => {
    switch (page * 1) {
      case 0:
        return <LoginForm {...propsAll} />;
      case 1:
        return <JoinForm {...propsAll} />;
      default:
        break;
    }
  };

  const propsAll = { sign, setSign, loading, isLoading, onLogin, setPage };

  return <div className="auth">{viewPage()}</div>;
};

export default Auth;
