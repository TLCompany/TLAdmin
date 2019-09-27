import React from "react";
import "./index.scss";

const EditInput = props => {
  return (
    <div className="editinput">
      <label>{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        required
      />
    </div>
  );
};

export default EditInput;
