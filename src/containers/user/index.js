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
  SearchBar
} from "../../components/common";
import "./index.scss";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";

const User = observer(props => {
  const Store = useContext(Context);
  const [data, setData] = useState(); // 리스트 데이터
  const [userData, setUserData] = useState();
  const [userChange, setUserChange] = useState(0);
  const [now, setNow] = useState(-1); // 현재 보고있는 것
  const [mode, setMode] = useState(""); // 모드
  const [page, setPage] = useState(1); // 페이지
  const [, isUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [datailUpdate, isDetailUpdate] = useState(false);

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL && !data) {
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
  }, [Store, data]);

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

  // 토스트
  const notify = value => {
    toast.success(value);
  };

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
          notify("권한이 변경되었습니다.");
        })
        .catch(err => {
          NetworkError(err.response, Store, axiosInstance);
        });
    };
    if (window.confirm("정말 변경하시겠습니까?")) {
      axiosInstance();
    }
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

  const handleSearchInput = e => {
    setSearch(e.target.value);
  };

  const onSearch = e => {
    e.preventDefault();
    if (search) {
      const axiosInstance = () => {
        axios
          .get(`${MAINURL}/admin/user/search?email=${search}`, {
            headers: { authorization: Store.auth.accessToken }
          })
          .then(res => {
            setData({ maxPage: 1, Users: [res.data.Data] });
          })
          .catch(err => {
            NetworkError(err.response, Store, axiosInstance);
          });
      };
      axiosInstance();
    } else {
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
  };

  return (
    <>
      <BigTitle title="회원관리" />
      <SearchBar
        value={search}
        onChange={handleSearchInput}
        onSubmit={onSearch}
      />
      <Board01
        onScroll={infinityScroll}
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
