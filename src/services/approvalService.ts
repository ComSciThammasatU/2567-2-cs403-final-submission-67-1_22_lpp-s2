import axios from "axios";
import { BookingHistoryResponse } from "./bookingService";
import dayjs from "dayjs";

export type RequestApproval = {
  id: number;
  bookingId: number;
  firstName: string;
  lastName: string;
  role: string;
  activity: string;
  dateStart: string;
  startTime: string;
  people: number;
  bookingStatus: string;
};

export const getRequestApprovalApi = async (): Promise<RequestApproval[]> => {
  try {
    const response = await axios.get("http://localhost:3000/api/booking", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const resFilter = response.data
      .filter((data: any) => data.bookingStatus != "rejected")
      .map((approval: any) => ({
        ...approval,
        role: approval.name,
        dateStart: dayjs(approval.dateStart).format("D MMMM YYYY"),
        startTime: `${approval.startTime.slice(
          0,
          5
        )} - ${approval.endTime.slice(0, 5)} น.`,
      }));

    return resFilter;

    /*return [
      {
        id: 1,
        firstName: "ญาณิศา",
        lastName: "ณ ศรีตะคุ",
        role: "user",
        activity: "CS300",
        date: "2023-10-01",
        time: "09:00 - 10:00",
        people: 30,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
      {
        id: 2,
        firstName: "อรอุมา",
        lastName: "อุทัย",
        role: "user",
        activity: "CS400",
        date: "2023-10-01",
        time: "10:00 - 11:00",
        people: 20,
      },
    ];*/
  } catch (error) {
    console.error("Error during :", error);
    throw new Error("Get request approval.");
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
  } catch (error) {
    throw new Error("Cancel booking failed. Please try again.");
  }
};

export const postApproveBookingApi = async (
  bookingId: number
): Promise<void> => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/approvals/approve/${bookingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    throw new Error("Approve booking failed. Please try again.");
  }
};

export const getRequestApprovalHistoyApi = async (): Promise<
  BookingHistoryResponse[]
> => {
  try {
    const response = await axios.get("http://localhost:3000/api/approvals", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.map((approval: any) => ({
      id: approval.approvalId,
      roomName: approval.type,
      userName: approval.username,
      floor: approval.floor,
      capacity: approval.capacity,
      firstName: approval.firstName,
      lastName: approval.lastName,
      role: approval.name,
      activity: approval.activity,
      dateStart: approval.dateStart,
      dateEnd: approval.date_end,
      startTime: approval.startTime,
      endTime: approval.endTime,
      people: approval.people,
      bookingNote: approval.people,
      requiredTools: approval.bookingNote,
      bookingStatus: approval.bookingStatus,
      type: approval?.type,
      rejectedNote: approval?.rejectedNote,
      approvalDate: approval?.approvalDate,
    }));
    /*return [
      {
        id: 1,
        roomName: "ห้องเรียน 101",
        userName: "ญาณิศา ณ ศรีตะคุ",
        floor: 1,
        capacity: 50,
        dateStart: "2023-10-01",
        dateEnd: "2023-10-01",
        startTime: "09:00",
        endTime: "10:00",
        people: 30,
        bookingNote: "สอน",
        activity: "CS300",
        requiredTools: "Projector, Whiteboard",
        bookingStatus: "success",
      },
      {
        id: 3,
        roomName: "ห้องเรียน 103",
        userName: "อรอุมา อุทัย",
        floor: 3,
        capacity: 30,
        dateStart: "2023-10-01",
        dateEnd: "2023-10-01",
        startTime: "11:00",
        endTime: "12:00",
        people: 15,
        bookingNote: "สัมมนา",
        activity: "CS500",
        requiredTools: "Projector, Whiteboard, Speaker, Microphone",
        bookingStatus: "rejected",
        cancelReason: "เหตุสุดวิสัย",
      },
    ];*/
  } catch (error) {
    console.error("Error fetching booking history:", error);
    throw new Error("Failed to fetch booking history. Please try again.");
  }
};
