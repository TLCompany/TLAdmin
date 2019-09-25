import React from "react";
import "./index.scss";

const index = props => {
  return (
    <div className="smallmenu">
      <div className="smallmenu_bar" />
      <div className="smallmenu_img" />
      <div className="smallmenu_text">{props.title}</div>
    </div>
  );
};

export default index;
