import { useState } from "react";
import CreateUserModal from "../components/AdminDashboardComponents/CreateUserModal";
import UserList from "../components/HomePageComponents/UserList";
import { Button } from "antd";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>AdminDashboard</div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add New User
      </Button>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <UserList />
    </>
  );
};

export default AdminDashboard;
