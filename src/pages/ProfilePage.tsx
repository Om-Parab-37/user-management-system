import { Card, Avatar, Typography, Tag } from "antd";
import { useAuthStore } from "../stores/authStore";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../lib/types/userTypes";
import { UserRole } from "../lib/types/authTypes";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const authToken = useAuthStore((state) => state.authToken);
  const authUser = authToken ? jwtDecode<IUser>(authToken) : null;
  const authUserRole = useAuthStore((state) => state.userRole);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="flex flex-col items-center justify-between">
          <Avatar size={100} src={authUser?.avatar} />

          <Title level={3}>
            {authUser?.first_name} {authUser?.last_name}
          </Title>

          <Text type="secondary" className="mb-5">
            {authUser?.email}
          </Text>

          <Tag
            color={authUserRole === UserRole.ADMIN ? "blue" : "green"}
            className="mr-7"
          >
            {authUserRole}
          </Tag>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
