import axios from "axios";
import { IUser } from "../../lib/types/userTypes";
import { userApi } from "./AxiosInstance";

export const getUsersByPageNumber: (pageNumber: number) => Promise<IUser[]> = async (pageNumber: number) => (await userApi.get(`/users?page=${pageNumber}`)).data.data

export const getAllUsers: () => Promise<IUser[]> = async () => (await axios.all([(await userApi.get(`/users?page=1`)).data, (await userApi.get(`/users?page=2`)).data]))

export const getUserById: (userId: number) => Promise<IUser> = async (userId: number) => ((await userApi.get(`/users/${userId}`)).data.data)

export const updateUserById: (user: IUser) => Promise<IUser> = async (user) => await userApi.put(`/users/${user.id}`, user)

export const addNewUser: (user: IUser) => Promise<IUser> = async (user) => await userApi.post(`/users`, user)