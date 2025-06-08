import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { loginApi } from "@/services/userService";
import { useState } from "react";

type LoginForm = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);

  const navigate = useNavigate();
  const authStore = useAuthStore((state) => state);

  const form = useForm<LoginForm>({
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    const response = await loginApi(data);

    const loginFailed = response.message !== "Login successful";

    setUserNameError(loginFailed);
    setPasswordError(loginFailed);

    if (loginFailed || !response) return;

    authStore.login(
      response.username,
      response.role,
      response.token ?? "",
      true
    );
    localStorage.setItem("token", response.token || "");

    if (response.role === "user") {
      navigate("/user/booking-form");
    } else if (response.role === "approval") {
      navigate("/approval");
    }
  };

  return {
    form,
    onSubmit,
    passwordError,
    userNameError,
  };
};
