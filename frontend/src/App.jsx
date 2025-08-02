
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Index from './Pages/Index';
import { AuthProvider } from './contexts/AuthContext';
import Tasks from './Pages/Tasks';
import User from './Pages/User';
import { Dust } from './Pages/Dust';
import TaskDetails from './Pages/TaskDetails';
import Header from './Pages/Header';
import { Dashboard } from './Pages/Dashboard';
import Sidebar from './components/Sidebar';
import { SidebarProvider } from './contexts/SIdebarContext';


function App() {
  return (
    <SidebarProvider>
      <AuthProvider>
        <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
         <Sidebar/>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>

      
      </AuthProvider>
      
    </SidebarProvider>
      
    
  );
}

export default App;