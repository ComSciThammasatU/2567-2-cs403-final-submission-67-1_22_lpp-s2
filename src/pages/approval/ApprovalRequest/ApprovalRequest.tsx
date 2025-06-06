import ApprovalTable from "@/components/common/ApprovalTable/ApprovalTable";
import HeaderLabel from "@/components/common/HeaderLabel/HeaderLabel";
import useApprovalRequest from "./useApprovalRequest";
import { columns as baseColumns } from "@/components/common/ApprovalTable/columns";
import PopupSubmit from "@/components/common/PopupSubmit/PopupSubmit";
import PopupStatus from "@/components/common/PopupStatus/PopupStatus";

const ApprovalRequest = () => {
  const {
    data,
    setSelectedBookingId,
    setConfirmOpenDialog,
    onComfirmSubmit,
    confirmOpenDialog,
    setStatusOpenDialog,
    statusOpenDialog,
    isCancelSuccess,
    cancelReason,
    setCancelReason,
  } = useApprovalRequest();

  const columns = baseColumns({
    setSelectedBookingId,
    setConfirmOpenDialog,
  });

  return (
    <div className="flex flex-col h-full w-full px-4 pt-4">
      <HeaderLabel title="คำร้องขอใช้ห้อง" />
      <ApprovalTable
        columns={columns}
        data={data.filter(
          (request) => !["approved", "rejected"].includes(request.bookingStatus)
        )}
      />

      <PopupSubmit
        open={confirmOpenDialog}
        setOpen={setConfirmOpenDialog}
        onConfirm={onComfirmSubmit}
        onCancel={() => setConfirmOpenDialog(false)}
        title={"ยืนยันการยกเลิกคำร้อง"}
        isApprovalCancel={true}
        cancelReason={cancelReason}
        setCancelReason={setCancelReason}
      />

      <PopupStatus
        status={isCancelSuccess}
        open={statusOpenDialog}
        setOpen={setStatusOpenDialog}
        label={isCancelSuccess ? "ยกเลิกคำร้องสำเร็จ" : "เกิดข้อผิดพลาด"}
      />
    </div>
  );
};

export default ApprovalRequest;
