import axios from "axios";

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  username: string;
  message: string;
  role: "user" | "approval";
  token?: string;
};

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      data
    );

    console.log("Login response:", response.data);
    return response.data as LoginResponse;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed. Please try again.");
  }
};
