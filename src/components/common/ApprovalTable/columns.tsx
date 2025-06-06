import { ColumnDef } from "@tanstack/react-table";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { RequestApproval } from "@/services/approvalService";

interface ColumnOptions {
  setSelectedBookingId: (id: number) => void;
  setConfirmOpenDialog: (open: boolean) => void;
}

export const columns = ({
  setSelectedBookingId,
  setConfirmOpenDialog,
}: ColumnOptions): ColumnDef<RequestApproval>[] => [
  { accessorKey: "firstName", header: "ชื่อ" },
  { accessorKey: "lastName", header: "นามสกุล" },
  { accessorKey: "role", header: "บทบาท" },
  { accessorKey: "activity", header: "ชื่อวิชา/กิจกรรม" },
  { accessorKey: "dateStart", header: "วันที่" },
  { accessorKey: "startTime", header: "เวลา" },
  { accessorKey: "people", header: "จำนวนคน" },
  { accessorKey: "bookingNote", header: "เหตุผลการขอใช้ห้อง" },
  { accessorKey: "bookingStatusName", header: "สถานะคำขอ" },
  {
    id: "actions",
    header: () => <div className="text-center">การจัดการห้อง</div>,
    cell: ({ row }) => {
      const bookingId = row.original.bookingId;
      return (
        <div className="flex gap-5 justify-center">
          <ButtonCustom
            className="bg-sky-400 text-white hover:bg-sky-500 w-30"
            label={"เลือกห้อง"}
            href="/approval/approval-calendar"
          />
          <ButtonCustom
            className="bg-red-500 text-white hover:bg-red-600 w-30"
            label={"ยกเลิก"}
            onClick={() => {
              setSelectedBookingId(bookingId);
              setConfirmOpenDialog(true);
            }}
          />
        </div>
      );
    },
  },
];
