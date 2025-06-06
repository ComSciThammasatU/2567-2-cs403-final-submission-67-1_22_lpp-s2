import { useAuthStore } from "@/stores/authStore";
import { useRequestApprovalHistoyStore } from "@/stores/bookingRequestHistoyStore";
import { useEffect } from "react";

const useApprovalHistory = () => {
  const { data, fetch } = useRequestApprovalHistoyStore();
  const { username, role } = useAuthStore((state) => state);

  useEffect(() => {
    fetch(username, role);
  }, [fetch, role, username]);

  console.log("data sort", data);

  return {
    data: data
      .map((booking) => ({
        ...booking,
        roomName: booking.type,
      }))
      .sort(
        (a, b) =>
          new Date(b.approvalDate ?? b.modifiedDate).getTime() -
          new Date(a.approvalDate ?? b.modifiedDate).getTime()
      ),
  };
};

export default useApprovalHistory;
