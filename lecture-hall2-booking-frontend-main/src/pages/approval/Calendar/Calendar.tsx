import RoomSchedule from "@/components/common/RoomSchedule/RoomSchedule";
import SidebarFilter from "@/components/common/SidebarFilter/SidebarFilter";
import useCalendar from "./useCalendar";
import { Card } from "@/components/ui/card";

const Calendar = () => {
  const { roomResponse, setRoomFilter } = useCalendar();

  return (
    <div className="flex flex-row w-full overflow-hidden">
      <Card className="flex flex-col bg-white p-4 rounded-none w-[260px]">
        <SidebarFilter roomResponse={roomResponse} filterRoom={setRoomFilter} />
      </Card>
      <div className="flex-1 min-w-0 m-10 ">
        <RoomSchedule />
      </div>
    </div>
  );
};

export default Calendar;
