import ApprovalHistory from "@/pages/approval/ApprovalHistory/ApprovalHistory";
import ApprovalRequest from "@/pages/approval/ApprovalRequest/ApprovalRequest";
import Calendar from "@/pages/approval/Calendar/Calendar";
import BookingForm from "@/pages/user/BookingForm/BookingForm";

export const approvalRoutes = [
  {
    path: "/approval/approval-calendar",
    element: <Calendar />,
    label: "หน้าหลัก",
  },
  {
    path: "/approval/approval-request",
    element: <ApprovalRequest />,
    label: "คำร้องขอใช้ห้อง",
  },
  {
    path: "/approval/approval-history",
    element: <ApprovalHistory />,
    label: "ประวัติการอนุมัติ",
  },
  {
    path: "/approval/booking-form",
    element: <BookingForm />,
    label: "ยื่นคำร้องขอใช้ห้อง",
  },
];
