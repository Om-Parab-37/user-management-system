import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { IUser } from "../../lib/types/userTypes";

type UserListItemCardProps = {
  user: IUser;
};

const UserListItemCard = ({ user }: UserListItemCardProps) => {
  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={user.avatar} />}
      >
        <Meta
          title={`${user.first_name} ${user.last_name}`}
          description={user.email}
        />
      </Card>
    </>
  );
};

export default UserListItemCard;
