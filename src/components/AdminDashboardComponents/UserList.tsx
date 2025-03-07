import { useQuery } from "@tanstack/react-query";
import UserListItemCard from "./UserListItemCard";
import { getAllUsers } from "../../services/api/userApi";
import { useState } from "react";
import { IUser } from "../../lib/types/userTypes";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: users } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () => getAllUsers(currentPage),
  });

  return (
    <div className="flex flex-wrap w-svw m-auto gap-4">
      {users?.map((user: IUser) => (
        <UserListItemCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
