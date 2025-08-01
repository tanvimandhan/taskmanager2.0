import { useState } from 'react';
// //import { Header } from '@/components/layout/Header';
// import { TaskList } from '@/components/tasks/TaskList';
// import { UserManagement } from '@/components/users/UserManagement';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="min-h-screen bg-background">
      {/* <Header activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      
      <main className="container mx-auto px-4 py-6">
        {/* {activeTab === 'tasks' && <TaskList />}
        {activeTab === 'users' && <UserManagement />} */}
        <p>tasklist</p>
        <p>usermanagement</p>
      </main>
    </div>
  );
}