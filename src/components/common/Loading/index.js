import React from "react";
import "./index.scss";

export default function Loading(props) {
  if (props.white) {
    return (
      <div className="loading_container">
        <div className="loading_white" />
      </div>
    );
  } else {
    return (
      <div className="loading_container">
        <div className="loading" />
      </div>
    );
  }
}
