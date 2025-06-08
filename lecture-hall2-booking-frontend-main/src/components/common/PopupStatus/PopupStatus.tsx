import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import HeaderLabel from "../HeaderLabel/HeaderLabel";

interface PopupStatusProps {
  status: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  label: string;
}

const PopupStatus = ({ status, open, setOpen, label }: PopupStatusProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md text-center p-0 overflow-hidden rounded-md">
        <div className="bg-[#69C4E1] h-[60px] w-full rounded-t-md" />

        <div className="p-8">
          {status ? (
            <>
              <img
                src="/checked-svgrepo-com.svg"
                alt="success"
                className="mx-auto w-[145px] h-[145px]"
              />
              <DialogTitle className="mt-5">
                <HeaderLabel title={label} className="text-green-600" />
              </DialogTitle>
            </>
          ) : (
            <>
              <img
                src="/cancel-svgrepo-com.svg"
                alt="error"
                className="mx-auto w-[145px] h-[145px]"
              />
              <DialogTitle className="mt-5">
                <HeaderLabel title={label} className="text-red-600" />
              </DialogTitle>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupStatus;
