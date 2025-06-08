import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import HeaderLabel from "../HeaderLabel/HeaderLabel";
import { cn } from "@/lib/utils";

interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  title?: string;
  buttonHref: string;
  buttonLabel: string;
  children?: React.ReactNode;
}

const CardWrapper = ({
  label,
  title,
  buttonHref,
  buttonLabel,
  children,
  className,
}: CardWrapperProps) => {
  return (
    <Card className={cn("shadow-md rounded-md bg-white w-fit", className)}>
      <CardHeader>
        <HeaderLabel label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <ButtonCustom label={buttonLabel} href={buttonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
