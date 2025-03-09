import UserListItemCard from "./UserListItemCard";
import { useState } from "react";
import { IUser } from "../../lib/types/userTypes";
import { Col, Pagination, Row } from "antd";
import UserDetailsModal from "../GobalComponents/UserDetailsModal";
import { useUsers } from "../../stores/usersStore";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<IUser["id"]>(1);

  const users = useUsers((state) => state.users);

  const handleUserSelection = (userId: IUser["id"]) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const paginatedUsers = users.slice((currentPage - 1) * 6, currentPage * 6);

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={selectedUserId}
      />
      <Row gutter={[16, 16]} justify="center">
        {paginatedUsers?.map((user: IUser) => (
          <Col
            className="flex justify-center items-center"
            key={user.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
          >
            <UserListItemCard
              user={user}
              onClick={() => handleUserSelection(user.id)}
            />
          </Col>
        ))}
      </Row>
      <div className="fixed bottom-0 bg-white py-4 shadow-md flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={6}
          total={users.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default UserList;
