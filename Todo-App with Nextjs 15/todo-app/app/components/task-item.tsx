// TaskItem.js
import { format, formatDistanceToNow } from 'date-fns';
import { Task } from '../hooks/useTasks'; // Import the Task type

type TaskItemProps = {
  task: Task;
  index: number;
  editTask: (index: number) => void;
  deleteTask: (index: number) => void;
};

const TaskItem = ({ task, index, editTask, deleteTask }: TaskItemProps) => (
  <li className='bg-gray-100 my-2 p-4 rounded-md flex justify-between items-center'>
    <div className='flex gap-2 items-center'>
      <span>{task.text}</span>
      <small className='text-gray-500'>
        {format(task.createdAt, 'dd.MM.yyyy')}
      </small>
      <small className='text-gray-500'>
        {formatDistanceToNow(task.createdAt)} ago
      </small>
    </div>
    <div>
      <button
        className='text-green-500 hover:text-green-700 mr-2'
        onClick={() => editTask(index)}
      >
        Edit
      </button>
      <button
        className='text-red-500 hover:text-red-700 font-bold'
        onClick={() => deleteTask(index)}
      >
        X
      </button>
    </div>
  </li>
);

export default TaskItem;
