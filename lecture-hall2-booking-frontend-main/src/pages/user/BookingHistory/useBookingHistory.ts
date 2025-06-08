import { useAuthStore } from "@/stores/authStore";
import { useBookingHistoyStore } from "@/stores/bookingRequestHistoyStore";
import { useEffect } from "react";

const useBookingHistory = () => {
  const { data, fetch, loading } = useBookingHistoyStore();
  const { username, role } = useAuthStore((state) => state);

  useEffect(() => {
    fetch(username, role);
  }, [fetch, role, username]);

  return {
    data: data
      .map((booking) => ({
        ...booking,
        roomName: booking.type,
      }))
      .sort(
        (a, b) =>
          new Date(b.modifiedDate).getTime() -
          new Date(a.modifiedDate).getTime()
      ),
    loading,
    fetch,
  };
};

export default useBookingHistory;
