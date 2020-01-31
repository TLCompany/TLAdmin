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
import { toast } from "react-toastify";

const CommunityJoin = observer(props => {
  const Store = useContext(Context);
  const [data, setData] = useState(); // 리스트 데이터
  const [now, setNow] = useState(-1); // 현재 보고있는 것
  const [mode, setMode] = useState(""); // 모드

  useEffect(() => {
    if (Store.auth.accessToken && MAINURL && !mode) {
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
  }, [Store, mode]);

  let nowData;
  if (data) {
    nowData = data.filter(post => post.community.id === now)[0];
  }

  const onApprove = (UID, CID) => {
    if (window.confirm("승인하시겠습니까?")) {
      axios
        .post(
          `${MAINURL}/admin/community/join/approve`,
          {
            Data: {
              userID: UID,
              communityID: CID
            }
          },
          {
            headers: { authorization: Store.auth.accessToken }
          }
        )
        .then(res => {
          toast.success("승인하였습니다.");
          setMode("");
        })
        .catch(err => {
          NetworkError(err.response, Store);
        });
    }
  };

  return (
    <>
      <BigTitle title="커뮤니티 가입신청" />
      <Board01
        list={
          <>
            {data ? (
              data.map((an, index) => {
                return (
                  <React.Fragment key={index}>
                    <BoardList01
                      key={index}
                      subtitle={`${an.community.name}`}
                      title={an.community.intro}
                      active={now === an.community.id ? true : false}
                      onClick={() => {
                        if (now !== an.community.id) {
                          setMode("View");
                          setNow(an.community.id);
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
          <>
            {nowData ? (
              <>
                <div className="board01_title">
                  <div className="board01_title-left">
                    <h4>{nowData.community.id}</h4>
                    <h3>{nowData.community.name}</h3>
                  </div>
                  <div className="board01_title-right">
                    <div
                      className="btn btn_edit"
                      onClick={() => {
                        onApprove(nowData.user.id, nowData.community.id);
                      }}
                    >
                      <div />
                      <h5>승인</h5>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="board01_flexbox">
                  <div className="columns_box">
                    <h5>내용</h5>
                    <h4>{nowData.community.intro}</h4>
                    <br />
                    <h5>신청자</h5>
                    <h4>{nowData.user.nickname}</h4>
                    <br />
                    <h5>신청자 이메일</h5>
                    <h4>{nowData.user.email}</h4>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        }
      />
    </>
  );
});

export default CommunityJoin;
