import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';



const TaskContext = createContext(undefined);

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    assignedTo: ''
  });
  const [sortBy, setSortBy] = useState('dueDate');

  useEffect(() => {
    // Load mock tasks
    const mockTasks= [
      {
        id: '1',
        title: 'Design Homepage',
        description: 'Create the landing page design for the new website',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-02-15',
        assignedTo: user?.id || '1',
        assignedToName: user?.name || 'John Doe',
        createdBy: '1',
        createdAt: '2024-01-20',
        documents: []
      },
      {
        id: '2',
        title: 'API Documentation',
        description: 'Write comprehensive API documentation',
        status: 'todo',
        priority: 'medium',
        dueDate: '2024-02-20',
        assignedTo: user?.id || '1',
        assignedToName: user?.name || 'John Doe',
        createdBy: '1',
        createdAt: '2024-01-21',
        documents: []
      }
    ];
    setTasks(mockTasks);
  }, [user]);

  const createTask = (taskData) => {
    const newTask= {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: user?.id || ''
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id, taskData) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...taskData } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      createTask,
      updateTask,
      deleteTask,
      filters,
      setFilters,
      sortBy,
      setSortBy
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}