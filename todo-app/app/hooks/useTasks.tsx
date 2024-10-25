// useTasks.js
import {
  ChangeEvent,
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  createdAt: number;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);
  const [task, setTask] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filterOptions, setFilterOptions] = useState({
    priority: 'all',
    completed: 'all',
  });
  const [sortOption, setSortOption] = useState<
    'dueDate' | 'priority' | 'createdAt'
  >('dueDate');
  const [searchQuery, setSearchQuery] = useState('');

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
    const newTask: Task = {
      id: uuidv4(),
      title: taskText,
      description: '',
      completed: false,
      dueDate: undefined,
      priority: 'medium',
      createdAt: Date.now(),
    };
    const newTasks = [newTask, ...tasks];
    startTransition(() => {
      setOptimisticTasks(newTasks);
      setTasks(newTasks);
      showNotification('Task added successfully!');
    });

    setTask('');
    setSelectedTask(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const deleteTask = (index: number) => {
    startTransition(() => {
      const newTasks = tasks.filter((_, i) => i !== index);
      setOptimisticTasks(newTasks);
      setTasks(newTasks);
      showNotification('Task deleted successfully!');
    });
  };

  const editTask = (index: number, updatedTask: Task) => {
    startTransition(() => {
      const newTasks = tasks.map((task, i) =>
        i === index ? updatedTask : task
      );
      setOptimisticTasks(newTasks);
      setTasks(newTasks);
      showNotification('Task updated successfully!');
    });
    setTask('');
    setSelectedTask(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
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
      // Handle undefined due dates
      return (
        (a.dueDate || new Date()).getTime() -
        (b.dueDate || new Date()).getTime()
      );
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
    handleInputChange,
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