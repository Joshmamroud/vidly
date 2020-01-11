import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";

class LoginForm extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { state, schema } = this;
    const options = { abortEarly: false };
    const { error } = Joi.validate(state.data, schema, options);

    if (!error) return null;

    return error.details.reduce((acc, item) => {
      acc[item.path[0]] = item.message;
      return acc;
    }, {});
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, choices, options) {
    const { valuePath = "_id", labelPath = "name" } = options || {};
    const { data, errors } = this.state;
    choices = [
      { label: "", value: "" },
      ...choices.map(option => {
        return {
          ...option,
          label: option[labelPath],
          value: option[valuePath]
        };
      })
    ];
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        choices={choices}
        errors={errors}
      />
    );
  }
}

export default LoginForm;
