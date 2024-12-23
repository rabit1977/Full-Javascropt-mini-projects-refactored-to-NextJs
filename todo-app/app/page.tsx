// app/page.tsx (Home component)
'use client';

import { getToken } from 'next-auth/jwt';
import { signOut, useSession } from 'next-auth/react';
import { startTransition, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import TaskItem from './components/task-item';
import { useTasks } from './hooks/useTasks';
import React from 'react';

export default function Home() {
  const { data: session } = useSession();

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
  const [isLoading, setIsLoading] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);

  useEffect(() => {
    if (selectedTask !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedTask, inputRef]);

  useEffect(() => {
    const checkScrollbar = () => {
      if (listRef.current && listRef.current.scrollHeight > 500) {
        setShowScrollbar(true);
      } else {
        setShowScrollbar(false);
      }
    };

    checkScrollbar();
    window.addEventListener('resize', checkScrollbar);

    return () => window.removeEventListener('resize', checkScrollbar);
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
        });
        const res = await fetch('/api/tasks', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        });
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Network response was not ok: ${res.status} - ${errorText}`
          );
        }
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addOrUpdateTask = () => {
    if (!task.trim()) return;

    startTransition(() => {
      if (selectedTask !== null) {
        // Editing task
        editTask(selectedTask, {
          ...optimisticTasks[selectedTask],
          title: task,
          createdAt: Date.now(),
        });
        showNotification('Task updated successfully!');
        setSelectedTask(null);
      } else {
        // Adding new task
        addTask(task);
        showNotification('Task added successfully!');
      }
      setTask('');
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/signin' });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <Navbar />

      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 relative'>
        {/* Profile Icon and Sign Out Button */}
        {session && (
          <div className='absolute top-4 right-4 flex items-center gap-2'>
            <div className='bg-gray-200 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center font-semibold'>
              {session?.user?.email ? session.user.email[0].toUpperCase() : 'U'}
            </div>
            <span className='text-gray-700'>
              {session?.user?.email?.split('@')[0]}@
            </span>

            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2'
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}

        {notification && (
          <div className='bg-green-500 text-white p-3 rounded-md mb-4 text-lg font-medium absolute bottom-4 right-4'>
            {notification}
          </div>
        )}

        <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center pr-4'>
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
                !task.trim() ? 'text-white' : 'text-gray-200'
              } rounded-r-md disabled:bg-gray-300 disabled:cursor-not-allowed transition
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
                  setFilterOptions({
                    ...filterOptions,
                    priority: e.target.value,
                  })
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
          {isLoading ? (
            <div>Loading tasks...</div>
          ) : (
            <ul
              className={`list-none p-0 mt-6 overflow-y-auto max-h-[400px] ${
                showScrollbar ? 'custom-scrollbar' : ''
              }`}
              ref={listRef}
            >
              {tasks
                .filter(filterTasks)
                .sort(sortTasks)
                .filter(searchTasks)
                .map((task, index) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    editTask={(taskId) => {
                      const taskToUpdate = tasks.find(
                        (task) => task?.id === taskId
                      );
                      if (taskToUpdate) {
                        setSelectedTask(index); // Use index for editing
                        setTask(taskToUpdate.title);
                      }
                    }}
                    deleteTask={deleteTask}
                    index={index} // Pass the index to TaskItem
                  />
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
