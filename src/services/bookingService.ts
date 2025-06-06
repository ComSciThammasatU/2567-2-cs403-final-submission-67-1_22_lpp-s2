import axios from "axios";

export type BookingRequest = {
  dateStart: string;
  dateEnd: string;
  startTime: string;
  endTime: string;
  people: number;
  activity: string;
  bookingNote: string;
  roomId?: number;
};

export type BookingHistoryResponse = {
  id: number;
  bookingId: number;
  roomName: string;
  userName: string;
  firstName: string;
  lastName: string;
  floor: number;
  capacity: number;
  dateStart: string;
  dateEnd: string;
  startTime: string;
  endTime: string;
  people: number;
  bookingNote: string;
  activity: string;
  requiredTools: string;
  bookingStatus: string;
  type: string;
  modifiedDate: string;
  cancelReason?: string;
  rejectedNote?: string;
  approvalDate?: string;
};

export type BookingResponse = {
  id: number;
  userName: string;
  dateStart?: Date;
  dateEnd?: Date;
  startTime: string;
  endTime: string;
  people: number;
  bookingNote: string;
  activity: string;
  requiredTools: string;
};

export type BookingStatusResponse = {
  message: string;
};

export const createBooking = async (request: BookingRequest): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/booking",
      request,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error while creating booking request:", error);
    throw new Error("Failed to create booking request. Please try again.");
  }
};

export const getBookingByIdApi = async (
  bookingId: number
): Promise<BookingResponse> => {
  try {
    // const response = await axios.get(`/api/booking/${bookingId}`);
    return {
      id: bookingId,
      userName: "ญาณิศา ณ ศรีตะคุ",
      dateStart: new Date(),
      dateEnd: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      people: 30,
      bookingNote: "สอน",
      activity: "CS300",
      requiredTools: "Projector, Whiteboard",
    };
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw new Error("Failed to fetch booking details. Please try again.");
  }
};
export const getBookingHistoryApi = async (
  username: string | null,
  role: string | null
): Promise<BookingHistoryResponse[]> => {
  try {
    const response = await axios.get("http://localhost:3000/api/booking", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching booking history:", error);
    throw new Error("Failed to fetch booking history. Please try again.");
  }
};
export const updateBooking = async (
  bookingId: number,
  request: BookingRequest
): Promise<any> => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/booking/${bookingId}`,
      request,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching booking history:", error);
    throw new Error("Failed to fetch booking history. Please try again.");
  }
};
export const putCancelBookingApi = async (bookingId: number): Promise<any> => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/booking/cancel/${bookingId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching booking history:", error);
    throw new Error("Failed to fetch booking history. Please try again.");
  }
};
