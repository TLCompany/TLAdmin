import React from "react";
import "./index.scss";
import { CInput, Loading } from "../../common";

const LoginForm = props => {
  const { loading, sign, setSign, onLogin } = props;

  const handleChange = e => {
    setSign({ ...sign, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginform">
      <div className="loginform_bigtitle">
        <h2>
          골프로드72
          <br />
          관리자
        </h2>
        <form onSubmit={onLogin}>
          <CInput
            label="아이디"
            name="masterID"
            onChange={handleChange}
            value={sign.masterID}
          />
          <CInput
            label="비밀번호"
            name="password"
            onChange={handleChange}
            value={sign.password}
            type="password"
          />
          <button className="loginform_button">
            {!loading ? "로그인" : <Loading white />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
