import HeaderLabel from "@/components/common/HeaderLabel/HeaderLabel";
import useBookingHistory from "./useBookingHistory";
import HistoryNotFound from "@/components/common/HistoryNotFound/HistoryNotFound";
import { Card } from "@/components/ui/card";
import HistoryList from "@/components/common/HistoryList/HistoryList";

const BookingHistory = () => {
  const { data, fetch } = useBookingHistory();
  return (
    <div className="flex flex-col h-full w-full px-4 pt-4">
      <HeaderLabel title="ประวัติการขอใช้ห้อง" />
      {data?.length === 0 ? (
        <>
          <HistoryNotFound
            label={"จองห้อง"}
            title={"*ท่านยังไม่มีประวัติการยื่นคำร้อง*"}
            href="/user/booking-form"
          />
        </>
      ) : (
        <>
          <Card className="mr-4 bg-[#F7F7F8] rounded-t-lg items-center gap-10">
            <HistoryList historyItems={data} fetch={fetch} />
          </Card>
        </>
      )}
    </div>
  );
};

export default BookingHistory;
