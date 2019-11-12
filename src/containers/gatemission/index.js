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
  EditInput,
  EditArea
} from "../../components/common";
import "./index.scss";
import { GateMissionContext } from "../../store/gatemission";
import { observer } from "mobx-react-lite";
import { observable } from "mobx";
import { toast } from "react-toastify";

const GateMission = observer(props => {
  const Store = useContext(Context);
  const GMContext = useContext(GateMissionContext);
  const [data, setData] = useState(); // 리스트 데이터
  const [now, setNow] = useState(0); // 현재 보고있는 것
  const [mode, setMode] = useState("View"); // 모드
  const [, isUpdate] = useState(false);
  const [datailUpdate, isDetailUpdate] = useState(false);

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/gateMission`, {
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
  }, [Store, mode, GMContext]);

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL && now > -1 && mode === "View") {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/gateMission/show/${now}`, {
            headers: { authorization: Store.auth.accessToken }
          })
          .then(res => {
            GMContext.data = observable(res.data.Data);
            isDetailUpdate(true);
            isUpdate(true);
          })
          .catch(err => {
            NetworkError(err.response, Store);
          });
      };
      axiosInstance();
    }
  }, [Store, now, mode, GMContext]);

  // 토스트
  const notify = value => {
    toast.error(value);
  };

  // 토스트
  const notifyS = value => {
    toast.success(value);
  };

  // 태그 설정
  const setOKType = value => {
    switch (value * 1) {
      case 0:
        return <Tag body="사진" color="red" />;
      case 1:
        return <Tag body="동영상" color="grape" />;
      case 2:
        return <Tag body="비포-애프터" color="violet" />;
      case 3:
        return <Tag body="리스트인증" color="indigo" />;
      case 4:
        return <Tag body="퀴즈" color="cyan" />;
      case 5:
        return <Tag body="설문조사" color="teal" />;
      case 6:
        return <Tag body="리스트선택" color="green" />;
      case 7:
        return <Tag body="동의" color="yellow" />;
      default:
        break;
    }
  };

  // 수정 스테이트 변경
  const handleChange = e => {
    GMContext.data[e.target.name] = e.target.value;
  };

  // 수정
  const onEdit = e => {
    axios
      .put(
        `${MAINURL}/admin/gateMission`,
        { Data: GMContext.data },
        {
          headers: { authorization: Store.auth.accessToken }
        }
      )
      .then(res => {
        GMContext.data = observable(res.data.Data);
        isUpdate(true);
        setMode("View");
        notifyS("수정되었습니다.");
      })
      .catch(err => {
        NetworkError(err.response, Store);
        notify("토큰 재발급으로 다시한번 시도해주세요!");
      });
  };

  // 게이트 보상 관련
  const onGRDelete = e => {
    GMContext.data.GateRewards.splice(e.target.id, 1);
  };
  const onGRAdd = e => {
    GMContext.data.GateRewards.push({
      title: "",
      body: "",
      imageURL: ""
    });
  };

  // 이미지 업로드
  const onImgPost = e => {
    const form = new FormData();
    const { name } = e.target;
    form.append("images", e.target.files[0]);
    toast("이미지 업로드 중입니다.");

    axios
      .post(`${MAINURL}/admin/gatemission/upload`, form, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: Store.auth.accessToken
        }
      })
      .then(res => {
        GMContext.data.GateRewards[name].imageURL = res.data.Data.imageURLs[0];
        toast.success("이미지가 업로드 되었습니다.");
      })
      .catch(err => {
        toast.error("이미지가 업로드가 실패하였습니다.");
        console.log(err.response);
      });
  };

  // 이미지 업로드
  const onBGPost = e => {
    const form = new FormData();
    form.append("images", e.target.files[0]);
    toast("이미지 업로드 중입니다.");

    axios
      .post(`${MAINURL}/admin/gatemission/upload`, form, {
        headers: {
          "content-type": "multipart/form-data",
          authorization: Store.auth.accessToken
        }
      })
      .then(res => {
        GMContext.data.imageURL = res.data.Data.imageURLs[0];
        toast.success("이미지가 업로드 되었습니다.");
      })
      .catch(err => {
        toast.error("이미지가 업로드가 실패하였습니다.");
        console.log(err.response);
      });
  };

  // 게이트 비디오 관련
  const onVideoDelete = e => {
    GMContext.data.GateVideos.splice(e.target.id, 1);
  };
  const onVideoAdd = e => {
    if (GMContext.data.GateVideos.length < 3) {
      GMContext.data.GateVideos.push({
        videoURL: ""
      });
    } else {
      notify("3개 까지만 추가 가능합니다.");
    }
  };

  // 게이트 선택 관련
  const onSLDelete = e => {
    GMContext.data.SelectionLists.splice(e.target.id, 1);
  };
  const onSLAdd = e => {
    if (GMContext.data.GateVideos.length < 5) {
      GMContext.data.SelectionLists.push({
        title: "",
        body: "",
        imageURL: ""
      });
    } else {
      notify("5개 까지만 추가 가능합니다.");
    }
  };

  return (
    <>
      <BigTitle title="게이트 미션" />
      <Board01
        wide
        list={
          <>
            {data ? (
              data.GateMissions.map((mission, index) => {
                return (
                  <React.Fragment key={index}>
                    <BoardList01
                      key={index}
                      tag={setOKType(mission.okType)}
                      subtitle={`GATE ${mission.number}`}
                      title={mission.title}
                      active={now === mission.number ? true : false}
                      onClick={() => {
                        if (now !== mission.number) {
                          isDetailUpdate(false);
                          isUpdate(false);
                          setMode("View");
                          setNow(mission.number);
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
          mode === "View" ? (
            <>
              {datailUpdate ? (
                <>
                  <div className="board01_title">
                    <div className="board01_title-left">
                      <h4
                        style={{ marginBottom: 4, color: "#777777" }}
                      >{`GATE ${GMContext.data.number}`}</h4>
                      <h3>{GMContext.data.title}</h3>
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
                    </div>
                  </div>
                  <hr />
                  <div className="board01_flexbox">
                    <div className="columns_box">
                      <h5>타입</h5>
                      {setOKType(GMContext.data.okType)}
                      <h5>커버 사진</h5>
                      {GMContext.data.imageURL ? (
                        <div
                          className="img_box"
                          style={{
                            background: `url(${GMContext.data.imageURL}) center / cover`
                          }}
                        />
                      ) : (
                        <h4>등록된 이미지 없음</h4>
                      )}
                      <br />
                      <h5>달성조건</h5>
                      <h4>{GMContext.data.condition}</h4>
                      <br />
                      <h5>상세조건</h5>
                      <h4>
                        {GMContext.data.detail
                          .split("\n")
                          .map((line, index) => {
                            return (
                              <span key={index}>
                                {line}
                                <br />
                              </span>
                            );
                          })}
                      </h4>
                      <br />
                      <h5>꿀팁</h5>
                      <h4>
                        {GMContext.data.help.split("\n").map((line, index) => {
                          return (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          );
                        })}
                      </h4>
                      <br />
                      <h5>게이트 보상</h5>
                      {GMContext.data.GateRewards.length > 0 ? (
                        GMContext.data.GateRewards.map((rewards, index) => {
                          return (
                            <div className="gatemission_rewards" key={index}>
                              {rewards.imageURL ? (
                                <div
                                  className="rewards_img"
                                  style={{
                                    background: `url(${rewards.imageURL}) center / cover`
                                  }}
                                />
                              ) : (
                                <h4>등록된 이미지 없음</h4>
                              )}
                              <div className="rewards_desc">
                                <div className="rewards_title">
                                  <h5>{rewards.title}</h5>
                                </div>
                                <div className="rewards_body">
                                  <h4>{rewards.body}</h4>
                                </div>
                              </div>
                              <br />
                            </div>
                          );
                        })
                      ) : (
                        <>
                          -<br />
                        </>
                      )}
                    </div>
                    <div className="columns_line" />
                    <div className="columns_box">
                      <br />
                      <h5>게이트 비디오</h5>
                      {GMContext.data.GateVideos.length > 0 ? (
                        GMContext.data.GateVideos.map((videos, index) => {
                          return (
                            <div className="gatemission_videos" key={index}>
                              <h4>
                                링크 {index + 1} :{" "}
                                <a
                                  href={videos.videoURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {videos.videoURL}
                                </a>
                              </h4>
                            </div>
                          );
                        })
                      ) : (
                        <>
                          -<br />
                        </>
                      )}
                      <br />
                      {GMContext.data.okType === 6 && (
                        <>
                          <h5>선택 리스트</h5>
                          {GMContext.data.SelectionLists.length > 0 ? (
                            GMContext.data.SelectionLists.map((list, index) => {
                              return (
                                <div className="gatemission_list" key={index}>
                                  <h4>{list.title}</h4>
                                  <h5>{list.body}</h5>
                                  {list.videoURL && (
                                    <h5>
                                      <a
                                        href={list.videoURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {list.videoURL}
                                      </a>
                                    </h5>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <>
                              -<br />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Loading />
              )}
            </>
          ) : (
            <>
              <div className="board01_title">
                <div className="board01_title-left">
                  <h4
                    style={{ marginBottom: 4, color: "#777777" }}
                  >{`GATE ${GMContext.data.number} [수정]`}</h4>
                  <EditInput
                    value={GMContext.data.title}
                    name="title"
                    onChange={handleChange}
                  />
                </div>
                <div className="board01_title-right">
                  <div
                    className="btn btn_edit"
                    onClick={() => {
                      if (window.confirm("수정 내역을 반영하시겠습니까?")) {
                        onEdit();
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
                  {GMContext.data.imageURL ? (
                    <div
                      className="img_box"
                      style={{
                        background: `url(${GMContext.data.imageURL}) center / cover`
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
                  <h5>달성조건</h5>
                  <EditInput
                    value={GMContext.data.condition}
                    name="condition"
                    onChange={handleChange}
                  />
                  <br />
                  <h5>상세조건</h5>
                  <EditArea
                    value={GMContext.data.detail}
                    name="detail"
                    onChange={handleChange}
                  />
                  <br />
                  <h5>꿀팁</h5>
                  <EditArea
                    value={GMContext.data.help}
                    name="help"
                    onChange={handleChange}
                  />
                  <br />
                  <h5>게이트 보상</h5>
                  <Tag body="추가" color="indigo" onClick={onGRAdd} />
                  {GMContext.data.GateRewards.length > 0 ? (
                    GMContext.data.GateRewards.map((rewards, index) => {
                      const handleChange = e => {
                        rewards[e.target.name] = e.target.value;
                      };
                      const handleUpload = e => {
                        onImgPost(e);
                      };
                      return (
                        <div className="gatemission_rewards" key={index}>
                          <div>
                            {GMContext.data.imageURL ? (
                              <div
                                className="img_box"
                                style={{
                                  background: `url(${GMContext.data.imageURL}) center / cover`
                                }}
                              />
                            ) : (
                              <h4>등록된 이미지 없음</h4>
                            )}
                            <label
                              className="tag tag_teal tag_file"
                              htmlFor={"fileupload" + index}
                            >
                              IMG 업로드
                            </label>
                            <input
                              type="file"
                              accept=".jpg,.png,.gif"
                              name={index}
                              id={"fileupload" + index}
                              className="fileupload"
                              onChange={handleUpload}
                            />
                          </div>
                          <div className="rewards_desc">
                            <div className="rewards_title">
                              <EditInput
                                value={rewards.title}
                                name="title"
                                onChange={handleChange}
                                placeholder={"제목"}
                              />
                            </div>
                            <div className="rewards_body">
                              <EditInput
                                value={rewards.body}
                                name="body"
                                onChange={handleChange}
                                placeholder={"내용"}
                              />
                            </div>
                            <Tag
                              id={index}
                              body="삭제"
                              color="red"
                              onClick={onGRDelete}
                            />
                          </div>
                          <br />
                        </div>
                      );
                    })
                  ) : (
                    <>
                      -<br />
                    </>
                  )}
                </div>
                <div className="columns_line" />
                <div className="columns_box">
                  <br />
                  <h5>게이트 비디오</h5>
                  <Tag body="추가" color="indigo" onClick={onVideoAdd} />
                  {GMContext.data.GateVideos.length > 0 ? (
                    GMContext.data.GateVideos.map((videos, index) => {
                      const handleChange = e => {
                        videos[e.target.name] = e.target.value;
                      };
                      return (
                        <div className="gatemission_videos" key={index}>
                          <h5>
                            링크 {index + 1} :{" "}
                            <EditInput
                              value={videos.videoURL}
                              name="videoURL"
                              onChange={handleChange}
                              placeholder={"비디오 링크"}
                            />
                            <Tag
                              style={{ marginTop: 4 }}
                              id={index}
                              body="삭제"
                              color="red"
                              onClick={onVideoDelete}
                            />
                          </h5>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      -<br />
                    </>
                  )}
                  <br />
                  {GMContext.data.okType === 6 && (
                    <>
                      <h5>선택 리스트</h5>
                      <Tag body="추가" color="indigo" onClick={onSLAdd} />
                      {GMContext.data.SelectionLists.length > 0 ? (
                        GMContext.data.SelectionLists.map((list, index) => {
                          const handleChange = e => {
                            list[e.target.name] = e.target.value;
                          };
                          return (
                            <div className="gatemission_list" key={index}>
                              <EditInput
                                value={list.title}
                                name="title"
                                onChange={handleChange}
                                placeholder={"제목"}
                              />
                              <EditInput
                                value={list.body}
                                name="body"
                                onChange={handleChange}
                                placeholder={"내용"}
                              />
                              <EditInput
                                value={list.videoURL}
                                name="videoURL"
                                onChange={handleChange}
                                placeholder={"참고 링크 (URL)"}
                              />
                              <Tag
                                style={{ marginTop: 4 }}
                                id={index}
                                body="삭제"
                                color="red"
                                onClick={onSLDelete}
                              />
                            </div>
                          );
                        })
                      ) : (
                        <>
                          -<br />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )
        }
      />
    </>
  );
});

export default GateMission;
