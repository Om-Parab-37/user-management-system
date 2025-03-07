import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, Input, Button, Flex, message, Spin } from "antd";
import { useAuthStore } from "../../stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/api/authApi";
import { useNavigate } from "react-router-dom";
import { LoginResponseType, UserRole } from "../../lib/types/authTypes";

const schema = z.object({
  email: z
    .string()
    .email("email is not well formatted")
    .min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleLogin = (data: LoginResponseType) => {
    messageApi.open({
      type: "success",
      content: "Login Successful",
    });
    login(data.token, data.userRole);
    if (data.userRole === UserRole.ADMIN) navigate("/admin-dashboard");
    else navigate("/home-page");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: handleLogin,
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message || "Something went wrong",
      });
    },
  });

  const login = useAuthStore((state) => state.login);

  const onSubmit = (values: FormData) => {
    mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Form onFinish={handleSubmit(onSubmit)}>
        <Flex vertical justify="center">
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Button size="large" type="default" htmlType="submit">
            {isPending ? <Spin /> : "Submit"}
          </Button>
        </Flex>
      </Form>
    </>
  );
};

export default LoginForm;
