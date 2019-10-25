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
  EditInput,
  EditArea
} from "../../components/common";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";

const Announcement = observer(props => {
  const Store = useContext(Context);
  const [data, setData] = useState(); // 리스트 데이터
  const [detailData, setDetailData] = useState();
  const [now, setNow] = useState(-1); // 현재 보고있는 것
  const [mode, setMode] = useState(""); // 모드
  const [page, setPage] = useState(1);
  const [datailUpdate, isDetailUpdate] = useState(false);

  const initialData = {
    title: "",
    content: ""
  };

  const infinityScroll = e => {
    if (
      e.target.scrollHeight - e.target.scrollTop <
      e.target.clientHeight + 150
    ) {
      if (page < data.maxPage) {
        setPage(page + 1);
        const axiosInstance = () => {
          axios
            .get(`${MAINURL}/admin/user?page=${page + 1}`, {
              headers: { authorization: Store.auth.accessToken }
            })
            .then(res => {
              setData({
                ...data,
                Users: [...data.Users, ...res.data.Data.Users]
              });
            })
            .catch(err => {
              NetworkError(err.response, Store, axiosInstance);
            });
        };
        axiosInstance();
      }
    }
  };

  // 토스트
  const notify = value => {
    toast.success(value);
  };

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL && !mode) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/announcement?page=${page}`, {
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
  }, [Store, mode, page]);

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL && now > -1) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/announcement/${now}`, {
            headers: { authorization: Store.auth.accessToken }
          })
          .then(res => {
            setDetailData(res.data.Data);
            isDetailUpdate(true);
          })
          .catch(err => {
            NetworkError(err.response, Store, axiosInstance);
          });
      };
      axiosInstance();
    }
  }, [Store, now]);

  let createdAt;
  if (detailData) {
    createdAt = new Date(detailData.createdAt);
  }

  const handleChange = e => {
    setDetailData({ ...detailData, [e.target.name]: e.target.value });
  };

  const onEdit = e => {
    const axiosInstance = () => {
      axios
        .put(
          `${MAINURL}/admin/announcement`,
          { Data: detailData },
          {
            headers: { authorization: Store.auth.accessToken }
          }
        )
        .then(res => {
          setMode("");
          setMode("View");
          notify("수정되었습니다.");
        })
        .catch(err => {
          NetworkError(err.response, Store, axiosInstance);
        });
    };
    axiosInstance();
  };

  const onAdd = e => {
    console.log({ Data: detailData });
    const axiosInstance = () => {
      axios
        .post(
          `${MAINURL}/admin/announcement`,
          { Data: detailData },
          {
            headers: { authorization: Store.auth.accessToken }
          }
        )
        .then(res => {
          setMode("");
          notify("추가되었습니다.");
        })
        .catch(err => {
          NetworkError(err.response, Store, axiosInstance);
        });
    };
    axiosInstance();
  };

  const onDelete = e => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const axiosInstance = () => {
        axios
          .delete(`${MAINURL}/admin/announcement/${now}`, {
            headers: { authorization: Store.auth.accessToken }
          })
          .then(res => {
            setMode("");
            setNow(-1);
            notify("삭제되었습니다.");
          })
          .catch(err => {
            NetworkError(err.response, Store, axiosInstance);
          });
      };
      axiosInstance();
    }
  };

  return (
    <>
      <BigTitle title="공지사항" />
      <Board01
        list={
          <>
            {data ? (
              data.Announcements.map((an, index) => {
                return (
                  <React.Fragment key={index}>
                    <BoardList01
                      key={index}
                      subtitle={`[ ${an.id} ]`}
                      title={an.title}
                      active={now === an.id ? true : false}
                      onClick={() => {
                        if (now !== an.id) {
                          isDetailUpdate(false);
                          setMode("View");
                          setNow(an.id);
                        }
                      }}
                      onScroll={infinityScroll}
                    />
                  </React.Fragment>
                );
              })
            ) : (
              <Loading />
            )}
          </>
        }
        pagination={
          <>
            <div
              className="btn btn_add"
              onClick={() => {
                setDetailData(initialData);
                setNow(-1);
                setMode("Add");
              }}
            >
              <div />
              <h5>추가</h5>
            </div>
          </>
        }
        detail={
          mode === "View" ? (
            <>
              {datailUpdate ? (
                <>
                  <div className="board01_title">
                    <div className="board01_title-left">
                      <h4>{detailData.id}</h4>
                      <h3>{detailData.title}</h3>
                    </div>
                    <div className="board01_title-right">
                      <div
                        className="btn btn_edit"
                        onClick={() => {
                          setMode("Edit");
                        }}
                      >
                        <div />
                        <h5>수정</h5>
                      </div>
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
                        {createdAt.toLocaleDateString()}{" "}
                        {createdAt.toLocaleTimeString()}
                      </h4>
                      <br />
                      <h5>내용</h5>
                      <h4>
                        {detailData.content &&
                          detailData.content.split(`\n`).map((line, index) => (
                            <React.Fragment key={line + index}>
                              <span>{line}</span>
                              <br />
                            </React.Fragment>
                          ))}
                      </h4>
                    </div>
                  </div>
                </>
              ) : (
                <Loading />
              )}
            </>
          ) : mode === "Edit" ? (
            <>
              <div className="board01_title">
                <div className="board01_title-left">
                  <h5>제목</h5>
                  <EditInput
                    name="title"
                    value={detailData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="board01_title-right">
                  <div
                    className="btn btn_edit"
                    onClick={() => {
                      if (window.confirm("수정 내역을 반영하시겠습니까?")) {
                        onEdit();
                        setMode("View");
                      }
                    }}
                  >
                    <div />
                    <h5>완료</h5>
                  </div>
                </div>
              </div>
              <hr />
              <div className="board01_flexbox">
                <div className="columns_box">
                  <h5>내용</h5>
                  <EditArea
                    name="content"
                    value={detailData.content}
                    onChange={handleChange}
                    style={{ height: 500 }}
                  />
                </div>
              </div>
            </>
          ) : mode === "Add" ? (
            <>
              <div className="board01_title">
                <div className="board01_title-left">
                  <h5>제목</h5>
                  <EditInput
                    name="title"
                    value={detailData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="board01_title-right">
                  <div
                    className="btn btn_edit"
                    onClick={() => {
                      if (window.confirm("수정 내역을 반영하시겠습니까?")) {
                        onAdd();
                        setMode("View");
                      }
                    }}
                  >
                    <div />
                    <h5>완료</h5>
                  </div>
                </div>
              </div>
              <hr />
              <div className="board01_flexbox">
                <div className="columns_box">
                  <h5>내용</h5>
                  <EditArea
                    name="content"
                    value={detailData.content}
                    onChange={handleChange}
                    style={{ height: 500 }}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )
        }
      />
    </>
  );
});

export default Announcement;
