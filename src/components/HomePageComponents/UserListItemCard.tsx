import { Card, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { IUser } from "../../lib/types/userTypes";
import { useAuthStore } from "../../stores/authStore";
import { jwtDecode } from "jwt-decode";

type UserListItemCardProps = {
  user: IUser;
};

const UserListItemCard = ({ user }: UserListItemCardProps) => {
  const authToken = useAuthStore((state) => state.authToken);
  const authUser = authToken ? jwtDecode<IUser>(authToken) : null;
  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" className="h-60" src={user.avatar} />}
        className="relative"
      >
        <Meta
          title={`${user.first_name} ${user.last_name}`}
          description={user.email}
        />
        {authUser?.id === user.id && (
          <div className="absolute top-2 right-2 z-10">
            <Tag color="blue">You</Tag>
          </div>
        )}
      </Card>
    </>
  );
};

export default UserListItemCard;
