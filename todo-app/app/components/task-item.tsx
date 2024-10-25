// TaskItem.js
import { format, formatDistanceToNow } from 'date-fns';
import { Task } from '../hooks/useTasks';

type TaskItemProps = {
  task: Task;
  index: number;
  editTask: (index: number) => void;
  deleteTask: (index: number) => void;
};

const TaskItem = ({ task, index, editTask, deleteTask }: TaskItemProps) => {
  const truncatedTitle =
    task.title.length > 30 ? `${task.title.substring(0, 30)}...` : task.title;

  return (
    <li className='bg-white border border-gray-200 hover:shadow-md transition duration-200 ease-in-out my-2 p-4 rounded-md flex justify-between items-center cursor-pointer'>
      <div className='flex items-center gap-3'>
        <input
          type='checkbox'
          className='mr-2 h-4 w-4 rounded border-gray-300 accent-indigo-600 focus:ring-indigo-500'
        />
        <div>
          <span className='text-gray-800 font-medium'>{truncatedTitle}</span>
          <div className='flex gap-2 text-xs text-gray-500'>
            <span>{format(task.createdAt, 'dd.MM.yyyy')}</span>
            <span>{formatDistanceToNow(task.createdAt)} ago</span>
          </div>
        </div>
      </div>
      <div>
        <button
          className='text-indigo-500 hover:text-indigo-700 mr-4 transition duration-200 ease-in-out text-lg font-semibold tracking-wide'
          onClick={() => editTask(index)}
        >
          Edit
        </button>
        <button
          className='text-red-500 hover:text-red-700 font-bold transition duration-200 ease-in-out'
          onClick={() => deleteTask(index)}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
