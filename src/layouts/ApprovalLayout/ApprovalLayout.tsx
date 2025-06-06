import Navbar from "@/components/common/Navbar.tsx/Navbar";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const ApprovalLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex flex-row h-full w-full">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ApprovalLayout;
