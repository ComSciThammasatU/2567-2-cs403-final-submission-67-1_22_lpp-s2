import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";

interface ButtonCustomProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label: string;
  href?: string;
}

const ButtonCustom = ({
  label,
  href,
  className,
  ...props
}: ButtonCustomProps) => {
  return (
    <Button
      className={cn(
        " bg-[#69C4E1] font-normal w-full rounded md:rounded-md hover:bg-[#6088ad]",
        className
      )}
      {...props}
      asChild
    >
      {href ? <Link to={href}>{label}</Link> : <span>{label}</span>}
    </Button>
  );
};

export default ButtonCustom;
