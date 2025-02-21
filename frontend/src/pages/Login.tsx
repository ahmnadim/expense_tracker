import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { STORAGE_KEY } from "../constants/utils";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const mutatation = useMutation({
    mutationFn: (data: any) => login(data),
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message ??
          "Something went wrong! Please try again."
      );
    },
    onSuccess: (data: any) => {
      localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(data.user));
      navigate("/dashboard");
    },
  });

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      mutatation.mutate(values);
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card title="Login" className="w-full max-w-md">
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={mutatation?.isPending && !mutatation?.isSuccess}
            >
              Login
            </Button>
          </Form.Item>

          <div className="text-center">
            Don't have an account? <Link to="/register">Register now</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
