import React from "react";
import useLogin from "../../hooks/useLogin";
import { Button, Form, Input } from "antd";
import logo from "../../assets/logos/simple-chat-logo-bg-transparent.png";
import { Link } from "react-router-dom";

const Login = () => {

  const { loading, login } = useLogin();

  const handleSubmit = async (values) => {
    await login(values.username, values.password);
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
        maxWidth: 320,
        margin: "10vh auto",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit}
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
        Login
      </div>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
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
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button loading={loading} type="primary" htmlType="submit">
          Login
        </Button>

        <div
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
          style={{ marginTop: "10px" }}
        >
          <Link to="/signup">Register Instead?</Link>
        </div>
      </Form.Item>
    </Form>
  );
};
export default Login;

// STARTER CODE FOR THIS FILE
// const Login = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Login
// 					<span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='label p-2'>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Enter Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>
// 					<a href='#' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
// 						{"Don't"} have an account?
// 					</a>

// 					<div>
// 						<button className='btn btn-block btn-sm mt-2'>Login</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default Login;
