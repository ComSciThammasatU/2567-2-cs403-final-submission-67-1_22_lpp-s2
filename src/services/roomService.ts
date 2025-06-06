import axios from "axios";

export type RoomResponse = {
  roomId: number;
  name: string;
  floor: number;
  capacity: number;
};

export const getRoomApi = async (): Promise<RoomResponse[]> => {
  try {
    const response = await axios.get("http://localhost:3000/api/rooms", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.map((room: any) => ({
      ...room,
      roomId: room.id,
      name: room.type,
    }));
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw new Error("Failed to fetch booking details. Please try again.");
  }
};
