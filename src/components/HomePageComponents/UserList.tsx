import { useQuery } from "@tanstack/react-query";
import UserListItemCard from "./UserListItemCard";
import { getUsersByPageNumber } from "../../services/api/userApi";
import { useState } from "react";
import { IUser } from "../../lib/types/userTypes";
import { Col, Pagination, Row } from "antd";
import UserDetailsModal from "../GobalComponents/UserDetailsModal";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<IUser["id"]>(1);

  const { data: users } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () => getUsersByPageNumber(currentPage),
  });

  const handleUserSelection = (userId: IUser["id"]) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={selectedUserId}
      />
      <Row gutter={[16, 16]} justify="center">
        {users?.map((user: IUser) => (
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
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={6}
          total={12}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false} // Hide option to change page size
        />
      </div>
    </div>
  );
};

export default UserList;
