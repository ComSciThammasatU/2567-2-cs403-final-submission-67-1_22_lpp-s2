import { cn } from "@/lib/utils";

interface HeaderLabelProps {
  label?: string;
  title?: string;
  className?: string;
}

const HeaderLabel = ({ label, title, className }: HeaderLabelProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-y-4", className)}>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default HeaderLabel;
