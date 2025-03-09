import { Avatar, Card, Typography } from "antd";
import ModalComponent from "./ModalComponent";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/api/userApi";
import { IUser } from "../../lib/types/userTypes";
import { useUsers } from "../../stores/usersStore";
const { Title, Text } = Typography;

type UserDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: IUser["id"];
};

const UserDetailsModal = ({
  isOpen,
  onClose,
  userId,
}: UserDetailsModalProps) => {
  const users = useUsers((state) => state.users);

  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  const localUser = users.find((user) => user.id === userId);

  return (
    <>
      <ModalComponent isOpen={isOpen} onClose={onClose} title="User Details">
        <Card className="w-full max-w-md shadow-lg">
          <div className="flex flex-col items-center justify-between">
            <Avatar size={100} src={localUser?.avatar || user?.avatar} />

            <Title level={3}>
              {localUser?.first_name || user?.first_name}{" "}
              {localUser?.last_name || user?.last_name}
            </Title>

            <Text type="secondary" className="mb-5">
              {localUser?.email || user?.email}
            </Text>
          </div>
        </Card>
      </ModalComponent>
    </>
  );
};

export default UserDetailsModal;
