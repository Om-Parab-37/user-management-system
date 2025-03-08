import { useState } from "react";
import CreateUserModal from "../components/AdminDashboardComponents/CreateUserModal";
import { Button } from "antd";
import UsersTable from "../components/AdminDashboardComponents/UsersTable";
import { useUsers } from "../stores/usersStore";
import { IUser } from "../lib/types/userTypes";
import EditUserModal from "../components/AdminDashboardComponents/EditUserModel";

const AdminDashboard = () => {
  const users = useUsers((state) => state.users);
  const deleteUser = useUsers((state) => state.deleteUser);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser>(users[0]);

  const handleEditUser = (user: IUser) => {
    setEditingUser(user);
    setIsEditUserModalOpen(true);
  };
  return (
    <>
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <Button
          type="primary"
          size="large"
          onClick={() => setIsCreateUserModalOpen(true)}
        >
          Add New User
        </Button>
      </div>

      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
      />
      <EditUserModal
        user={editingUser}
        isOpen={isEditUserModalOpen}
        onClose={() => setIsEditUserModalOpen(false)}
      />
      <div className="p-5">
        <UsersTable
          users={users}
          onEdit={handleEditUser}
          onDelete={deleteUser}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
