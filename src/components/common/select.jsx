import React from "react";

const Select = ({ name, label, error, value, choices, ...rest }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        className="custom-select"
        {...rest}
      >
        {choices.map(choice => {
          return (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
