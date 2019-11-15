import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../store";
import { URL as MAINURL } from "../../store/url";
import { NetworkError } from "../../components/function";
import {
  BigTitle,
  Board01,
  BoardList01,
  Loading,
  Tag,
  EditArea
} from "../../components/common";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";

const User = observer(props => {
  const Store = useContext(Context);
  const [data, setData] = useState(); // 리스트 데이터
  const [now, setNow] = useState(-1); // 현재 보고있는 것
  const [mode, setMode] = useState(""); // 모드
  const [update, setUpdate] = useState(false);
  const [answer, setAnswer] = useState("");
  const [, isUpdate] = useState(false);

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/inquiries`, {
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
  }, [Store, update]);

  // 토스트
  const notify = value => {
    toast.success(value);
  };

  const handleAnswerChange = e => {
    setAnswer(e.target.value);
  };

  const onDelete = e => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const axiosInstance = () => {
        axios
          .delete(`${MAINURL}/admin/inquiries/${nowData.id}`, {
            headers: { authorization: Store.auth.accessToken }
          })
          .then(res => {
            setMode("");
            setUpdate(!update);
            notify("글이 삭제되었습니다.");
          })
          .catch(err => {
            NetworkError(err.response, Store, axiosInstance);
          });
      };
      axiosInstance();
    }
  };

  const onPost = e => {
    if (answer) {
      if (window.confirm("답변을 등록하시겠습니까?")) {
        const axiosInstance = () => {
          axios
            .post(
              `${MAINURL}/admin/inquiries`,
              {
                Data: {
                  id: nowData.id,
                  answer
                }
              },
              {
                headers: { authorization: Store.auth.accessToken }
              }
            )
            .then(res => {
              setUpdate(!update);
              notify("답변이 완료되었습니다.");
            })
            .catch(err => {
              NetworkError(err.response, Store, axiosInstance);
            });
        };
        axiosInstance();
      }
    } else {
      toast.error("답변 내용이 없습니다.");
    }
  };

  let nowData;
  if (data) {
    nowData = data.inquiries.filter(post => post.id === now)[0];
  }

  if (nowData) {
    nowData.createdAt = new Date(nowData.createdAt);
    nowData.updatedAt = new Date(nowData.updatedAt);
  }

  return (
    <>
      <BigTitle title="문의내역" />
      <Board01
        list={
          <>
            {data ? (
              data.inquiries.map((post, index) => {
                return (
                  <React.Fragment key={index}>
                    <BoardList01
                      tag={
                        post.answer ? (
                          <Tag color="indigo" body="답변완료" />
                        ) : (
                          <Tag color="pink" body="대기" />
                        )
                      }
                      key={index}
                      subtitle={post.User && post.User.nickname}
                      title={post.content}
                      active={now === post.id ? true : false}
                      onClick={() => {
                        if (now !== post.id) {
                          setAnswer("");
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
                  <h3>
                    작성자 :{" "}
                    {nowData.User ? nowData.User.nickname : "<데이터 없음>"}
                  </h3>
                </div>
                <div className="board01_title-right">
                  <div className="btn btn_delete" onClick={onDelete}>
                    <div />
                    <h5>삭제</h5>
                  </div>
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
                    {nowData.content &&
                      nowData.content.split("\n").map((line, index) => {
                        return (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        );
                      })}
                  </h4>
                </div>
                <div className="columns_line" />
                <div className="columns_box">
                  <h5>답변</h5>
                  <h4>
                    {nowData.answer ? (
                      nowData.answer.split("\n").map((line, index) => {
                        return (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        );
                      })
                    ) : (
                      <>
                        <br />
                        <EditArea
                          onChange={handleAnswerChange}
                          value={answer}
                          placeholder="답변을 적어주세요."
                          style={{ height: 150 }}
                        />
                        <br />
                        <Tag color="blue" body="답변하기" onClick={onPost} />
                      </>
                    )}
                  </h4>
                  <br />
                </div>
              </div>{" "}
            </>
          )
        }
      />
    </>
  );
});

export default User;
