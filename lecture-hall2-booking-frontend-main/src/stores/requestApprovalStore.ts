import { create } from "zustand";
import {
  getRequestApprovalApi,
  RequestApproval,
} from "@/services/approvalService";

interface RequestApprovalStore {
  data: RequestApproval[];
  selectBookingId: number | null;
  loading: boolean;
  fetched: boolean;
  fetch: () => Promise<void>;
  setSelectedSaveBookingId: (bookingId: number) => void;
  removeById: (id: number) => void;
}

export const useRequestApprovalStore = create<RequestApprovalStore>((set) => ({
  data: [],
  selectBookingId: null,
  loading: false,
  fetched: false,
  fetch: async () => {
    set((state) => {
      if (state.fetched) return state;
      return { loading: true };
    });

    try {
      const res = await getRequestApprovalApi();
      set({ data: res || [], fetched: true, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  setSelectedSaveBookingId: (bookingId: number) =>
    set({ selectBookingId: bookingId }),
  removeById: (id: number) =>
    set((state) => ({
      data: state.data.filter((item) => item.bookingId !== id),
    })),
}));
