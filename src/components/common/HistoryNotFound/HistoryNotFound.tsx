import { Label } from "@/components/ui/label";
import ButtonCustom from "../ButtonCustom/ButtonCustom";

interface HistoryNotFoundProps {
  label: string;
  href?: string;
  title: string;
}

const HistoryNotFound = ({ label, href, title }: HistoryNotFoundProps) => {
  return (
    <>
      <Label className="text-[#646464] text-2xl my-10">{title}</Label>
      <ButtonCustom label={label} href={href} className="w-60 h-20 text-xl" />
    </>
  );
};

export default HistoryNotFound;
