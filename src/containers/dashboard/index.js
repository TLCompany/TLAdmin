import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../store";
import { URL } from "../../store/url";
import { NetworkError } from "../../components/function";
import { BigTitle, Card } from "../../components/common";
import "./index.scss";

const DashBoard = () => {
  const Store = useContext(Context);
  const [data, setData] = useState();
  useEffect(() => {
    if (Store.auth.accessToken && URL) {
      const axiosInstance = () => {
        axios
          .get(`${URL}/admin/gateMission`, {
            headers: { authorization: Store.auth.accessToken }
          })
          .then(res => {
            setData(res.data.Data);
          })
          .catch(err => {
            NetworkError(err.response, Store, axiosInstance);
          });
      };
      axiosInstance();
    }
  }, [Store, Store.auth.accessToken]);
  console.log(data);

  return (
    <>
      <BigTitle title="대시보드" />
      <div className="cardboard">
        <Card
          title="총 가입자"
          subtitle="오늘"
          body={
            <>
              <div className="card_body-flex">
                <h1>25</h1>
                <h3>가입</h3>
              </div>
            </>
          }
        />
        <Card
          title="게이트 포스트"
          subtitle="오늘"
          body={
            <>
              <div className="card_body-flex">
                <h1>25</h1>
                <h3>가입</h3>
              </div>
            </>
          }
        />
        <Card
          title="일반 포스트"
          subtitle="오늘"
          body={
            <>
              <div className="card_body-flex">
                <h1>25</h1>
                <h3>가입</h3>
              </div>
            </>
          }
        />
      </div>
    </>
  );
};

export default DashBoard;
