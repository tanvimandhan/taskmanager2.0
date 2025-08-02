
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

function App() {
  return (
      <AuthProvider>
        
        <Routes>
         <Route path="/" element={<Index />} />
         <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path="/tasks" element={<Tasks/>} />
         <Route path="/completed/:status" element={<Tasks />} />
         <Route path="/inprogress/:status" element={<Tasks />} />
         <Route path="/todos/:status" element={<Tasks />} />
         <Route path="/teams" element={<User />} />
         <Route path="/dust" element={<Dust/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/task/:id" element={<TaskDetails />} />
      </Routes>
      
      </AuthProvider>
      
    
  );
}

export default App;