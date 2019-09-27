import React from "react";
import "./index.scss";

const CInput = props => {
  return (
    <div className="cinput">
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        required
      />
      <label>{props.label}</label>
    </div>
  );
};

CInput.defaultProps = {
  placeholder: " "
};

export default CInput;
