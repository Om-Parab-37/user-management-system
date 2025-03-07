import { Layout, Dropdown, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../../stores/authStore";
import { UserRole } from "../../lib/types/authTypes";
import { IUser } from "../../lib/types/userTypes";

const { Header } = Layout;

const Navbar = () => {
  const authToken = useAuthStore((state) => state.authToken);
  const authUser = authToken ? jwtDecode<IUser>(authToken) : null;
  const authUserRole = useAuthStore((state) => state.userRole);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const userMenu = {
    items: [
      {
        label: "profile",
        key: "profile",
        icon: <UserOutlined />,
        onClick: () => {
          navigate("/profile");
        },
      },
      {
        label: "logout",
        key: "logout",
        icon: <LogoutOutlined />,
        onClick: () => {
          logout();
          navigate("/login");
        },
      },
    ],
  };

  return (
    <Header className="bg-white shadow-md px-4 flex justify-between items-center">
      <div className="text-lg font-bold text-blue-600">
        <Link to="/" replace>
          MyApp
        </Link>
      </div>

      {authToken && (
        <div className=" md:flex space-x-6">
          <Link to="/home-page" className="hover:text-gray-300" replace>
            Home
          </Link>
          {authUserRole === UserRole.ADMIN && (
            <Link to="/admin-dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          )}
        </div>
      )}

      {authToken && (
        <Dropdown menu={userMenu} trigger={["click"]}>
          <Avatar
            size={45}
            icon={<img src={authUser?.avatar} />}
            className="cursor-pointer"
          />
        </Dropdown>
      )}
    </Header>
  );
};

export default Navbar;
