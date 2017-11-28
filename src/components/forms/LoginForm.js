import React from "react";
import validator from "validator";
import PropTypes from "prop-types";
import { Button, Form } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  state = { data: { email: "", password: "" }, errors: {} };

  onChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: err.response.data.errors
        })
      );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (!validator.isEmail(data.email)) errors.email = "Invalid email";
    return errors;
  };
  render() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            onChange={this.onChange}
            value={data.email}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="make it secure"
            onChange={this.onChange}
            value={data.password}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
