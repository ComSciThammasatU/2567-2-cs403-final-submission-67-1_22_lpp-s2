import axios from "axios";
import { BookingHistoryResponse } from "./bookingService";

export type RequestSchedule = {
  id: number;
  bookingId: number;
  firstName: string;
  lastName: string;
  role: string;
  activity: string;
  dateStart: string;
  startTime: string;
  people: number;
};

export interface RoomEvent {
  id: string;
  roomId: string;
  title: string;
  start: string;
  end?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export const getAllScheduleApi = async (): Promise<RoomEvent[]> => {
  try {
    const response = await axios.get("http://localhost:3000/api/booking", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const mapped = response.data
      .filter((event: any) => event?.bookingStatus !== "rejected")
      .map((event: any) => ({
        id: event.bookingId.toString(),
        roomId: event.roomId,
        roomName: event.type.toString(),
        title: event.activity,
        start: `${event.dateStart.substring(0, 10)}T${event.startTime}`,
        end: `${event.dateStart.substring(0, 10)}T${event.endTime}`,
        backgroundColor:
          event.bookingStatus !== "approved" ? "#FF9F00" : "#00C853",
        borderColor: event.bookingStatus !== "approved" ? "#FF9F00" : "#00C853",
        people: event.people,
        bookingNote: event.bookingNote,
        activity: event.activity,
        requiredTools: "Not using yet.",
      }));
    console.log("mapped", mapped);
    return mapped;
  } catch (error) {
    console.log("Error while getting schedule events", error);
    throw new Error("Get schedule api error.");
  }
};

export const saveSchedulesApi = async (events: RoomEvent[]): Promise<void> => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/booking`,
      events,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Edit booking response", response);
  } catch (error) {
    throw new Error("Cancel booking failed. Please try again.");
  }
};

export const postCancelBookingApi = async (
  bookingId: number,
  cancelReason: string
): Promise<void> => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/approvals/reject/${bookingId}`,
      {
        rejected_note: cancelReason,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Schedule response", response);
  } catch (error) {
    throw new Error("Cancel booking failed. Please try again.");
  }
};

export const getRequestScheduleHistoyApi = async (): Promise<
  BookingHistoryResponse[]
> => {
  try {
    const response = await axios.get("http://localhost:3000/api/approvals", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.map((approval: any) => ({
      id: approval.approval_id,
      roomName: approval.type,
      userName: approval.username,
      floor: approval.floor,
      capacity: approval.capacity,
      firstName: approval.first_name,
      lastName: approval.last_name,
      role: approval.name,
      activity: approval.activity,
      dateStart: approval.date_start,
      dateEnd: approval.date_end,
      startTime: approval.start_time,
      endTime: approval.end_time,
      people: approval.people,
      bookingNote: approval.people,
      requiredTools: approval.booking_note,
      bookingStatus: approval.booking_status,
    }));
  } catch (error) {
    console.error("Error fetching booking history:", error);
    throw new Error("Failed to fetch booking history. Please try again.");
  }
};
