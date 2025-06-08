import { useRoomFilterStore } from "@/stores/roomStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const useSidebarFilter = (filterRoom: (filter: number[]) => void) => {
  const { roomFilter, setRoomFilter } = useRoomFilterStore();

  const form = useForm<{ items: number[] }>({
    defaultValues: { items: roomFilter },
  });

  const onSubmit = (values: { items: number[] }) => {
    setRoomFilter(values.items || []);
    filterRoom(values.items);
  };

  useEffect(() => {}, [roomFilter]);

  return { form, onSubmit, roomFilter };
};

export default useSidebarFilter;
