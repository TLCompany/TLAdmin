import React from "react";
import "./index.scss";

const BoardList01 = props => {
  return (
    <div
      style={props.style}
      className={`boardlist01 ${props.active && "boardlist01_active"}`}
      onClick={props.onClick}
    >
      <div className="boardlist01_line" />
      <div className="boardlist01_detail">
        {props.tag}
        <h5>{props.subtitle}</h5>
        <h4>{props.title}</h4>
        {props.fotter}
      </div>
    </div>
  );
};

export default BoardList01;
