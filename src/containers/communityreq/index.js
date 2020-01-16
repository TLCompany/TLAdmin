import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../store";
import { URL as MAINURL } from "../../store/url";
import { NetworkError } from "../../components/function";
import {
  BigTitle,
  Board01,
  BoardList01,
  Loading
} from "../../components/common";
import "./index.scss";
import { observer } from "mobx-react-lite";

const User = observer(props => {
  const Store = useContext(Context);
  const [data, setData] = useState(); // 리스트 데이터
  const [now, setNow] = useState(-1); // 현재 보고있는 것
  const [mode, setMode] = useState(""); // 모드
  const [, isUpdate] = useState(false);

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/community/application`, {
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

  let nowData;
  if (data) {
    nowData = data.NormalPosts.filter(post => post.id === now)[0];
  }

  if (nowData) {
    nowData.createdAt = new Date(nowData.createdAt);
    nowData.updatedAt = new Date(nowData.updatedAt);
  }

  return (
    <>
      <BigTitle title="커뮤니티 요청" />
      <Board01
        list={
          <>
            {data ? (
              data.NormalPosts.map((post, index) => {
                return (
                  <React.Fragment key={index}>
                    <BoardList01
                      key={index}
                      subtitle={`[${post.id}] ${post.User.nickname}`}
                      title={post.body}
                      active={now === post.id ? true : false}
                      onClick={() => {
                        if (now !== post.id) {
                          isUpdate(false);
                          setMode("View");
                          setNow(post.id);
                        }
                      }}
                    />
                  </React.Fragment>
                );
              })
            ) : (
              <Loading />
            )}
          </>
        }
        detail={
          mode === "View" && (
            <>
              <div className="board01_title">
                <div className="board01_title-left">
                  <h4 style={{ marginBottom: 4, color: "#777777" }}>
                    {nowData.id}
                  </h4>
                  <h3>작성자 : {nowData.User.nickname}</h3>
                </div>
              </div>
              <hr />
              <div className="board01_flexbox">
                <div className="columns_box">
                  <h5>작성일</h5>
                  <h4>
                    {nowData.createdAt.toLocaleDateString()}{" "}
                    {nowData.createdAt.toLocaleTimeString()}
                  </h4>
                  <br />
                  <h5>내용</h5>
                  <h4>
                    {nowData.body.split("\n").map((line, index) => {
                      return (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      );
                    })}
                  </h4>
                  <br />
                </div>
              </div>
            </>
          )
        }
      />
    </>
  );
});

export default User;
