import { UserRole } from "./authTypes"

export interface IUser {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
    role?: UserRole
}
