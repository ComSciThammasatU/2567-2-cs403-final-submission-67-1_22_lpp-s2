import { useState, useRef, useEffect } from "react";
import type FullCalendar from "@fullcalendar/react";
import type { EventChangeArg } from "@fullcalendar/core";
import { useScheduleStore } from "@/stores/scheduleStore";
import { BookingForm, useBookingFormStore } from "@/stores/bookingFormStore";
import { useRoomFilterStore } from "@/stores/roomStore";

export interface RoomEvent {
  id: string;
  roomId: string;
  title: string;
  start: string;
  end?: string;
  backgroundColor?: string;
  borderColor?: string;
  changed?: boolean;
}

const initialEvents: RoomEvent[] = [];

export const useRoomSchedule = () => {
  const [editEvent, setEditEvent] = useState<RoomEvent>();
  const [events, setEvents] = useState<RoomEvent[]>(initialEvents);
  const [originalEvents, setOriginalEvents] =
    useState<RoomEvent[]>(initialEvents);
  const [isDirty, setIsDirty] = useState(false);

  const {
    data,
    fetch,
    saveChanges,
    setEvent,
    isEventSelected,
    setSelectedSaveBookingId,
  } = useScheduleStore();
  const bookingFormStore = useBookingFormStore((state) => state);
  const filterStore = useRoomFilterStore((state) => state);

  const [confirmOpenDialog, setConfirmOpenDialog] = useState(false);
  const [isCancelSuccess, setIsCancelSuccess] = useState(false);
  const [statusOpenDialog, setStatusOpenDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );

  // ref ชี้ไปที่ FullCalendar instance ที่แท้จริง
  const calendarRef = useRef<FullCalendar | null>(null);

  const handleEventChange = (changeInfo: EventChangeArg) => {
    const updatedEvent = changeInfo.event;
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === updatedEvent.id
          ? {
              ...ev,
              changed: true,
              start: updatedEvent.startStr,
              end: updatedEvent.endStr,
            }
          : ev
      )
    );
    setIsDirty(true);
  };

  const handleSave = async () => {
    await saveChanges(events.filter((event) => event?.changed));
    setOriginalEvents(events);
    setIsDirty(false);
  };

  const handleEdit = async () => {
    await saveChanges([editEvent as RoomEvent]);
    setOriginalEvents(events);
    setIsDirty(false);
  };

  const handleClear = () => {
    setEvents(originalEvents);
    setIsDirty(false);

    // sync calendar UI
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.removeAllEvents();
      originalEvents.forEach((ev) => calendarApi.addEvent(ev));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventClick = async (event: any) => {
    // Handle event click
    // bookingFormStore.resetBookingForm();
    setSelectedBookingId(event.event.id);
    setSelectedSaveBookingId(event.event.id);
    const findEvent = await events.find(
      (ev) => ev?.id === String(event.event.id)
    );
    if (!findEvent) throw new Error("Event not found");
    const bookingEvent: Partial<BookingForm> = {
      dateStart: new Date(findEvent.start ?? ""),
      dateEnd: new Date(findEvent.start ?? ""),
      startTime: findEvent.start.substring(11, 16),
      endTime: (findEvent.end ?? "").substring(11, 16),
      people: (findEvent as any)["people"],
      activity: (findEvent as any)["activity"],
      bookingNote: (findEvent as any)["bookingNote"],
      requiredTools: (findEvent as any)["requiredTools"],
      roomId: (findEvent as any)["roomId"],
      roomName: (findEvent as any)["roomName"],
    };
    bookingFormStore.setBookingForm(bookingEvent);
    setEditEvent(findEvent);
    setEvent(true);
    setConfirmOpenDialog(true);
    setStatusOpenDialog(false);
    setIsCancelSuccess(false);
  };

  // const goToDate = (dateString: string) => {
  //   const calendarApi = calendarRef.current?.getApi();
  //   if (calendarApi) {
  //     calendarApi.gotoDate(dateString);
  //   }
  // };

  useEffect(() => {
    fetch();
  }, [fetch, isEventSelected]);

  useEffect(() => {
    if (data && data.length > 0) {
      const filterData =
        filterStore.roomFilter?.length > 0
          ? data.filter((event) =>
              filterStore.roomFilter.includes(Number(event?.roomId))
            )
          : data;
      setEvents(filterData);
      setOriginalEvents(filterData);
      setIsDirty(false);
    }
  }, [data, filterStore.roomFilter]);

  return {
    events,
    isDirty,
    calendarRef,
    handleEventChange,
    handleSave,
    handleClear,
    handleEventClick,
    isCancelSuccess,
    confirmOpenDialog,
    statusOpenDialog,
    setConfirmOpenDialog,
    setSelectedBookingId,
    setStatusOpenDialog,
    setIsCancelSuccess,
    selectedBookingId,
    handleEdit,
  };
};
export default useRoomSchedule;
