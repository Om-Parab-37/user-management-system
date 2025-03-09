import { useQuery } from "@tanstack/react-query";
import UserList from "../components/HomePageComponents/UserList";
import { getAllUsers } from "../services/api/userApi";
import { useUsers } from "../stores/usersStore";
import { useEffect } from "react";

const HomePage = () => {
  return (
    <>
      <UserList />
    </>
  );
};

export default HomePage;
