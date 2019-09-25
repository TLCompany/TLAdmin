import React from "react";
import "./index.scss";

const index = props => {
  return (
    <div className="card">
      <div className="card_title">
        <h3>{props.title}</h3>
      </div>
      <div className="card_subtitle">
        <h5>{props.subtitle}</h5>
      </div>
      <div className="card_body">{props.body}</div>
    </div>
  );
};

export default index;
