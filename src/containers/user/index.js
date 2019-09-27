import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../store";
import { URL } from "../../store/url";
import { NetworkError } from "../../components/function";
import { BigTitle, Board01, BoardList01 } from "../../components/common";
import "./index.scss";

const DashBoard = props => {
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
  }, [Store]);
  console.log(data);

  return (
    <>
      <BigTitle title="회원 관리" />
      <Board01
        list={
          <>
            <BoardList01 subtitle="GATE 2" title="스크린 골프" />
            <BoardList01 subtitle="GATE 2" title="스크린 골프" active />
            <BoardList01 subtitle="GATE 2" title="스크린 골프" />
            <BoardList01 subtitle="GATE 2" title="스크린 골프" />
            <BoardList01 subtitle="GATE 2" title="스크린 골프" />
            <BoardList01 subtitle="GATE 2" title="스크린 골프" />
          </>
        }
        detail={1}
      />
    </>
  );
};

export default DashBoard;
