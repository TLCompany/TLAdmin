import React from "react";
import "./index.scss";

const Board01 = props => {
  return (
    <div className="board01">
      <div className="board01_leftlist">
        <div
          className="board01_list"
          style={!props.pagination ? { height: "100%" } : {}}
          onScroll={props.onScroll}
        >
          {props.list}
        </div>
        {props.pagination && (
          <div className="board01_pagination">{props.pagination}</div>
        )}
      </div>
      <div className="board01_rightdetail">{props.detail}</div>
    </div>
  );
};

export default Board01;
