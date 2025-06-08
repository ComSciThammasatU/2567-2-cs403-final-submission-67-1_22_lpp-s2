import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BookingForm = {
  dateStart: Date;
  dateEnd: Date;
  startTime: string;
  endTime: string;
  people: number;
  bookingNote: string;
  activity: string;
  requiredTools: string;
  roomId: number;
  roomName: string;
};

type BookingFormState = {
  bookingForm: BookingForm;
  setBookingForm: (data: Partial<BookingForm>) => void;
  resetBookingForm: () => void;
};

export const useBookingFormStore = create<BookingFormState>()(
  persist(
    (set) => ({
      bookingForm: {
        dateStart: dayjs().toDate(),
        dateEnd: dayjs().toDate(),
        startTime: "",
        endTime: "",
        people: 0,
        bookingNote: "",
        activity: "",
        requiredTools: "",
        roomId: 0,
        roomName: "",
      },
      setBookingForm: (data) => {
        console.log("Form data", data);
        set((state) => ({
          bookingForm: { ...state.bookingForm, ...data },
        }));
      },
      resetBookingForm: () =>
        set({
          bookingForm: {
            dateStart: dayjs().toDate(),
            dateEnd: dayjs().toDate(),
            startTime: "",
            endTime: "",
            people: 0,
            bookingNote: "",
            activity: "",
            requiredTools: "",
            roomId: 0,
            roomName: "",
          },
        }),
    }),
    {
      name: "booking-form-storage",
      partialize: (state) => ({ bookingForm: state.bookingForm }),
    }
  )
);
