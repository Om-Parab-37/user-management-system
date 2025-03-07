import { adminIds } from "../../lib/constants";
import { LoginFormInputType, LoginResponseType, UserRole } from "../../lib/types/authTypes";
import { userApi } from "./AxiosInstance";
import { getAllUsers } from "./userApi";
import jwtEncode from "jwt-encode";

export const loginUser: (loginFormInput: LoginFormInputType) => Promise<LoginResponseType> = async ({ email, password }) => {

    try {
        await userApi.post("/login", { email, password })
        const user = [...await getAllUsers(1), ...await getAllUsers(2)].find((user => user.email === email))
        const token = jwtEncode(user, import.meta.env.VITE_AUTH_SECRET)
        return {
            token, userRole: user && adminIds.includes(user.id) ? UserRole.ADMIN : UserRole.USER
        }
    } catch (e: unknown) {
        throw new Error("User Not Found")
    }


}