export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}


export type AuthState = {
    authToken: string | null
    isAuthenticated: boolean
    userRole: UserRole | null
}

export type LoginFormInputType = {
    email: string
    password: string
}

export type LoginResponseType = {
    token: string
    userRole: UserRole
}

export type AuthActions = {
    login: (newAuthToken: string, userRole: UserRole) => void
    logout: () => void
}

export type AuthStore = AuthState & AuthActions