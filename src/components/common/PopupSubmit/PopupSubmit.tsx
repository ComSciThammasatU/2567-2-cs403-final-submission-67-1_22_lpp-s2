import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { Textarea } from "@/components/ui/textarea";

interface PopupSubmitProps {
  title?: string;
  open: boolean;
  isApprovalCancel?: boolean;
  cancelReason?: string;
  setCancelReason?: (value: string) => void;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const PopupSubmit = ({
  title,
  open,
  isApprovalCancel,
  cancelReason,
  setCancelReason,
  setOpen,
  onConfirm,
  onCancel,
}: PopupSubmitProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md  p-0 overflow-hidden rounded-md">
        <div className="bg-[#69C4E1] h-[60px] w-full rounded-t-md" />

        <div className="p-8">
          <DialogHeader>
            <DialogTitle className="text-center mb-10">{title}</DialogTitle>
          </DialogHeader>

          {isApprovalCancel && (
            <>
              <Textarea
                placeholder="เหตุผลยกเลิกคำร้อง"
                className="mb-10"
                value={cancelReason}
                onChange={(e) => setCancelReason?.(e.target.value)}
              />
            </>
          )}

          <div className="flex justify-center gap-4">
            <ButtonCustom
              onClick={onConfirm}
              label={"ยืนยัน"}
              className="w-[40%]"
            />
            <Button variant="outline" onClick={onCancel} className="w-[40%]">
              ยกเลิก
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupSubmit;
