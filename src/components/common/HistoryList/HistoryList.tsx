import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BookingHistoryResponse } from "@/services/bookingService";
import { Signal, Users, Calendar, Clock, X } from "lucide-react";
import dayjs from "dayjs";
import HeaderLabel from "../HeaderLabel/HeaderLabel";
import { bookingStatusColors, bookingStatusLabels } from "@/constants/booking";
import { Separator } from "@/components/ui/separator";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import useHistoryList from "./useHistoryList";
import PopupSubmit from "../PopupSubmit/PopupSubmit";
import PopupStatus from "../PopupStatus/PopupStatus";

interface HistoryListProps {
  historyItems: Array<BookingHistoryResponse>;
  fetch: (id: number) => void;
}

const HistoryList = ({ historyItems, fetch }: HistoryListProps) => {
  const {
    role,
    onComfirmSubmit,
    isCancelSuccess,
    confirmOpenDialog,
    statusOpenDialog,
    setStatusOpenDialog,
    setConfirmOpenDialog,
    setSelectedBookingId,
  } = useHistoryList(fetch);
  return (
    <>
      {historyItems.map((item, index) => (
        <Card
          key={index}
          className="w-[80%] flex flex-col bg-[#F6F6F6] shadow-lg"
        >
          <div className="flex flex-row justify-between px-15">
            <div className=" gap-3 flex flex-col items-start w-[60%]">
              <CardTitle>{item.activity}</CardTitle>
              <CardDescription className="text-black">
                {`${item.firstName} ${item.lastName}`}
              </CardDescription>
              <CardContent className=" p-0 gap-3 flex flex-col">
                <div className="flex flex-row gap-2 items-stretch">
                  {!["pending", "rejected"].includes(item.bookingStatus) ? (
                    <>
                      <Signal />
                      <Label className="text-sm text-gray-500 self-end mr-5">
                        ห้อง {item.type}
                      </Label>
                      <Label className="text-sm text-gray-500 self-end mr-5">
                        ชั้น {item.floor}
                      </Label>
                      <Users />
                      <Label className="text-sm text-gray-500 self-end ">
                        ความจุ {item.capacity} คน
                      </Label>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-row gap-2 items-stretch">
                  <Calendar />
                  <Label className="text-sm text-gray-500 self-end mr-5">
                    {dayjs(item.dateStart).format("D MMMM YYYY")}
                  </Label>
                </div>
                <div className="flex flex-row gap-2 items-stretch">
                  <Clock />
                  <Label className="text-sm text-gray-500 self-end mr-5">
                    {item.startTime} - {item.endTime} น.
                  </Label>
                </div>
                {item.rejectedNote ? (
                  <div className="flex flex-row gap-2 items-stretch">
                    <X />
                    <Label className="flex flex-col items-start text-sm text-gray-500 self-end mr-5">
                      <h1>เหตุผลการยกเลิก:</h1>
                      <div>{item.rejectedNote}</div>
                    </Label>
                  </div>
                ) : (
                  <></>
                )}
              </CardContent>
            </div>
            <div className="flex flex-col items-end justify-center">
              <HeaderLabel
                className={bookingStatusColors[item.bookingStatus] || ""}
                title={
                  bookingStatusLabels[item.bookingStatus] || item.bookingStatus
                }
              />
            </div>
          </div>
          <Separator className="mx-auto" style={{ width: "90%" }} />
          <div className="flex flex-row justify-between items-center px-15">
            {item.bookingStatus === "rejected" ? (
              <Label className="text-red-500 text-lg self-center">
                {item.cancelReason}
              </Label>
            ) : (
              <div />
            )}
            {role === "user" &&
              !["rejected", "cancelled", "approved"].includes(
                item.bookingStatus
              ) && (
                <ButtonCustom
                  label={"ยกเลิกคำร้อง"}
                  className="w-40 bg-red-500 shadow-lg hover:bg-red-600"
                  onClick={() => {
                    setConfirmOpenDialog(true);
                    setSelectedBookingId(item.bookingId);
                  }}
                />
              )}
          </div>
        </Card>
      ))}
      <PopupSubmit
        open={confirmOpenDialog}
        setOpen={setConfirmOpenDialog}
        onConfirm={onComfirmSubmit}
        onCancel={() => setConfirmOpenDialog(false)}
        title={"ยืนยันยกเลิกคำร้อง"}
      />
      <PopupStatus
        status={isCancelSuccess}
        open={statusOpenDialog}
        setOpen={setStatusOpenDialog}
        label={isCancelSuccess ? " ยกเลิกสำเร็จ" : "เกิดข้อผิดพลาด"}
      />
    </>
  );
};

export default HistoryList;
