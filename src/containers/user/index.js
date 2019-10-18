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

const User = observer(props => {
  const Store = useContext(Context);
  const [data, setData] = useState(); // 리스트 데이터
  const [userData, setUserData] = useState();
  const [userChange, setUserChange] = useState(0);
  const [now, setNow] = useState(-1); // 현재 보고있는 것
  const [mode, setMode] = useState(""); // 모드
  const [, isUpdate] = useState(false);
  const [datailUpdate, isDetailUpdate] = useState(false);

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/user?page=1`, {
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

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL && now > -1) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/user/show/${now}`, {
            headers: { authorization: Store.auth.accessToken }
          })
          .then(res => {
            setUserData(res.data.Data);
            setUserChange(res.data.Data.userType);
            isDetailUpdate(true);
            isUpdate(true);
          })
          .catch(err => {
            NetworkError(err.response, Store, axiosInstance);
          });
      };
      axiosInstance();
    } else {
      setUserData();
    }
  }, [Store, now]);

  // 수정 스테이트 변경
  const handleChange = e => {
    setUserChange(e.target.value);
  };

  const sysLang = value => {
    switch (value * 1) {
      case 0:
        return "한국어";
      case 1:
        return "영어";
      case 2:
        return "중국어";
      default:
        break;
    }
  };

  const loginType = value => {
    switch (value * 1) {
      case 1:
        return "자체가입";
      case 2:
        return "카카오";
      case 3:
        return "구글";
      case 4:
        return "네이버";
      default:
        break;
    }
  };

  const userType = value => {
    switch (value * 1) {
      case 0:
        return "일반사용자";
      case 1:
        return "매니저";
      case 9:
        return "슈퍼관리자";
      default:
        break;
    }
  };

  const onUserChange = e => {
    const axiosInstance = () => {
      axios
        .put(
          `${MAINURL}/admin/user`,
          {
            Data: {
              id: userData.id,
              level: userChange * 1
            }
          },
          {
            headers: { authorization: Store.auth.accessToken }
          }
        )
        .then(res => {
          setUserData(res.data.Data);
          isUpdate(true);
        })
        .catch(err => {
          NetworkError(err.response, Store, axiosInstance);
        });
    };
    if (window.confirm("정말 변경하시겠습니까?")) {
      axiosInstance();
    }
  };

  return (
    <>
      <BigTitle title="회원관리" />
      <Board01
        list={
          <>
            {data ? (
              data.Users.map((user, index) => {
                return (
                  <React.Fragment key={index}>
                    <BoardList01
                      key={index}
                      subtitle={`[${user.id}] ${user.email}`}
                      title={user.nickname}
                      active={now === user.id ? true : false}
                      onClick={() => {
                        if (now !== user.id) {
                          isDetailUpdate(false);
                          isUpdate(false);
                          setMode("View");
                          setNow(user.id);
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
              {datailUpdate ? (
                <>
                  <div className="board01_title">
                    <div className="board01_title-left">
                      <h4
                        style={{ marginBottom: 4, color: "#777777" }}
                      >{`${userData.id}`}</h4>
                      <h3>{userData.nickname}</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="board01_flexbox">
                    <div className="columns_box">
                      <h5>이메일</h5>
                      <h4>{userData.email}</h4>
                      <br />
                      <h5>현재 게이트</h5>
                      <h4>{userData.level}</h4>
                      <br />
                      <h5>로그인 타입</h5>
                      <h4>{loginType(userData.loginType)}</h4>
                      <br />
                      <h5>포인트</h5>
                      <h4>{userData.point}</h4>
                      <br />
                      <h5>멤버쉽 ID</h5>
                      <h4>{userData.membershipID}</h4>
                      <br />
                      <h5>프로필 URL</h5>
                      <h4
                        style={{
                          maxWidth: 300,
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden"
                        }}
                      >
                        {userData.profileURL}
                      </h4>
                      <br />
                      <h5>시스템 언어</h5>
                      <h4>{sysLang(userData.sysLang)}</h4>
                    </div>
                    <div className="columns_line" />
                    <div className="columns_box">
                      <h5>유저 타입</h5>
                      <h4>{userType(userData.userType)}</h4>
                      <br />
                      <h5>회원권한 변경</h5>
                      <select value={userChange} onChange={handleChange}>
                        <option value={0}>일반 사용자</option>
                        <option value={1}>매니저</option>
                        <option value={9}>슈퍼어드민</option>
                      </select>
                      <br />
                      <br />
                      <Tag
                        body="회원권한 변경"
                        color="indigo"
                        onClick={onUserChange}
                      />
                      <br />
                    </div>
                  </div>
                </>
              ) : (
                <Loading />
              )}
            </>
          )
        }
      />
    </>
  );
});

export default User;
