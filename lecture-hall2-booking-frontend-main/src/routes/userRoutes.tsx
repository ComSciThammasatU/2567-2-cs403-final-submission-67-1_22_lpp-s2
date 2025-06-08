import BookingForm from "@/pages/user/BookingForm/BookingForm";
import BookingHistory from "@/pages/user/BookingHistory/BookingHistory";

export const userRoutes = [
  {
    path: "/user/booking-form",
    element: <BookingForm />,
    label: "ยื่นคำร้องขอใช้ห้อง",
  },
  {
    path: "/user/booking-history",
    element: <BookingHistory />,
    label: "ประวัติการขอใช้ห้อง",
  },
];
