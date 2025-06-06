import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { Card, CardContent } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import dayjs from "dayjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookingNoteOptions } from "@/constants/booking";
import { roomOptions } from "@/constants/rooms";
import useBookingForm from "../../../pages/user/BookingForm/useBookingForm";
import PopupStatus from "../PopupStatus/PopupStatus";
import PopupSubmit from "../PopupSubmit/PopupSubmit";

interface PopupEditProps {
  title?: string;
  open: boolean;
  isApprovalCancel?: boolean;
  cancelReason?: string;
  setCancelReason?: (value: string) => void;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const PopupEdit = ({
  title,
  open,
  setOpen,
  onCancel,
  onClose,
}: PopupEditProps) => {
  const {
    form,
    onSubmit,
    onConfirmRequest,
    onConfirmEditRequest,
    onConfirmCancelRequest,
    isConfirmRequestSuccess,
    isConfirmEditRequestSuccess,
    isCancelRequestSuccess,
    confirmstatusOpenDialog,
    setConfirmStatusOpenDialog,
    statusConfirmRequestOpenDialog,
    statusConfirmEditRequestOpenDialog,
    statusConfirmCancelRequestOpenDialog,
    setStatusConfirmRequestOpenDialog,
    setStatusConfirmEditRequestOpenDialog,
    setStatusConfirmCancelRequestOpenDialog,
  } = useBookingForm();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden rounded-md min-w-[900px] max-h-[90vh]">
        <div className="bg-[#69C4E1] h-[60px] rounded-t-md flex items-center justify-center">
          <DialogTitle className="text-center text-white">{title}</DialogTitle>
        </div>

        <div className="p-8 overflow-auto">
          <Card className="bg-[#F7F7F8] px-15 py-5 max-h-[600px]">
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-1">
                  <div className="grid grid-flow-row grid-rows-2 gap-6">
                    <div className="grid grid-flow-col-dense grid-rows-4 gap-y-4">
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
                                      "w-[309px] h-[56px] pl-3 text-left font-normal",
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
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
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
                                  " bg-white w-[309px] h-[56px] pl-3 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
                                  !field.value && "text-muted-foreground"
                                )}
                                placeholder={
                                  field.value
                                    ? field.value
                                    : "เลือกเวลาเริ่มต้น"
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
                                  " bg-white w-[309px] h-[56px] pl-3 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
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
                                  " bg-white w-[309px] h-[56px] pl-3 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
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
                                  " bg-white w-[309px] h-[56px] pl-3 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
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
                                  " bg-white w-[309px] h-[56px] pl-3 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
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
                        name="roomId"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className=" font-semibold text-[22px]">
                              ห้อง
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={String(field.value)}
                            >
                              <FormControl
                                className={cn(
                                  " bg-white w-[309px] py-7 text-left font-normal hover:bg-[#F7F7F8]",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="เลือกห้อง" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {roomOptions.map((option) => (
                                  <SelectItem
                                    key={option.roomId}
                                    value={option.roomId.toString()}
                                  >
                                    {option.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

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
                                  " bg-white w-[309px] py-7 text-left font-normal hover:bg-[#F7F7F8] focus:border-none focus:ring-0",
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
                    <div>
                      <div className="flex justify-center gap-4">
                        <ButtonCustom
                          onClick={onConfirmEditRequest}
                          label={"บันทึกแก้ไขคำร้อง"}
                          className="w-[30%]"
                        />
                        <ButtonCustom
                          onClick={onConfirmRequest}
                          label={"อนุมัติคำร้อง"}
                          className="w-[25%] bg-[#2dbb3b]"
                        />
                        <ButtonCustom
                          onClick={onConfirmCancelRequest}
                          label={"ยกเลิกคำร้อง"}
                          className="w-[20%] bg-[#e16969]"
                        />
                        <ButtonCustom
                          hidden={true}
                          onClick={onClose}
                          className="w-[10%] bg-[#939393] text-white"
                          label={"ปิด"}
                        ></ButtonCustom>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <PopupSubmit
            open={confirmstatusOpenDialog}
            setOpen={setConfirmStatusOpenDialog}
            onConfirm={onConfirmEditRequest}
            onCancel={onCancel}
            title={"แก้ไขคำร้อง"}
          />
          <PopupStatus
            status={isConfirmRequestSuccess}
            open={statusConfirmEditRequestOpenDialog}
            setOpen={setStatusConfirmEditRequestOpenDialog}
            label={
              isConfirmRequestSuccess ? "แก้ไขคำร้องสำเร็จ" : "เกิดข้อผิดพลาด"
            }
          />
          <PopupSubmit
            open={confirmstatusOpenDialog}
            setOpen={setConfirmStatusOpenDialog}
            onConfirm={onConfirmEditRequest}
            onCancel={onCancel}
            title={"แก้ไขคำร้อง"}
          />
          <PopupStatus
            status={isConfirmEditRequestSuccess}
            open={statusConfirmEditRequestOpenDialog}
            setOpen={setStatusConfirmEditRequestOpenDialog}
            label={
              isConfirmEditRequestSuccess
                ? "แก้ไขคำร้องสำเร็จ"
                : "เกิดข้อผิดพลาด"
            }
          />
          <PopupSubmit
            open={confirmstatusOpenDialog}
            setOpen={setConfirmStatusOpenDialog}
            onConfirm={onConfirmRequest}
            onCancel={onCancel}
            title={"อนุมัติคำร้อง"}
          />
          <PopupStatus
            status={isConfirmRequestSuccess}
            open={statusConfirmRequestOpenDialog}
            setOpen={setStatusConfirmRequestOpenDialog}
            label={
              isConfirmRequestSuccess ? "อนุมัติคำร้องสำเร็จ" : "เกิดข้อผิดพลาด"
            }
          />
          <PopupSubmit
            open={confirmstatusOpenDialog}
            setOpen={setConfirmStatusOpenDialog}
            onConfirm={onConfirmCancelRequest}
            onCancel={onCancel}
            title={"ยกเลิกคำร้อง"}
          />
          <PopupStatus
            status={isCancelRequestSuccess}
            open={statusConfirmCancelRequestOpenDialog}
            setOpen={setStatusConfirmCancelRequestOpenDialog}
            label={
              isCancelRequestSuccess ? "ยกเลิกคำร้องสำเร็จ" : "เกิดข้อผิดพลาด"
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupEdit;
