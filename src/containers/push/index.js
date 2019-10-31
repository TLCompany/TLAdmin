import React, { useState, useContext } from "react";
import "./index.scss";
import {
  BigTitle,
  EditInput,
  EditArea,
  Loading
} from "../../components/common";
import { URL as MAINURL } from "../../store/url";
import axios from "axios";
import { Context } from "../../store";
import { toast } from "react-toastify";

const Push = () => {
  const [data, setData] = useState({ title: "", message: "" });
  const [loading, isLoading] = useState(false);
  const Store = useContext(Context);

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

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
      <BigTitle title="푸시 알림" />
      <form className="board" onSubmit={onPost}>
        <h3>제목</h3>
        <EditInput name="title" value={data.title} onChange={handleChange} />
        <br />
        <h3>내용</h3>
        <EditArea name="message" value={data.message} onChange={handleChange} />
        <br />
        <br />
        <button>{loading ? <Loading white /> : <h4>보내기</h4>}</button>
      </form>
    </>
  );
};

export default Push;
