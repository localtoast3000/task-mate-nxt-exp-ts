'use client';
import { useContext, createContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '@/types/tasks';
import req from '../requests/taskmate-api';

interface TasksContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (target_id: string) => void;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export function TasksContextProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1234', ends: '12/06/1991', task: 'Read a book with friends in the park' },
    { id: '1235', ends: '12/06/1991', task: 'Read a book with friends in the park' },
    { id: '1236', ends: '12/06/1991', task: 'Read a book with friends in the park' },
  ]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask(task: Task): void {
          setTasks([...tasks, task]);
        },
        deleteTask(target_id: string) {
          setTasks(tasks.filter(({ id }) => id !== target_id));
        },
      }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined)
    throw new Error('useTasks must be used within a TasksContextProvider');
  return context;
}
