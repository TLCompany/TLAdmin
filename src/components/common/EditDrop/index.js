import React from "react";
import "./index.scss";

const EditDrop = props => {
  return (
    <div className="editdrop">
      <select name={props.name} value={props.value} onChange={props.onChange}>
        <option>선택하세요!</option>
        {props.data.map((db, index) => {
          return (
            <option key={index} value={db.value}>
              {db.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

EditDrop.defaultProps = {
  data: []
};

export default EditDrop;
