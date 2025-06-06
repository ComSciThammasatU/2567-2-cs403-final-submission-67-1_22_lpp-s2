import { useAuthStore } from "@/stores/authStore";
import { useForm } from "react-hook-form";
import { useBookingFormStore } from "@/stores/bookingFormStore";
import { createBooking, updateBooking } from "@/services/bookingService";
// import { updateApproval } from "@/services/approvalService";

import {
  postApproveBookingApi,
  postCancelBookingApi,
} from "@/services/approvalService";
import { useEffect, useState } from "react";
import { useScheduleStore } from "@/stores/scheduleStore";
import { useGetRoomStore } from "../../../stores/roomStore";

type BookingForm = {
  dateStart: Date;
  dateEnd: Date;
  startTime: string;
  endTime: string;
  people: number;
  bookingNote: string;
  activity: string;
  requiredTools: string;
  roomId: number;
  roomName: string;
};

const useBookingForm = () => {
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isConfirmRequestSuccess, setIsConfirmRequestSuccess] = useState(false);
  const [isConfirmEditRequestSuccess, setIsConfirmEditRequestSuccess] =
    useState(false);
  const [isCancelRequestSuccess, setIsCancelRequestSuccess] = useState(false);
  const [statusOpenDialog, setStatusOpenDialog] = useState(false);
  const [confirmStatusOpenDialog, setConfirmStatusOpenDialog] = useState(false);
  const [statusConfirmRequestOpenDialog, setStatusConfirmRequestOpenDialog] =
    useState(false);
  const [
    statusConfirmEditRequestOpenDialog,
    setStatusConfirmEditRequestOpenDialog,
  ] = useState(false);
  const [
    statusConfirmCancelRequestOpenDialog,
    setStatusConfirmCancelRequestOpenDialog,
  ] = useState(false);

  const authStore = useAuthStore((state) => state);
  const bookingFormStore = useBookingFormStore((state) => state);
  const { isEventSelected, selectBookingId } = useScheduleStore();
  // const { fetchRoomList, roomResponse } = useGetRoomStore((state) => state);

  const form = useForm<BookingForm>({
    defaultValues: bookingFormStore.bookingForm,
  });

  useEffect(() => {
    form.reset(bookingFormStore.bookingForm);
    const subscription = form.watch((values) => {
      bookingFormStore.setBookingForm(values);
    });

    return () => subscription.unsubscribe();
  }, [form, bookingFormStore, isEventSelected]);

  const onSubmit = async () => {
    setConfirmStatusOpenDialog(true);

    // bookingFormStore.resetBookingForm();
    // form.reset();
  };

  const onComfirmSubmit = async () => {
    setConfirmStatusOpenDialog(false);
    setStatusOpenDialog(true);
    setIsBookingSuccess(false);

    try {
      const response = await createBooking({
        dateStart:
          bookingFormStore.bookingForm.dateStart.toLocaleString() ?? "",
        dateEnd: bookingFormStore.bookingForm.dateEnd.toLocaleString() ?? "",
        startTime: bookingFormStore.bookingForm.startTime?.toString() ?? "",
        endTime: bookingFormStore.bookingForm.endTime?.toString() ?? "",
        people: bookingFormStore.bookingForm.people,
        bookingNote: bookingFormStore.bookingForm.bookingNote ?? "",
        activity: bookingFormStore.bookingForm.activity ?? "",
      });
      if (response?.data?.error) {
        throw new Error("Create booking failed.");
      }
      setIsBookingSuccess(true);
      bookingFormStore.resetBookingForm();
      form.reset();
    } catch (error) {
      console.error("onConfirmSubmit error", error);
    }
  };

  const onConfirmRequest = async () => {
    setStatusConfirmRequestOpenDialog(false);
    setIsConfirmRequestSuccess(false);

    try {
      if (!selectBookingId) throw new Error("No selected booking id found");
      const response = await postApproveBookingApi(selectBookingId);
      console.log("response", response);
      setIsConfirmRequestSuccess(true);
      setStatusConfirmRequestOpenDialog(true);
      bookingFormStore.resetBookingForm();
      form.reset();
    } catch (error) {
      console.error("onConfirmSubmit error", error);
    }
  };

  const onConfirmEditRequest = async () => {
    setStatusConfirmEditRequestOpenDialog(false);
    setIsConfirmEditRequestSuccess(false);

    try {
      if (!selectBookingId) throw new Error("No selected booking id found");
      const response = await updateBooking(selectBookingId, {
        dateStart:
          bookingFormStore.bookingForm.dateStart
            .toLocaleString()
            .substring(0, 10) ?? "",
        dateEnd:
          bookingFormStore.bookingForm.dateStart
            .toLocaleString()
            .substring(0, 10) ?? "",
        startTime: bookingFormStore.bookingForm.startTime?.toString() ?? "",
        endTime: bookingFormStore.bookingForm.endTime?.toString() ?? "",
        roomId: bookingFormStore.bookingForm.roomId,
        people: bookingFormStore.bookingForm.people,
        bookingNote: bookingFormStore.bookingForm.bookingNote ?? "",
        activity: bookingFormStore.bookingForm.activity ?? "",
      });
      if (response?.data?.error) {
        throw new Error("Update booking failed.");
      }
      console.log("response", response);
      setIsConfirmEditRequestSuccess(true);
      setStatusConfirmEditRequestOpenDialog(true);
      bookingFormStore.resetBookingForm();
      form.reset();
    } catch (error) {
      console.error("onConfirmSubmit error", error);
    }
  };

  const onConfirmCancelRequest = async () => {
    setStatusConfirmCancelRequestOpenDialog(false);
    setIsCancelRequestSuccess(false);

    try {
      if (!selectBookingId) throw new Error("No selected booking id found");
      const response = await postCancelBookingApi(
        selectBookingId,
        "Rejected by Approver"
      );
      console.log("response", response);
      setIsCancelRequestSuccess(true);
      setStatusConfirmCancelRequestOpenDialog(true);
      bookingFormStore.resetBookingForm();
      form.reset();
    } catch (error) {
      console.error("onConfirmCancel error", error);
    }
  };

  const onCancel = () => {
    setConfirmStatusOpenDialog(false);
  };

  return {
    form,
    authStore,
    onSubmit,
    onComfirmSubmit,
    onCancel,
    isBookingSuccess,
    statusOpenDialog,
    confirmstatusOpenDialog: confirmStatusOpenDialog,
    setIsBookingSuccess,
    setStatusOpenDialog,
    setConfirmStatusOpenDialog,
    onConfirmRequest,
    onConfirmEditRequest,
    onConfirmCancelRequest,
    isConfirmRequestSuccess,
    isConfirmEditRequestSuccess,
    isCancelRequestSuccess,
    statusConfirmRequestOpenDialog,
    setStatusConfirmRequestOpenDialog,
    statusConfirmCancelRequestOpenDialog,
    setStatusConfirmCancelRequestOpenDialog,
    statusConfirmEditRequestOpenDialog,
    setStatusConfirmEditRequestOpenDialog,
  };
};

export default useBookingForm;
