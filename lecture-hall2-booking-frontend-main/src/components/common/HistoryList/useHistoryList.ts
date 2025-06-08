import { putCancelBookingApi } from "@/services/bookingService";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

const useHistoryList = (fn: (id: number) => void) => {
  const { role } = useAuthStore((state) => state);

  const [confirmOpenDialog, setConfirmOpenDialog] = useState(false);
  const [isCancelSuccess, setIsCancelSuccess] = useState(false);
  const [statusOpenDialog, setStatusOpenDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );

  const onComfirmSubmit = async () => {
    await putCancelBookingApi(selectedBookingId ?? 0);
    onCancelSuccess();
    setConfirmOpenDialog(false);
    setStatusOpenDialog(true);
    setIsCancelSuccess(true);
  };

  const onCancelSuccess = () => fn(selectedBookingId ?? 0);

  return {
    role,
    onComfirmSubmit,
    isCancelSuccess,
    confirmOpenDialog,
    statusOpenDialog,
    setConfirmOpenDialog,
    setSelectedBookingId,
    setStatusOpenDialog,
    setIsCancelSuccess,
    onCancelSuccess,
  };
};

export default useHistoryList;
