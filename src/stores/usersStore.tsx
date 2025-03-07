import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser, UserStore } from "../lib/types/userTypes";

export const useUsers = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) =>
        set((state) => ({ ...state, users: [...state.users, user] })),
      deleteUser: (userId) =>
        set((state) => ({
          ...state,
          users: state.users.filter((user: IUser) => user.id != userId),
        })),
      setUsers: (users) =>
        set((state) => ({
          ...state,
          users,
        })),
      editUser: (editUser) =>
        set((state) => ({
          ...state,
          users: state.users.map((user: IUser) =>
            user.id === editUser.id ? editUser : user
          ),
        })),
    }),
    { name: "users" }
  )
);
