'use client';

interface ToggleSwitchProps {
  isModal: boolean;
  toggleForm: () => void;
}

const ToggleSwitch = ({ isModal, toggleForm }: ToggleSwitchProps) => {
  return (
    <div className='flex items-center justify-center mt-6 mb-4'>
      <label htmlFor='modalToggle' className='font-semibold mr-2 text-2xl'>
        {isModal ? 'Modal' : 'Not Modal'}
      </label>
      <input
        type='checkbox'
        id='modalToggle'
        className='hidden'
        checked={isModal}
        onChange={toggleForm}
      />
      <div
        className={`${
          isModal ? 'bg-blue-500' : 'bg-gray-400'
        } w-12  h-6 rounded-full relative cursor-pointer`}
        onClick={toggleForm}
      >
        <div
          className={`absolute size-5 bg-white rounded-full top-0.5 transition-transform ${
            isModal ? 'translate-x-[26px]' : 'translate-x-0.5'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
