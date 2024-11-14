// app/hooks/useTasks.tsx
import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { Task } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [optimisticTasks, setOptimisticTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [filterOptions, setFilterOptions] = useState({
    priority: 'all',
    completed: 'all',
  });

  const [sortOption, setSortOption] = useState<'dueDate' | 'priority' | 'createdAt'>('dueDate');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        headers: {
          'Content-Type': 'application/json',
          // Add any authorization headers if needed (e.g., 'Authorization': 'Bearer <token>')
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }

      const data: Task[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (taskText: string) => {
    const newTask: Task = {
      id: '',
      title: taskText,
      description: '',
      completed: false,
      dueDate: undefined,
      priority: 'medium',
      createdAt: Date.now(),
    };

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const createdTask: Task = await response.json();
        setTasks((prevTasks) => [createdTask, ...prevTasks]);
        setOptimisticTasks((prevTasks) => [createdTask, ...prevTasks]);
        showNotification('Task added successfully!');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }

    setTask('');
    setSelectedTask(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const deleteTask = async (index: number) => {
    const taskToDelete = tasks[index];
    try {
      const response = await fetch(`/api/tasks/${taskToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        setOptimisticTasks(newTasks);
        showNotification('Task deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (index: number, updatedTask: Task) => {
    try {
      const response = await fetch(`/api/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        const updatedTaskFromDb: Task = await response.json();
        const updatedTasks = tasks.map((task, i) =>
          i === index ? updatedTaskFromDb : task
        );
        setTasks(updatedTasks);
        setOptimisticTasks(updatedTasks);
        showNotification('Task updated successfully!');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }

    setTask('');
    setSelectedTask(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const filterTasks = (task: Task) => {
    if (filterOptions.priority === 'all') return true;
    return task.priority === filterOptions.priority;
  };

  const sortTasks = (a: Task, b: Task) => {
    if (sortOption === 'dueDate') {
      return (a.dueDate || new Date()).getTime() - (b.dueDate || new Date()).getTime();
    } else if (sortOption === 'priority') {
      const priorityOrder = { low: 3, medium: 2, high: 1 };
      return priorityOrder[a.priority!] - priorityOrder[b.priority!];
    } else {
      return a.createdAt - b.createdAt;
    }
  };

  const searchTasks = (task: Task) => {
    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      (task.description || '').toLowerCase().includes(query)
    );
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
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value),
    notification,
    showNotification,
    filterTasks,
    sortTasks,
    searchTasks,
    filterOptions,
    setFilterOptions,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery,
  };
}