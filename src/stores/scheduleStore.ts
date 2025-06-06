import { create } from "zustand";
import {
  getAllScheduleApi,
  saveSchedulesApi,
  RoomEvent,
} from "@/services/scheduleService";

interface ScheduleStore {
  data: RoomEvent[];
  selectBookingId: number | null;
  loading: boolean;
  fetched: boolean;
  isEventSelected: boolean;
  fetch: () => Promise<void>;
  saveChanges: (events: RoomEvent[]) => Promise<void>;
  setSelectedSaveBookingId: (bookingId: number) => void;
  removeById: (id: string) => void;
  setEvent: (isSet: boolean) => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  data: [],
  selectBookingId: null,
  loading: false,
  fetched: false,
  isEventSelected: false,
  fetch: async () => {
    set((state) => {
      if (state.fetched) return state;
      return { loading: true };
    });

    try {
      const res = await getAllScheduleApi();
      set({ data: res || [], fetched: true, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  saveChanges: async (events: RoomEvent[]) => {
    console.log("Events", events);

    try {
      await saveSchedulesApi(events);
    } catch {
      set({ loading: false });
    }
  },
  setSelectedSaveBookingId: (bookingId: number) =>
    set({ selectBookingId: bookingId }),
  removeById: (id: string) =>
    set((state) => ({
      data: state.data.filter((item) => item.id !== id),
    })),
  setEvent: (isSet: boolean) => {
    set({ isEventSelected: isSet });
  },
}));
