import { FC } from 'react';

interface ToggleProps {
  isChecked: boolean;
  onToggle: () => void;
}

const Toggle: FC<ToggleProps> = ({ isChecked, onToggle }) => {
  return (
    <div className="flex items-center justify-center mt-8 mb-4">
      <label className="mr-2 font-bold">Use Modal:</label>
      <input
        type="checkbox"
        id="modalToggle"
        className="hidden"
        checked={isChecked}
        onChange={onToggle}
      />
      <div
        className={`toggle w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${
          isChecked ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        onClick={onToggle}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
            isChecked ? 'transform translate-x-6' : ''
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Toggle;
