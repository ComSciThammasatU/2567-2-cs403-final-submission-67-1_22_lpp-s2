import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const useSidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const authStore = useAuthStore((state) => state);

  const role = authStore.role;

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return {
    pathname,
    onClose,
    isOpen,
    role,
  };
};

export default useSidebar;
