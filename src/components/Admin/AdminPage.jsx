import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 max-h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
}
