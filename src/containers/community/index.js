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
  EditArea,
  Tag
} from "../../components/common";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Community = observer(props => {
  const Store = useContext(Context);
  const [data, setData] = useState(); // 리스트 데이터
  const [detailData, setDetailData] = useState();
  const [now, setNow] = useState(-1); // 현재 보고있는 것
  const [mode, setMode] = useState(""); // 모드

  const initialData = {
    name: "",
    intro: "",
    type: 0,
    imageURL: ""
  };

  const initialPushData = { title: "", message: "", communityID: "" };
  const [push, setPush] = useState(initialPushData);

  // 토스트
  const notify = value => {
    toast.success(value);
  };

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL && !mode) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/community`, {
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
  }, [Store, mode]);

  let nowData;
  if (data) {
    nowData = data.Communities.filter(post => post.id === now)[0];
  }

  const handleChange = e => {
    setDetailData({ ...detailData, [e.target.name]: e.target.value });
  };

  const onEdit = e => {
    const axiosInstance = () => {
      axios
        .put(
          `${MAINURL}/admin/community`,
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
          `${MAINURL}/admin/community`,
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
          .delete(`${MAINURL}/admin/community/${now}`, {
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

  // 이미지 업로드
  const onBGPost = e => {
    const form = new FormData();
    form.append("Files", e.target.files[0]);
    toast("이미지 업로드 중입니다.");

    axios
      .post(`${MAINURL}/admin/community/upload`, form, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: Store.auth.accessToken
        }
      })
      .then(res => {
        toast.success("이미지가 업로드 되었습니다.");
        setDetailData({
          ...detailData,
          imageURL: res.data.Data.imageURLs[0]
        });
      })
      .catch(err => {
        toast.error("이미지가 업로드가 실패하였습니다.");
        console.log(err.response);
      });
  };

  const onPush = e => {
    if (window.confirm("공지를 등록하시겠습니까? ( 푸시가 발송됩니다 )")) {
      const axiosInstance = () => {
        axios
          .post(
            `${MAINURL}/admin/push/community`,
            { Data: push },
            {
              headers: { authorization: Store.auth.accessToken }
            }
          )
          .then(res => {
            notify("공지가 추가되었습니다.");
          })
          .catch(err => {
            NetworkError(err.response, Store, axiosInstance);
          });
      };
      axiosInstance();
    }
  };

  const handlePushChange = e => {
    setPush({
      ...push,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <BigTitle title="커뮤니티" />
      <Board01
        list={
          <>
            {data ? (
              data.Communities.map((an, index) => {
                return (
                  <React.Fragment key={index}>
                    <BoardList01
                      key={index}
                      subtitle={`[ ${an.CommunityUser.length} 명 ] ${an.name}`}
                      title={an.intro}
                      active={now === an.id ? true : false}
                      onClick={() => {
                        if (now !== an.id) {
                          setMode("View");
                          setNow(an.id);
                          setDetailData(
                            data.Communities.filter(
                              post => post.id === an.id
                            )[0]
                          );
                          setPush({ ...initialPushData, communityID: an.id });
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
              {nowData ? (
                <>
                  <div className="board01_title">
                    <div className="board01_title-left">
                      <h4>{nowData.id}</h4>
                      <h3>{nowData.name}</h3>
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
                      <h5>커버 사진</h5>
                      {nowData.imageURL ? (
                        <div
                          className="img_box"
                          style={{
                            background: `url(${nowData.imageURL}) center / cover`
                          }}
                        />
                      ) : (
                        <h4>등록된 이미지 없음</h4>
                      )}
                      <br />
                      <h5>소개</h5>
                      <h4>
                        {nowData.intro &&
                          nowData.intro.split(`\n`).map((line, index) => (
                            <React.Fragment key={line + index}>
                              <span>{line}</span>
                              <br />
                            </React.Fragment>
                          ))}
                      </h4>
                      <br />
                      <Link to={`/admin/community/post/${nowData.id}`}>
                        <Tag color="violet" body="커뮤니티 포스트 보기" />
                      </Link>
                    </div>
                    <div className="columns_line" />
                    <div className="columns_box">
                      <h5>공지사항 등록</h5>
                      <h5>제목</h5>
                      <EditInput
                        name="title"
                        value={push.title}
                        onChange={handlePushChange}
                      />
                      <h5>내용</h5>
                      <EditArea
                        name="message"
                        value={push.message}
                        onChange={handlePushChange}
                        style={{ height: 120 }}
                      />
                      <br />
                      <Tag
                        color="indigo"
                        body="공지사항 등록"
                        onClick={onPush}
                      />
                      <hr />
                      <h5>타입 ( 공개 / 비공개 )</h5>
                      <h4>{nowData.type === 0 ? "비공개" : "공개"}</h4>
                      <br />
                      <h5>
                        가입한 사용자 ( {nowData.CommunityUser.length}명 )
                      </h5>
                      {nowData.CommunityUser.map((like, index) => (
                        <div key={index} className="profile">
                          <div
                            className="profile_img"
                            style={
                              like.profileURL && {
                                background: `URL(${like.profileURL}) 100% center / cover`
                              }
                            }
                          />
                          <h4>
                            {like.nickname} <span>{like.level}</span>
                          </h4>
                        </div>
                      ))}
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
                    name="name"
                    value={detailData.name}
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
                  <h5>커버 사진</h5>
                  {detailData.imageURL ? (
                    <div
                      className="img_box"
                      style={{
                        background: `url(${detailData.imageURL}) center / cover`
                      }}
                    />
                  ) : (
                    <h4>등록된 이미지 없음</h4>
                  )}
                  <label className="tag tag_teal tag_file" htmlFor={"bgupload"}>
                    IMG 업로드
                  </label>
                  <br />
                  <input
                    type="file"
                    accept=".jpg,.png,.gif"
                    name="bgupload"
                    id={"bgupload"}
                    className="fileupload"
                    onChange={onBGPost}
                  />
                  <br />
                  <h5>회원권한 변경</h5>
                  <select
                    name="type"
                    value={detailData.type}
                    onChange={handleChange}
                  >
                    <option value={0}>비공개</option>
                    <option value={1}>공개</option>
                  </select>
                  <br />
                  <br />
                  <h5>내용</h5>
                  <EditArea
                    name="intro"
                    value={detailData.intro}
                    onChange={handleChange}
                    style={{ height: 300 }}
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
                    name="name"
                    value={detailData.name}
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
                  <h5>커버 사진</h5>
                  {detailData.imageURL ? (
                    <div
                      className="img_box"
                      style={{
                        background: `url(${detailData.imageURL}) center / cover`
                      }}
                    />
                  ) : (
                    <h4>등록된 이미지 없음</h4>
                  )}
                  <label className="tag tag_teal tag_file" htmlFor={"bgupload"}>
                    IMG 업로드
                  </label>
                  <br />
                  <input
                    type="file"
                    accept=".jpg,.png,.gif"
                    name="bgupload"
                    id={"bgupload"}
                    className="fileupload"
                    onChange={onBGPost}
                  />
                  <br />
                  <h5>회원권한 변경</h5>
                  <select
                    name="type"
                    value={detailData.type}
                    onChange={handleChange}
                  >
                    <option value={0}>비공개</option>
                    <option value={1}>공개</option>
                  </select>
                  <br />
                  <br />
                  <h5>내용</h5>
                  <EditArea
                    name="intro"
                    value={detailData.intro}
                    onChange={handleChange}
                    style={{ height: 300 }}
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

export default Community;
