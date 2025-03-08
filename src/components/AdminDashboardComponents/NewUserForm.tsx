import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { UserRole } from "../../lib/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { IUser } from "../../lib/types/userTypes";
import { useMutation } from "@tanstack/react-query";
import { addNewUser } from "../../services/api/userApi";
import { useUsers } from "../../stores/usersStore";

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
const defaultAvtarUrl =
  "data:image/jpeg;base64,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";

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
