import { UserRole } from "./authTypes"

export interface IUser {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
    role?: UserRole
}



export type usersState = {
    users: IUser[]
}


export type UsersActions = {
    addUser: (uesr: IUser) => void
    deleteUser: (userId: IUser["id"]) => void
    setUsers: (users: IUser[]) => void
    editUser: (editedUser: IUser) => void

}

export type UserStore = usersState & UsersActions
