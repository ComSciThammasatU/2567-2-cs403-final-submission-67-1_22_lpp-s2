import HeaderLabel from "@/components/common/HeaderLabel/HeaderLabel";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useBookingForm from "./useBookingForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import dayjs from "dayjs";
import ButtonCustom from "@/components/common/ButtonCustom/ButtonCustom";
import PopupStatus from "@/components/common/PopupStatus/PopupStatus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookingNoteOptions } from "@/constants/booking";
import PopupSubmit from "@/components/common/PopupSubmit/PopupSubmit";

const BookingForm = () => {
  const {
    form,
    onSubmit,
    onCancel,
    onComfirmSubmit,
    isBookingSuccess,
    statusOpenDialog,
    confirmstatusOpenDialog,
    setConfirmStatusOpenDialog,
    setStatusOpenDialog,
  } = useBookingForm();

  return (
    <div className="flex flex-col h-full w-full p-4 items-center ">
      <HeaderLabel title="ยื่นคำร้องขอใช้ห้อง" />
      <div className="flex flex-col w-[62.938rem]">
        <Label className="text-red-500 ml-6 mb-2">
          * กรุณากรอกข้อมูลรายละเอียดการจองให้ครบถ้วน
        </Label>
        <Card className="bg-[#F7F7F8] h-full w-full px-20 py-5 ">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-flow-row h-full gap-5"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="dateStart"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className=" font-semibold text-[22px]">
                          วันเริ่มต้น
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[309px] h-[66px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  dayjs(field.value).format("YYYY-MM-DD")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon
                                  className="ml-auto opacity-50"
                                  size={40}
                                />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(value) => {
                                if (value) {
                                  field.onChange(value);
                                }
                              }}
                              disabled={{ before: new Date() }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-flow-col grid-rows-4 gap-5 ">
                  <FormField
                    control={form.control}
                    name="startTime"
                    rules={{ required: "กรุณากรอกเวลาเริ่ม" }}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className=" font-semibold text-[22px]">
                          เวลาเริ่ม
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className={cn(
                              " bg-white w-[309px] h-[66px] pl-3 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
                              !field.value && "text-muted-foreground"
                            )}
                            placeholder={
                              field.value ? field.value : "เลือกเวลาเริ่มต้น"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="people"
                    rules={{ required: "กรุณากรอกจำนวนคน" }}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className=" font-semibold text-[22px]">
                          จำนวนคน
                        </FormLabel>

                        <FormControl>
                          <Input
                            className={cn(
                              " bg-white w-[309px] h-[66px] pl-3 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
                              !field.value && "text-muted-foreground"
                            )}
                            placeholder="จำนวนคน"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="requiredTools"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className=" font-semibold text-[22px]">
                          อุปกรณ์/โปรแกรม ที่ต้องการใช้
                        </FormLabel>

                        <FormControl>
                          <Input
                            className={cn(
                              " bg-white w-[309px] h-[66px] pl-3 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
                              !field.value && "text-muted-foreground"
                            )}
                            placeholder="อุปกรณ์/โปรแกรม ที่ต้องการใช้"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ButtonCustom
                    label={"ยืนคำร้อง"}
                    className="w-[309px] h-[66px] my-5 text-2xl"
                    type="button"
                    onClick={form.handleSubmit(onSubmit)}
                  />

                  {/* <FormField
                  control={form.control}
                  name="dateEnd"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className=" font-semibold text-[22px]">
                        วันสิ้นสุด
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[309px] h-[66px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                dayjs(field.value).format("YYYY-MM-DD")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon
                                className="ml-auto opacity-50"
                                size={40}
                              />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(value) => {
                              if (value) {
                                field.onChange(value);
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                  <FormField
                    control={form.control}
                    name="endTime"
                    rules={{ required: "กรุณากรอกเวลาสิ่นสุด" }}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className=" font-semibold text-[22px]">
                          เวลาสิ้นสุด
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className={cn(
                              " bg-white w-[309px] h-[66px] pl-3 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
                              !field.value && "text-muted-foreground"
                            )}
                            placeholder={
                              field.value ? field.value : "เลือกเวลาสิ้นสุด"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="activity"
                    rules={{ required: "กรุณากรอกชื่อวิชา/กิจกรรม" }}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className=" font-semibold text-[22px]">
                          ชื่อวิชา/กิจกรรม
                        </FormLabel>

                        <FormControl>
                          <Input
                            className={cn(
                              " bg-white w-[309px] h-[66px] pl-3 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
                              !field.value && "text-muted-foreground"
                            )}
                            placeholder="ชื่อวิชา/กิจกรรม "
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bookingNote"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className=" font-semibold text-[22px]">
                          เหตุผลการขอใช้ห้อง
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl
                            className={cn(
                              " bg-white w-[309px] py-8 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกเหตุผล" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bookingNoteOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <PopupStatus
          status={isBookingSuccess}
          open={statusOpenDialog}
          setOpen={setStatusOpenDialog}
          label={isBookingSuccess ? "ส่งคำร้องสำเร็จ" : "เกิดข้อผิดพลาด"}
        />
        <PopupSubmit
          open={confirmstatusOpenDialog}
          setOpen={setConfirmStatusOpenDialog}
          onConfirm={onComfirmSubmit}
          onCancel={onCancel}
          title={"ยืนยันการส่งคำร้อง"}
        />
      </div>
    </div>
  );
};

export default BookingForm;
