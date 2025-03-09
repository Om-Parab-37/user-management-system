import { useQuery } from "@tanstack/react-query";
import UserList from "../components/HomePageComponents/UserList";
import { getAllUsers } from "../services/api/userApi";
import { useUsers } from "../stores/usersStore";
import { useEffect } from "react";

const HomePage = () => {
  const setUsers = useUsers((state) => state.setUsers);
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  useEffect(() => {
    if (users) setUsers(users);
    console.log(users);
  }, []);
  return (
    <>
      <UserList />
    </>
  );
};

export default HomePage;
