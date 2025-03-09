import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { UserRole } from "../../lib/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { useMutation } from "@tanstack/react-query";
import { addNewUser } from "../../services/api/userApi";
import { useUsers } from "../../stores/usersStore";
import { defaultAvtarUrl } from "../../lib/constants";

type NewUserFormProps = {
  onUserAdded: () => void;
};

const userFormScema = z.object({
  email: z
    .string()
    .email("email is not well formatted")
    .min(3, "Username must be at least 3 characters"),
  first_name: z.string().min(2, "first name must be at least 2 characters"),
  last_name: z.string().min(2, "first name must be at least 2 characters"),
  avatar: z.string().url(),
  role: z.nativeEnum(UserRole),
});

const NewUserForm = ({ onUserAdded }: NewUserFormProps) => {
  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userFormScema>>({
    resolver: zodResolver(userFormScema),
  });

  const [messageApi, contextHolder] = message.useMessage();
  const addUser = useUsers((state) => state.addUser);

  const { isPending, mutate } = useMutation({
    mutationKey: ["addUser"],
    mutationFn: addNewUser,
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "User added successful",
      });
      addUser({ ...getValues(), id: Date.now() });
      onUserAdded();
    },

    onError: (error) =>
      messageApi.open({
        type: "error",
        content: error.message,
      }),
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Form
        onFinish={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-xl"
      >
        <h2 className="text-2xl font-semibold text-center  text-gray-700">
          Create New User
        </h2>

        <div className="flex flex-col items-center mb-2">
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <>
                <img
                  src={field.value || defaultAvtarUrl}
                  alt="Avatar Preview"
                  className="w-24 h-24 m-3 rounded-full border shadow-md object-cover"
                />
                <Input
                  {...field}
                  className="mt-3 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Avatar URL"
                />
                {errors.avatar && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.avatar.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <Form.Item
            label="First Name"
            validateStatus={errors.first_name ? "error" : ""}
            help={errors.first_name?.message}
            className="w-full"
          >
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            validateStatus={errors.last_name ? "error" : ""}
            help={errors.last_name?.message}
            className="w-full"
          >
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
          className="w-full"
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Role"
          validateStatus={errors.role ? "error" : ""}
          help={errors.role?.message}
          className="w-full"
        >
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "user", label: "User" },
                ]}
                placeholder="Select a Role"
                {...field}
                className="w-full p-2 border rounded-lg"
              />
            )}
          />
        </Form.Item>

        <div className="flex justify-center mt-4">
          <Button
            size="large"
            type="default"
            htmlType="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isPending ? <Spin /> : "Submit"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default NewUserForm;
