import { Avatar, Card, Typography } from "antd";
import ModalComponent from "./ModalComponent";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/api/userApi";
import { IUser } from "../../lib/types/userTypes";
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
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });
  return (
    <>
      <ModalComponent isOpen={isOpen} onClose={onClose} title="User Details">
        <Card className="w-full max-w-md shadow-lg">
          <div className="flex flex-col items-center justify-between">
            <Avatar size={100} src={user?.avatar} />

            <Title level={3}>
              {user?.first_name} {user?.last_name}
            </Title>

            <Text type="secondary" className="mb-5">
              {user?.email}
            </Text>
          </div>
        </Card>
      </ModalComponent>
    </>
  );
};

export default UserDetailsModal;
