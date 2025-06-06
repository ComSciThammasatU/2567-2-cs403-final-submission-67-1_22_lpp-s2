import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RoomResponse } from "@/services/roomService";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import useSidebarFilter from "./useSidebarFilter";

interface SidebarFilterProps {
  roomResponse: RoomResponse[];
  filterRoom: (filter: number[]) => void;
}

const SidebarFilter = ({ roomResponse, filterRoom }: SidebarFilterProps) => {
  const { form, onSubmit } = useSidebarFilter(filterRoom);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4 mt-5">
                <FormLabel className="text-3xl">ค้นหาตามห้อง</FormLabel>
                <FormDescription>กรุณาเลือกค้นหาตามห้อง.</FormDescription>
              </div>
              {roomResponse.map((item) => (
                <FormItem
                  key={item.roomId}
                  className="flex flex-row items-start space-x-3 space-y-2"
                >
                  <FormControl>
                    <Checkbox
                      checked={form.watch("items")?.includes(item.roomId)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue("items", [
                            ...(form.getValues("items") || []),
                            item.roomId,
                          ]);
                        } else {
                          form.setValue(
                            "items",
                            (form.getValues("items") || []).filter(
                              (id) => id !== item.roomId
                            )
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.name}</FormLabel>
                </FormItem>
              ))}
            </FormItem>
          )}
        />
        <ButtonCustom
          type="submit"
          label={"ค้นหา"}
          onClick={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
};

export default SidebarFilter;
