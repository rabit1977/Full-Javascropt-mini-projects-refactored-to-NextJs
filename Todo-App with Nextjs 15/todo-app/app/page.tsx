// Home.js
'use client';

import { startTransition, useEffect } from 'react';
import TaskItem from './components/task-item';
import { useTasks } from './hooks/useTasks';

export default function Home() {
  const {
    tasks,
    optimisticTasks,
    addTask,
    deleteTask,
    editTask,
    task,
    inputRef,
    setTask,
    selectedTask,
    notification,
    showNotification,
    handleInputChange,
    setSelectedTask,
  } = useTasks();

  // useEffect to focus input when selectedTask changes
  useEffect(() => {
    if (selectedTask !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedTask, inputRef]); // Dependency array
  const addOrUpdateTask = () => {
    if (!task.trim()) return;
    startTransition(() => {
      if (selectedTask !== null) {
        editTask(selectedTask, { text: task, createdAt: Date.now() });
        showNotification('Task updated successfully!');
        setSelectedTask(null);
      } else {
        addTask(task);
        showNotification('Task added successfully!');
      }
    });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-100'>
      <div className='bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center'>
        <h1 className='text-green-500 text-2xl mb-4'>Next.js ToDo App</h1>
        {notification && (
          <div className='bg-green-500 text-white p-2 rounded-md mb-2'>
            {notification}
          </div>
        )}
        <p>Total tasks: {tasks.length}</p>
        <input
          type='text'
          className='border border-green-500 rounded-md p-2 mr-2 mb-2 w-4/5'
          value={task}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed'
          onClick={addOrUpdateTask}
          disabled={!task.trim()}
        >
          {selectedTask !== null ? 'Update Task' : 'Add Task'}
        </button>
        <ul className='list-none p-0'>
          {optimisticTasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              index={index}
              editTask={(index) => {
                setSelectedTask(index);
                setTask(optimisticTasks[index].text);
              }}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
