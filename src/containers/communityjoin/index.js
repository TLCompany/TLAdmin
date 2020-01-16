import React, { useState, useContext, useEffect } from "react";
import "./index.scss";
import { BigTitle } from "../../components/common";
import { URL as MAINURL } from "../../store/url";
import axios from "axios";
import { Context } from "../../store";
import { toast } from "react-toastify";
import { NetworkError } from "../../components/function";

const Push = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  const Store = useContext(Context);

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/community/join/list`, {
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

  const onPost = e => {
    e.preventDefault();
    if (window.confirm("푸시 메세지를 발송하시겠습니까?")) {
      isLoading(true);
      axios
        .post(
          `${MAINURL}/admin/push`,
          { Data: data },
          {
            headers: {
              authorization: Store.auth.accessToken
            }
          }
        )
        .then(res => {
          isLoading(false);
          toast.success("푸시 메세지가 발송되었습니다.");
        })
        .catch(err => {
          isLoading(false);
          console.log(err.response);
        });
    }
  };
  return (
    <>
      <BigTitle title="커뮤니티 가입 신청" />
      <div className="board" onSubmit={onPost}>
        {data.map((d, index) => (
          <div key={index}>
            {d.user.nickname} {d.community.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default Push;
