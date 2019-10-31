import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Auth,
  DashBoard,
  User,
  GateMission,
  NormalPost,
  Announcement,
  GatePost,
  Push
} from "../containers";
import { Header, LoginHeader } from "../components/home";
import "./index.scss";
import { Context } from "../store";

const MainRouter = props => {
  const Store = useContext(Context);
  const PATH_NAME = document.location.pathname;
  // 주소별 헤더 표시
  const HeaderChoice = value => {
    if (PATH_NAME.slice(1, 6) === "admin") {
      if (PATH_NAME.slice(7, 8)) {
        return <Header />;
      } else {
        return <LoginHeader />;
      }
    } else {
      console.log("현재 메인");
    }
  };

  useEffect(() => {
    // 로그인 확인
    if (document.location.pathname !== "/admin" && Store.auth) {
      if (!Store.auth.id) {
        document.location.href = "/admin";
      }
    } else if (document.location.pathname === "/admin" && Store.auth) {
      if (Store.auth.id) {
        document.location.href = "/admin/dashboard";
      }
    }
  }, [Store]);

  return (
    <>
      <Router>
        {HeaderChoice()}
        <div
          className="container"
          style={{ marginLeft: PATH_NAME === "/admin" && 0 }}
        >
          <div className="wrap">
            <Switch>
              <Route exact path="/admin" component={Auth} />
              <Route exact path="/admin/dashboard" component={DashBoard} />
              <Route exact path="/admin/user" component={User} />
              <Route exact path="/admin/gatemission" component={GateMission} />
              <Route exact path="/admin/normalpost" component={NormalPost} />
              <Route exact path="/admin/gatepost" component={GatePost} />
              <Route exact path="/admin/push" component={Push} />
              <Route
                exact
                path="/admin/announcement"
                component={Announcement}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};

export default MainRouter;
