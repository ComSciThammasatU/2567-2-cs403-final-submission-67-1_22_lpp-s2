export const bookingNoteOptions = [
  { value: "สอน", label: "สอน" },
  { value: "สอนเสริม", label: "สอนเสริม" },
  { value: "ประชุม", label: "ประชุม" },
  { value: "จัดสอบ", label: "จัดสอบ" },
  { value: "ทดสอบระบบ", label: "ทดสอบระบบ" },
  { value: "กิจกรรมอื่นๆ", label: "กิจกรรมอื่นๆ" },
];

export const bookingStatusLabels: Record<string, string> = {
  approved: "อนุมัติ",
  pending: "รออนุมัติ",
  rejected: "ไม่อนุมัติ",
};

export const bookingStatusColors: Record<string, string> = {
  approved: "text-green-600",
  pending: "text-gray-500",
  rejected: "text-red-600",
};
