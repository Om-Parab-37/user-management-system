import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <div className="flex gap-4 justify-center">
            <Button type="primary" onClick={() => navigate("/")}>
              Go Home
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default UnauthorizedPage;
