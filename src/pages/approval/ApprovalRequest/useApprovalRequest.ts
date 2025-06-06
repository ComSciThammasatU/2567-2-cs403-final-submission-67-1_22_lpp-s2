import { postCancelBookingApi } from "@/services/approvalService";
import { useRequestApprovalStore } from "@/stores/requestApprovalStore";
import { useEffect, useState } from "react";

const useApprovalRequest = () => {
  const { data, fetch, loading, setSelectedSaveBookingId, removeById } =
    useRequestApprovalStore();

  const [cancelReason, setCancelReason] = useState("");
  const [confirmOpenDialog, setConfirmOpenDialog] = useState(false);
  const [isCancelSuccess, setIsCancelSuccess] = useState(false);
  const [statusOpenDialog, setStatusOpenDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );

  const onComfirmSubmit = async () => {
    try {
      if (selectedBookingId === null || selectedBookingId === undefined) return;
      await postCancelBookingApi(selectedBookingId, cancelReason);
      // อัปเดตที่ store
      removeById(selectedBookingId);
      setSelectedSaveBookingId(selectedBookingId);

      setIsCancelSuccess(true);
      setStatusOpenDialog(true);
      setConfirmOpenDialog(false);
    } catch (error) {
      console.error("Cancel failed", error);
      setIsCancelSuccess(false);
      setStatusOpenDialog(true);
      setConfirmOpenDialog(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    loading,
    onComfirmSubmit,
    isCancelSuccess,
    confirmOpenDialog,
    statusOpenDialog,
    cancelReason,
    setConfirmOpenDialog,
    setSelectedBookingId,
    setStatusOpenDialog,
    setIsCancelSuccess,
    setCancelReason,
  };
};

export default useApprovalRequest;
