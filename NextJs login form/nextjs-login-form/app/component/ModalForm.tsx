'use client';

import Image from 'next/image';
import LoginForm from './LoginForm';

interface ModalFormProps {
  isModalVisible: boolean;
  closeModal: () => void;
  handleOverlayClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ModalForm = ({
  isModalVisible,
  closeModal,
  handleOverlayClick,
}: ModalFormProps) => {
  if (!isModalVisible) return null;

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
      onClick={handleOverlayClick}
    >
      <div className='bg-white p-8 rounded shadow-md relative w-1/2 h-1/2'>
        <span
          className='absolute top-2 right-10 text-3xl hover:text-red-700 cursor-pointer'
          onClick={closeModal}
        >
          &times;
        </span>
        <div className='flex justify-center'>
          <Image
            src='/profileImg.jpg'
            alt='Avatar'
            width={100}
            height={100}
            className='rounded-full'
          />
        </div>
        <LoginForm />
        <button
          className='w-full bg-orange-500 text-white py-2 mt-4 rounded hover:bg-orange-600'
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalForm;
