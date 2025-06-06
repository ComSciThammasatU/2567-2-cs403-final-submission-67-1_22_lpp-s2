import { getRoomApi, RoomResponse } from "@/services/roomService";
import { create } from "zustand";

interface RoomStore {
  roomResponse: RoomResponse[];
  loading: boolean;
  fetched: boolean;
  fetchRoomResponse: () => Promise<void>;
  fetchRoomList: () => Promise<void>;
}

interface RoomFilterStore {
  roomFilter: number[];
  setRoomFilter: (roomIds: number[]) => void;
}

export const useGetRoomStore = create<RoomStore>((set) => ({
  roomResponse: [],
  loading: false,
  fetched: false,
  fetchRoomResponse: async () => {
    set((state) => {
      if (state.fetched) return state;
      return { loading: true };
    });

    try {
      localStorage.setItem("roomFilter", JSON.stringify([]));
      const res = await getRoomApi();
      set({ roomResponse: res || [], fetched: true, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  fetchRoomList: async () => {
    set((state) => {
      if (state.fetched) return state;
      return { loading: true };
    });
    try {
      const res = await getRoomApi();
      set({ roomResponse: res });
    } catch {
      set({ loading: false });
    }
  },
}));

export const useRoomFilterStore = create<RoomFilterStore>((set) => ({
  roomFilter: [],
  setRoomFilter: (roomIds) => {
    set({ roomFilter: roomIds });
    localStorage.setItem("roomFilter", JSON.stringify(roomIds ?? []));
  },
}));
