import React from "react";
import { BigTitle, Card } from "../../components/common";
import "./index.scss";

const DashBoard = () => {
  return (
    <>
      <BigTitle title="대시보드" />
      <div className="cardboard">
        <Card
          title="총 가입자"
          subtitle="오늘"
          body={
            <>
              <div className="card_body-flex">
                <h1>25</h1>
                <h3>가입</h3>
              </div>
            </>
          }
        />
        <Card
          title="게이트 포스트"
          subtitle="오늘"
          body={
            <>
              <div className="card_body-flex">
                <h1>25</h1>
                <h3>가입</h3>
              </div>
            </>
          }
        />
        <Card
          title="일반 포스트"
          subtitle="오늘"
          body={
            <>
              <div className="card_body-flex">
                <h1>25</h1>
                <h3>가입</h3>
              </div>
            </>
          }
        />
      </div>
    </>
  );
};

export default DashBoard;
