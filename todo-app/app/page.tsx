// Home.js
'use client';

import { startTransition, useEffect, useRef, useState } from 'react';
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
    filterTasks,
    sortTasks,
    searchTasks,
    filterOptions,
    setFilterOptions,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery,
  } = useTasks();

  const listRef = useRef<HTMLUListElement>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);

  // useEffect to focus input when selectedTask changes
  useEffect(() => {
    if (selectedTask !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedTask, inputRef]); // Dependency array

  useEffect(() => {
    const checkScrollbar = () => {
      if (listRef.current && listRef.current.scrollHeight > 500) {
        setShowScrollbar(true);
      } else {
        setShowScrollbar(false);
      }
    };

    checkScrollbar(); // Check initially
    window.addEventListener('resize', checkScrollbar); // Check on window resize

    return () => window.removeEventListener('resize', checkScrollbar); // Clean up
  }, [tasks]); // Re-check when tasks change

  const addOrUpdateTask = () => {
    if (!task.trim()) return;
    startTransition(() => {
      if (selectedTask !== null) {
        editTask(selectedTask, {
          ...optimisticTasks[selectedTask], // Include existing properties
          title: task,
          createdAt: Date.now(),
        });
        showNotification('Task updated successfully!');
        setSelectedTask(null);
      } else {
        addTask(task);
        showNotification('Task added successfully!');
      }
      setTask('');
    });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 relative'>
      {notification && (
        <div className='bg-green-500 text-white p-3 rounded-md mb-4 text-lg font-medium absolute bottom-4 right-4'>
          {notification}
        </div>
      )}
      <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center  pr-4'>
        <h1 className='text-indigo-600 text-3xl font-bold mb-6'>
          Next.js ToDo App
        </h1>

        <div className='flex items-center justify-center mb-6 relative'>
          <input
            type='text'
            className='flex-1 p-2 border border-gray-400 rounded-md outline-none hover:shadow-md'
            value={task}
            onChange={handleInputChange}
            ref={inputRef}
            placeholder='Add Task'
          />
          <button
            className={`bg-indigo-600 hover:bg-indigo-700 ${
              !task.trim() ? 'text-white' : 'text-gray-200' // Conditional class
            }  rounded-r-md disabled:bg-gray-300 disabled:cursor-not-allowed transition
             duration-300 ease-in-out transform border border-l-0 p-2 hover:shadow-md absolute right-0`}
            onClick={addOrUpdateTask}
            disabled={!task.trim()}
          >
            {selectedTask !== null ? 'Update Task' : 'Add Task'}
          </button>
        </div>

        {/* Filter */}
        <div className='flex justify-between gap-3'>
          <div className='mb-4'>
            <label
              htmlFor='priority'
              className='mr-2 text-gray-700 font-medium'
            >
              Priority:
            </label>
            <select
              id='priority'
              className='border border-gray-400 rounded-md p-2'
              value={filterOptions.priority}
              onChange={(e) =>
                setFilterOptions({ ...filterOptions, priority: e.target.value })
              }
            >
              <option value='all'>All</option>
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>

          {/* Sort */}
          <div className='mb-4'>
            <label htmlFor='sort' className='mr-2 text-gray-700 font-medium'>
              Sort by:
            </label>
            <select
              id='sort'
              className='border border-gray-400 rounded-md p-2'
              value={sortOption}
              onChange={(e) =>
                setSortOption(
                  e.target.value as 'priority' | 'dueDate' | 'createdAt'
                )
              }
            >
              <option value='dueDate'>Due Date</option>
              <option value='priority'>Priority</option>
              <option value='createdAt'>Created At</option>
            </select>
          </div>
        </div>
        <p className='text-gray-600 mb-4'>Total tasks: {tasks.length}</p>

        {/* Search */}
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search tasks...'
            className='border border-gray-400 rounded-md p-2 w-full'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ul
          className={`list-none p-0 mt-6 overflow-y-auto max-h-[400px] ${
            showScrollbar ? 'custom-scrollbar' : ''
          }`}
          ref={listRef}
        >
          {' '}
          {/* Conditionally add custom-scrollbar class */}
          {optimisticTasks
            .filter(filterTasks)
            .sort(sortTasks)
            .filter(searchTasks)
            .map((task, index) => (
              <TaskItem
                key={task.id} // Use task.id as the key
                task={task}
                index={index}
                editTask={(index) => {
                  const taskToUpdate = optimisticTasks.find(
                    (_, i) => i === index
                  );
                  if (taskToUpdate) {
                    setSelectedTask(index);
                    setTask(taskToUpdate.title);
                  }
                }}
                deleteTask={deleteTask}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
