import { userRoutes } from "@/routes/userRoutes";
import { Link } from "react-router-dom";
import useSidebar from "./useSidebar";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import { approvalRoutes } from "@/routes/approvalRoutes";

const Sidebar = () => {
  const { pathname, onClose, isOpen, role } = useSidebar();
  const menu =
    role === "user"
      ? userRoutes
      : approvalRoutes.filter((route) => !route.path.includes("booking-form"));

  return (
    <div className="flex flex-row h-full">
      <div
        className="relative bg-gray-100 h-full border transition-all duration-500 ease-in-out overflow-hidden"
        style={{ width: isOpen ? "16rem" : "0rem" }}
      >
        <div className="w-64 h-full bg-gray-100 border py-10">
          <ul>
            {menu.map((item) => {
              return (
                <li key={item.path} className="">
                  <Link
                    to={item.path}
                    className={`block px-4 py-2 ${
                      pathname === item.path ? "bg-gray-200 font-medium" : ""
                    }`}
                  >
                    <p className="ml-10"> {item.label}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <button className="mt-6" onClick={onClose}>
          {isOpen ? (
            <PanelLeftOpen size={24} color="#69C4E1" strokeWidth={2} />
          ) : (
            <PanelRightOpen size={24} color="#69C4E1" strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
