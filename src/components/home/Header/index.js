import React, { useContext } from "react";
import { SmallMenu } from "..";
import { NavLink } from "react-router-dom";
import "./index.scss";
import { Context } from "../../../store";

const Main = () => {
  const Store = useContext(Context);

  const onLogOut = e => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      Store.actions.setAuth({});
      document.location.href = "/admin";
    }
  };

  return (
    <div className="header">
      <div className="header_title">
        <div className="header_title-img" />
        <div className="header_title-title">
          골프로드 72
          <div className="header_title-subtitle">
            {Store && Store.auth.masterID} 님
          </div>
        </div>
      </div>
      <NavLink exact to="/admin/dashboard">
        <SmallMenu
          title="대시보드"
          activeClassName="smallmenu_active"
          img={<ion-icon name="home" />}
        />
      </NavLink>
      <NavLink exact to="/admin/user">
        <SmallMenu
          title="회원관리"
          activeClassName="smallmenu_active"
          img={<ion-icon name="contacts" />}
        />
      </NavLink>
      <NavLink exact to="/admin/gatepost">
        <SmallMenu
          title="게이트 포스트"
          activeClassName="smallmenu_active"
          img={<ion-icon name="image" />}
        />
      </NavLink>
      <NavLink exact to="/admin/normalpost">
        <SmallMenu
          title="기본 포스트"
          activeClassName="smallmenu_active"
          img={<ion-icon name="list-box" />}
        />
      </NavLink>
      <NavLink exact to="/admin/gatemission">
        <SmallMenu
          title="게이트 미션"
          activeClassName="smallmenu_active"
          img={<ion-icon name="flag" />}
        />
      </NavLink>
      <NavLink exact to="/admin/community">
        <SmallMenu
          title="커뮤니티"
          activeClassName="smallmenu_active"
          img={<ion-icon name="people" />}
        />
      </NavLink>
      <NavLink exact to="/admin/community/join">
        <SmallMenu
          title="커뮤니티 가입신청"
          activeClassName="smallmenu_active"
          img={<ion-icon name="list" />}
        />
      </NavLink>
      <NavLink exact to="/admin/announcement">
        <SmallMenu
          title="공지사항"
          activeClassName="smallmenu_active"
          img={<ion-icon name="text" />}
        />
      </NavLink>
      <NavLink exact to="/admin/inqueries">
        <SmallMenu
          title="문의내역"
          activeClassName="smallmenu_active"
          img={<ion-icon name="help-circle" />}
        />
      </NavLink>
      <NavLink exact to="/admin/push">
        <SmallMenu
          title="푸시 알림"
          activeClassName="smallmenu_active"
          img={<ion-icon name="notifications" />}
        />
      </NavLink>
      <SmallMenu
        onClick={onLogOut}
        title="로그아웃"
        img={<ion-icon name="log-out" />}
      />
    </div>
  );
};

export default Main;
