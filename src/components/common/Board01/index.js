import React from "react";
import "./index.scss";

const Board01 = props => {
  return (
    <div className="board01">
      <div className="board01_leftlist" onScroll={props.onScroll}>
        {props.list}
      </div>
      <div className="board01_rightdetail">{props.detail}</div>
    </div>
  );
};

export default Board01;
