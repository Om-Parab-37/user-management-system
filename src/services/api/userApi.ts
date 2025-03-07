import { IUser } from "../../lib/types/userTypes";
import { userApi } from "./AxiosInstance";

export const getUsersByPageNumber: (pageNumber: number) => Promise<IUser[]> = async (pageNumber: number) => (await userApi.get(`/users?page=${pageNumber}`)).data.data


export const getUserById: (userId: number) => Promise<IUser> = async (userId: number) => ((await userApi.get(`/users/${userId}`)).data.data)

export const updateUserById: (userId: number) => Promise<IUser> = async (userId) => await userApi.put(`/users/${userId}`)

export const addNewUser: (user: IUser) => Promise<IUser> = async (user) => await userApi.post(`/users`, user)