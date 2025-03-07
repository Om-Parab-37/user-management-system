import { Card } from "antd";
import LoginForm from "../components/LoginPageComponents/LoginForm";
import { useAuthStore } from "../stores/authStore";
import { UserRole } from "../lib/types/authTypes";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.userRole);

  if (isAuthenticated)
    return userRole === UserRole.ADMIN ? (
      <Navigate to={"/admin-dashboard"} />
    ) : (
      <Navigate to={"/home-page"} />
    );

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Card className="w-80 shadow ">
          <LoginForm />
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
