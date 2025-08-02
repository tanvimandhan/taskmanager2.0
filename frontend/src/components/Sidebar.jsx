import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdTaskAlt,
  MdOutlinePendingActions,
} from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { useSidebar } from "../contexts/SIdebarContext";

const linkdata = [
  { label: "Dashboard", link: "/dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "/tasks", icon: <FaTasks /> },
  { label: "Completed", link: "/completed/completed", icon: <MdTaskAlt /> },
  { label: "In Progress", link: "/inprogress/in-progress", icon: <MdOutlinePendingActions /> },
];

const Sidebar = ({ user }) => {
  const location = useLocation();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkdata : linkdata.slice(0, 3);

  if (!isSidebarOpen) return null;

  return (
    <div className="w-64 h-screen bg-gray-100 shadow-lg p-6 flex flex-col gap-6 fixed">
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Taskme</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-4">
        {sidebarLinks.map((item) => (
          <Link
            key={item.label}
            to={item.link}
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-blue-100 ${
              path === item.link.split("/")[1] ? "bg-blue-200 text-blue-700 font-semibold" : "text-gray-700"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

