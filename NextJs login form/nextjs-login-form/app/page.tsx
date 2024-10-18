'use client';

import { useState } from 'react';
import ModalForm from './component/ModalForm';
import NonModalForm from './component/NonModalForm';
import ToggleSwitch from './component/ToggleSwitch';

const Home = () => {
  const [isModal, setIsModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleForm = () => {
    setIsModal(!isModal);
    setIsModalVisible(false); // Close modal if toggling to non-modal form
  };

  const openModal = () => {
    if (isModal) {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsModal(true);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal(); // Close modal when clicking outside the form
    }
  };
  

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <h2 className='text-5xl font-bold text-center mb-4'>Login Form</h2>

      <ToggleSwitch isModal={isModal} toggleForm={toggleForm} />

      {/* Login Button */}
      {isModal && (
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mx-auto block w-48'
          onClick={openModal}
        >
          Login
        </button>
      )}

      <ModalForm
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        handleOverlayClick={handleOverlayClick}
      />

      {/* Non-Modal Login Form */}
      {!isModal && <NonModalForm />}
    </div>
  );
};

export default Home;
