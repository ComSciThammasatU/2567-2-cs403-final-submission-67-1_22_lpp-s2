import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import thLocale from "@fullcalendar/core/locales/th";
import useRoomSchedule from "./useRoomSchedule ";
import { RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import PopupEdit from "../PopupEdit/PopupEdit";

const RoomSchedule = () => {
  const {
    events,
    isDirty,
    calendarRef,
    handleEventChange,
    handleSave,
    handleClear,
    handleEventClick,
    confirmOpenDialog,
    setStatusOpenDialog,
    setConfirmOpenDialog,
  } = useRoomSchedule();

  return (
    <div className="room-schedule">
      <div className="mb-4 flex gap-2 items-end justify-end">
        <div>
          <Button
            className=" bg-[#69C4E1] hover:bg-[#6088ad] text-white rounded"
            onClick={handleSave}
            disabled={!isDirty}
          >
            <Save />
            บันทึก
          </Button>
        </div>
        <div>
          <Button
            className=" bg-[#58d354] hover:bg-[#7fc06d] text-white rounded"
            onClick={() => (window.location.href = "/approval/booking-form")}
          >
            <Save />
            จอง
          </Button>
        </div>
        <Button
          className=" bg-gray-300 hover:bg-gray-500 rounded"
          onClick={handleClear}
          disabled={!isDirty}
        >
          <RotateCcw />
          รีเซ็ต
        </Button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locales={[thLocale]}
        locale="th"
        slotMinTime="06:00:00"
        slotMaxTime="23:00:00"
        allDaySlot={true}
        editable={true}
        eventResizableFromStart={true}
        selectable={true}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "timeGridWeek,timeGridDay",
        }}
        events={events}
        eventChange={handleEventChange}
        eventClick={handleEventClick}
        height="auto"
      />
      <PopupEdit
        open={confirmOpenDialog}
        setOpen={setConfirmOpenDialog}
        onConfirm={() => setStatusOpenDialog(true)}
        onCancel={() => setConfirmOpenDialog(false)}
        onClose={() => setConfirmOpenDialog(false)}
        title={"แก้ไขคำร้อง"}
      />
    </div>
  );
};

export default RoomSchedule;
