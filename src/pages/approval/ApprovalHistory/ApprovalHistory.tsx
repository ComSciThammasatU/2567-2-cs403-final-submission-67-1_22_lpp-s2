import HeaderLabel from "@/components/common/HeaderLabel/HeaderLabel";
import HistoryList from "@/components/common/HistoryList/HistoryList";
import HistoryNotFound from "@/components/common/HistoryNotFound/HistoryNotFound";
import { Card } from "@/components/ui/card";
import useApprovalHistory from "./useAppovalHistory";

const ApprovalHistory = () => {
  const { data } = useApprovalHistory();

  console.log("History data", data);

  return (
    <div className="flex flex-col h-full w-full px-4 pt-4">
      <HeaderLabel title="ประวัติการอนุมัติคำร้อง" />
      {data?.length === 0 ? (
        <>
          <HistoryNotFound
            label={"ไปหน้าอนุมัติคำร้อง"}
            title={"*ท่านยังไม่มีประวัติการอนุมัติคำร้อง*"}
            href="/approval/approval-request"
          />
        </>
      ) : (
        <>
          <Card className="mr-4 bg-[#F7F7F8] rounded-t-lg items-center gap-10">
            <HistoryList historyItems={data} />
          </Card>
        </>
      )}
    </div>
  );
};

export default ApprovalHistory;
