import React from "react";
import { SmallMenu } from "..";
import { NavLink } from "react-router-dom";
import "./index.scss";

const index = () => {
  return (
    <div className="header">
      <div className="header_title">
        <div className="header_title-img" />
        <div className="header_title-title">
          골프로드 72
          <div className="header_title-subtitle">일이삼사오륙칠팔</div>
        </div>
      </div>
      <NavLink exact to="/admin/dashboard">
        <SmallMenu title="대시보드" activeClassName="smallmenu_active" />
      </NavLink>
      <NavLink exact to="/admin/user">
        <SmallMenu title="회원관리" activeClassName="smallmenu_active" />
      </NavLink>
      <NavLink exact to="/admin/gatepost">
        <SmallMenu title="게이트 포스트" activeClassName="smallmenu_active" />
      </NavLink>
      <NavLink exact to="/admin/normalpost">
        <SmallMenu title="기본 포스트" activeClassName="smallmenu_active" />
      </NavLink>
      <NavLink exact to="/admin/gatemission">
        <SmallMenu title="게이트 미션" activeClassName="smallmenu_active" />
      </NavLink>
      <NavLink exact to="/admin/announcement">
        <SmallMenu title="공지사항" activeClassName="smallmenu_active" />
      </NavLink>
      <NavLink exact to="/admin/push">
        <SmallMenu title="푸시 알림" activeClassName="smallmenu_active" />
      </NavLink>
    </div>
  );
};

export default index;
