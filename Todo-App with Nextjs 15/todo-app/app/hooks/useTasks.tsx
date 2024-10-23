// useTasks.js
import { useState, useEffect, useOptimistic, ChangeEvent, startTransition, useRef } from 'react';

export type Task = {
  text: string;
  createdAt: number;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);
  const [task, setTask] = useState<string>(''); 
  const [selectedTask, setSelectedTask] = useState<number | null>(null); 
  const [notification, setNotification] = useState<string | null>(null); 
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText: string) => {
    const newTask = { text: taskText, createdAt: Date.now() };
    startTransition(() => {
      const newTasks = [...tasks, newTask];
      setOptimisticTasks(newTasks);
      setTasks(newTasks);
       // Move showNotification here, after setTasks
       showNotification('Task added successfully!');
    });
    setTask(''); // Clear input after adding
    setSelectedTask(null); // Reset selectedTask
    if (inputRef.current) {
        inputRef.current.focus(); // Focus the input field
      }
  };

  const deleteTask = (index: number) => {
    startTransition(() => {
      const newTasks = tasks.filter((_, i) => i !== index);
      setOptimisticTasks(newTasks);
      setTasks(newTasks);
      // Move showNotification here, after setTasks
      showNotification('Task deleted successfully!'); 
    });
  };

  const editTask = (index: number, newTask: Task) => {
    startTransition(() => {
      const updatedTasks = tasks.map((t, i) => (i === index ? newTask : t));
      setOptimisticTasks(updatedTasks);
      setTasks(updatedTasks);
      // Move showNotification here, after setTasks
      showNotification('Task deleted successfully!');
    });
    setTask(''); // Clear input after editing
    setSelectedTask(null); // Reset selectedTask
    if (inputRef.current) {
        inputRef.current.focus(); // Focus the input field
      }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value); 
  };

  const showNotification = (message: string) => {
    setNotification(message); 
    setTimeout(() => setNotification(null), 3000); 
  };

  return { 
    tasks, 
    optimisticTasks, 
    addTask, 
    deleteTask, 
    editTask,
    task,
    inputRef,
    setTask,
    selectedTask,
    setSelectedTask,
    handleInputChange,
    notification,
    showNotification
  };
}