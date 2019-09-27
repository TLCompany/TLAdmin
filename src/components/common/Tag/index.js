import React from "react";
import "./index.scss";

const Tag = props => {
  return (
    <div>
      <div
        id={props.id}
        onClick={props.onClick}
        className={`tag tag_${props.color}`}
        style={props.style}
      >
        {props.body}
      </div>
    </div>
  );
};

export default Tag;
