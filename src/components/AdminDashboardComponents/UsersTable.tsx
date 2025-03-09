import {
  Table,
  Button,
  Avatar,
  Space,
  Popconfirm,
  Tag,
  TableColumnsType,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IUser } from "../../lib/types/userTypes";
import { UserRole } from "../../lib/types/authTypes";
import { useAuthStore } from "../../stores/authStore";
import { jwtDecode } from "jwt-decode";

type UserTableProps = {
  users: IUser[];
  onEdit: (user: IUser) => void;
  onDelete: (id: IUser["id"]) => void;
};

type UserTabelDataType = IUser & { key: React.Key };

const UsersTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  const authToken = useAuthStore((state) => state.authToken);
  const authUser = authToken ? jwtDecode<IUser>(authToken) : null;
  const columns: TableColumnsType<UserTabelDataType> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => <Avatar src={avatar} size={40} />,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === UserRole.ADMIN ? "blue" : "green"} key={role}>
          {role.toUpperCase()}
        </Tag>
      ),
      filters: [
        {
          text: "Admin",
          value: UserRole.ADMIN,
        },
        {
          text: "User",
          value: UserRole.USER,
        },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (user: IUser) =>
        user.role === UserRole.USER ? (
          <Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEdit(user)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => onDelete(user.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          "No Actions "
        ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users.filter((user) => user.id !== authUser?.id)}
      rowKey="id"
      className="shadow-md rounded-lg overflow-hidden"
      pagination={{ pageSize: 6 }}
    />
  );
};

export default UsersTable;
