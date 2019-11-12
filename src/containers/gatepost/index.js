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
  Tag
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
  const [page, setPage] = useState(1); // 페이지
  const [, isUpdate] = useState(false);

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/gatePost?page=1`, {
            headers: { authorization: Store.auth.accessToken }
          })
          .then(res => {
            setData(res.data.Data);
          })
          .catch(err => {
            NetworkError(err.response, Store);
          });
      };
      axiosInstance();
    }
  }, [Store, update]);

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

  const onCommentDelete = e => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const axiosInstance = () => {
        axios
          .delete(`${MAINURL}/admin/gatePost/comment/${e.target.id}`, {
            headers: { authorization: Store.auth.accessToken }
          })
          .then(res => {
            setUpdate(!update);
            notify("댓글이 삭제되었습니다.");
          })
          .catch(err => {
            NetworkError(err.response, Store, axiosInstance);
          });
      };
      axiosInstance();
    }
  };

  const onDelete = e => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const axiosInstance = () => {
        axios
          .delete(`${MAINURL}/admin/gatePost/${nowData.id}`, {
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

  let nowData;
  if (data) {
    nowData = data.GatePosts.filter(post => post.id === now)[0];
  }

  if (nowData) {
    nowData.createdAt = new Date(nowData.createdAt);
    nowData.updatedAt = new Date(nowData.updatedAt);
  }

  return (
    <>
      <BigTitle title="게이트 포스트" />
      <Board01
        onScroll={infinityScroll}
        list={
          <>
            {data ? (
              data.GatePosts.map((post, index) => {
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
                  <h4>{nowData.body}</h4>
                  <br />

                  {nowData.GatePostIMGs.length > 0 && (
                    <>
                      <h5>이미지 ( {nowData.GatePostIMGs.length}개 )</h5>
                      {nowData.GatePostIMGs.map((img, index) => (
                        <div
                          key={index + img.imageURL}
                          style={{
                            background: `URL(${img.imageURL}) 100% center / cover`,
                            width: 250,
                            height: 250,
                            marginTop: 8
                          }}
                        />
                      ))}
                      <br />
                    </>
                  )}
                  {nowData.GatePostVideos.length > 0 && (
                    <>
                      <h5>비디오 ( {nowData.GatePostVideos.length}개 )</h5>
                      {nowData.GatePostVideos.map((video, index) => (
                        <video width="250" key={video.videoURL} controls>
                          <source src={video.videoURL} />
                        </video>
                      ))}
                      <br />
                      <br />
                    </>
                  )}
                  <h5>O.K를 누른 사용자 ( {nowData.OkayUsers.length}명 )</h5>
                  {nowData.OkayUsers.map((like, index) => (
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
                <div className="columns_line" />
                <div className="columns_box">
                  <h5>댓글 목록 ( {nowData.GatePostComments.length} 개 )</h5>
                  <br />
                  {nowData.GatePostComments.map(comments => {
                    comments.createdAt = new Date(comments.createdAt);

                    return (
                      <div
                        key={comments.id}
                        style={{
                          paddingBottom: 16,
                          marginBottom: 16,
                          borderBottom: "1px solid #ddd"
                        }}
                      >
                        <div
                          className="profile"
                          style={{
                            height: 24,
                            lineHeight: "24px",
                            marginBottom: 0,
                            justifyContent: "space-between"
                          }}
                        >
                          <h4>
                            {comments.User.nickname}{" "}
                            <span>{comments.User.level}</span>
                          </h4>
                          <Tag
                            id={comments.id}
                            color="red"
                            body="삭제"
                            onClick={onCommentDelete}
                          />
                        </div>
                        <h5>
                          {comments.createdAt.toLocaleDateString()}{" "}
                          {comments.createdAt.toLocaleTimeString()}
                        </h5>
                        <br />
                        <h4>{comments.body}</h4>
                      </div>
                    );
                  })}
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
