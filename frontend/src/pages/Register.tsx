import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/auth";
import { useMutation } from "@tanstack/react-query";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const mutatation = useMutation({
    mutationFn: (data: any) => register(data),
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message ??
          "Something went wrong! Please try again."
      );
    },
    onSuccess: (data: any) => {
      message.success("Registration successful!");
      navigate("/login");
    },
  });

  const onFinish = async (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      mutatation.mutate(values);
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card title="Register" className="w-full max-w-md">
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
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
                min: 6,
                message: "Password must be at least 6 characters!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
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
              Register
            </Button>
          </Form.Item>

          <div className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
