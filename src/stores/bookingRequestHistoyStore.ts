import { create } from "zustand";
import {
  BookingHistoryResponse,
  getBookingHistoryApi,
} from "@/services/bookingService";
import { getRequestApprovalHistoyApi } from "@/services/approvalService";

interface BookingStore {
  data: BookingHistoryResponse[];
  loading: boolean;
  fetched: boolean;
  fetch: (username: string | null, role: string | null) => Promise<void>;
}

export const useBookingHistoyStore = create<BookingStore>((set) => ({
  data: [],
  loading: false,
  fetched: false,
  fetch: async (username: string | null, role: string | null) => {
    set((state) => {
      if (state.fetched) return state;
      return { loading: true };
    });

    try {
      const res = await getBookingHistoryApi(username, role);
      set({ data: res || [], fetched: true, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));

export const useRequestApprovalHistoyStore = create<BookingStore>((set) => ({
  data: [],
  loading: false,
  fetched: false,
  fetch: async () => {
    set((state) => {
      if (state.fetched) return state;
      return { loading: true };
    });

    try {
      const res = await getRequestApprovalHistoyApi();
      set({ data: res || [], fetched: true, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));
