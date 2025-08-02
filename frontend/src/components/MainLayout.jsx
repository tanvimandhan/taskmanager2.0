import React from 'react';
import Sidebar from './Sidebar';
import Header from '../Pages/Header';
import { useSidebar } from '../contexts/SIdebarContext';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex min-h-screen w-full">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col bg-white">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

