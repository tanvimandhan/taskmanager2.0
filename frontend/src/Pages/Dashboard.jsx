import { useState } from 'react';
import Header from './Header';
// //import { Header } from '@/components/layout/Header';
// import { TaskList } from '@/components/tasks/TaskList';
// import { UserManagement } from '@/components/users/UserManagement';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-background">      
      <main className="container mx-auto px-4 py-6">
        <p>tasklist</p>
        <p>usermanagement</p>
      </main>
    </div>
    </div>
    
  );
}