'use client';

import { format, formatDistanceToNow } from 'date-fns';
import {
  ChangeEvent,
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from 'react';
import styles from './styles/Home.module.css';

type Task = {
  text: string;
  createdAt: number;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Define the optimistic state using useOptimistic
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = { text: task, createdAt: Date.now() };
    startTransition(() => {
      if (selectedTask !== null) {
        const updatedTasks = tasks.map((t, index) =>
          index === selectedTask ? newTask : t
        );
        setOptimisticTasks(updatedTasks); // Optimistically update tasks
        setTasks(updatedTasks);
        setSelectedTask(null);
        showNotification('Task updated successfully!');
      } else {
        const newTasks = [...tasks, newTask];
        setOptimisticTasks(newTasks); // Optimistically update tasks
        setTasks(newTasks);
        showNotification('Task added successfully!');
      }
    });
    setTask('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const deleteTask = (index: number) => {
    startTransition(() => {
      const newTasks = tasks.filter((_, i) => i !== index);
      setOptimisticTasks(newTasks); // Optimistically update tasks
      setTasks(newTasks);
      showNotification('Task deleted successfully!');
    });
  };

  const editTask = (index: number) => {
    setTask(tasks[index].text);
    setSelectedTask(index);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Next.js ToDo App</h1>
        {notification && (
          <div className={styles.notification}>{notification}</div>
        )}
        <p>Total tasks: {tasks.length}</p>
        <input
          type='text'
          className={styles.inputField}
          value={task}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button
          className={styles.addButton}
          onClick={addTask}
          disabled={!task.trim()}
        >
          {selectedTask !== null ? 'Update Task' : 'Add Task'}
        </button>
        <ul className={styles.ulList}>
          {optimisticTasks.map((task, index) => (
            <li key={index} className={styles.listItem}>
              <div className={styles.DateTime}>
                <span>{task.text}</span>
                <small>{format(task.createdAt, 'dd.MM.yyyy')}</small>
                <small>{formatDistanceToNow(task.createdAt)} ago</small>
              </div>
              <div>
                <button
                  className={styles.editDeleteButton}
                  onClick={() => editTask(index)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteTask(index)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
