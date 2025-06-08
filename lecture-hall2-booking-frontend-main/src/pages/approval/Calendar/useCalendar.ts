import { useAuthStore } from "@/stores/authStore";
import { useGetRoomStore, useRoomFilterStore } from "@/stores/roomStore";
import { useScheduleStore } from "@/stores/scheduleStore";
import { useEffect } from "react";

const useCalendar = () => {
  const { roomResponse, fetchRoomResponse } = useGetRoomStore();
  const { roomFilter, setRoomFilter } = useRoomFilterStore();

  useEffect(() => {
    fetchRoomResponse();
  }, [fetchRoomResponse, roomFilter]);

  return {
    roomFilter,
    roomResponse,
    setRoomFilter,
  };
};

export default useCalendar;
