import { create } from "zustand";

interface AuthState {
  username: string | null;
  role: "user" | "approval" | null;
  token: string | null;
  isLoggingIn: boolean;
  login: (
    username: string,
    role: "user" | "approval",
    token: string,
    isLoggingIn: boolean
  ) => void;
  logout: () => void;
  verifyToken: () => boolean;
}

// Helper to check if JWT token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return Date.now() > payload.exp * 1000;
  } catch {
    return true;
  }
};

export const useAuthStore = create<AuthState>((set, get) => {
  const storedState = localStorage.getItem("authState");
  const initialState = storedState
    ? JSON.parse(storedState)
    : {
        username: null,
        role: null,
        token: null,
        isLoggingIn: false,
      };

  return {
    ...initialState,
    login: (username, role, token, isLoggingIn) => {
      const newState = { username, role, token, isLoggingIn };
      set(newState);
      localStorage.setItem("authState", JSON.stringify(newState));
    },
    logout: () => {
      set({ username: null, role: null, token: null, isLoggingIn: false });
      localStorage.removeItem("authState");
    },
    verifyToken: () => {
      const token = get().token;
      const isValid = token && !isTokenExpired(token);
      if (!isValid) {
        get().logout();
      }
      return isValid;
    },
  };
});
