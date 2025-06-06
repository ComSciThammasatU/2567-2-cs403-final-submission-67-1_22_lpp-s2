import { useAuthStore } from "@/stores/authStore";
import { useBookingFormStore } from "@/stores/bookingFormStore";
import { useNavigate } from "react-router-dom";

const useNavbar = () => {
  const authStore = useAuthStore((state) => state);
  const bookingFormStore = useBookingFormStore((state) => state);

  const navigate = useNavigate();

  const onSubmit = () => {
    authStore.logout();
    localStorage.removeItem("token");
    bookingFormStore.resetBookingForm();

    navigate("/");
  };

  return {
    authStore,
    onSubmit,
  };
};

export default useNavbar;
