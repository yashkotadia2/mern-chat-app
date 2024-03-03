import React from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

import { Button, Form, Input, Radio } from "antd";
import logo from "../../assets/logos/simple-chat-logo-bg-transparent.png";

const genderOptions = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

const SignUp = () => {
  const { loading, signup } = useSignup();

  const onFinish = async (values) => {
    await signup(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        border: "1px solid #eaeaea",
        borderRadius: "10px",
        padding: "20px",
        paddingBottom: "0px",
        maxWidth: 450,
        margin: "15px auto",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="simple chat logo" style={{ width: "50%" }} />
      </div>

      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginBlock: "25px",
          fontSize: "25px",
        }}
      >
        Sign Up
      </div>
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[
          {
            required: true,
            message: "Please input your Full Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          { min: 6, message: "Password must be minimum 6 characters long!" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Radio.Group
          options={genderOptions}
          optionType="button"
          buttonStyle="dashed"
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button loading={loading} type="primary" htmlType="submit">
          Sign Up
        </Button>

        <div
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
          style={{ marginTop: "10px" }}
        >
          <Link to="/login">Login Instead?</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
export default SignUp;
