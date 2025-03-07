import { create } from "zustand";
import { AuthStore } from "../lib/types/authTypes";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authToken: null,
      isAuthenticated: false,
      userRole: null,
      login: (newAuthToken, userRole) =>
        set({ authToken: newAuthToken, isAuthenticated: true, userRole }),
      logout: () =>
        set({ authToken: null, isAuthenticated: false, userRole: null }),
    }),
    { name: "auth" }
  )
);
