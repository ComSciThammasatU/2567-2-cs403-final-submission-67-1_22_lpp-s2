import { User, CircleUser } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import useNavbar from "./useNavbar";

const Navbar = () => {
  const { onSubmit, authStore } = useNavbar();

  return (
    <nav className="h-16 w-full bg-[#69C4E1] text-white flex items-center px-20 justify-between sticky top-0  z-10">
      <img src="/logo.png" alt="Logo" className="h-10 scale-x-150" />
      <div className="flex flex-row space-x-6">
        <Popover>
          <PopoverTrigger asChild>
            <User />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col w-80 p-4 mr-10">
            <div className="flex flex-row space-x-3 items-center mb-4 ml-4">
              <CircleUser size={24} />
              <span className=" text-12">{authStore.username} </span>
            </div>
            <ButtonCustom
              label={"ออกจากระบบ"}
              className=" bg-[#D9D9D9] text-[#000000] hover:bg-[#d9d9d96e]"
              onClick={onSubmit}
            />
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
