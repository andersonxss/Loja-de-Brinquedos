import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, SideBar } from "@/components";

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex">
        <SideBar open={sidebarOpen} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
