'use client';

import { useState } from 'react';
import LoginModal from './LoginModal';
import NonModalLoginForm from './NonModalLoginForm';

const Login = () => {
  const [isModal, setIsModal] = useState(false);

  const toggleForm = () => {
    setIsModal(!isModal);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h2 className='text-2xl font-bold mb-4'>Login Form</h2>

      {/* Toggle Switch */}
      <div className='flex items-center space-x-2 mb-4'>
        <label htmlFor='modalToggle' className='font-semibold'>
          Use Modal:
        </label>
        <input
          type='checkbox'
          id='modalToggle'
          className='hidden'
          checked={isModal}
          onChange={toggleForm}
        />
        <div
          className={`toggle ${
            isModal ? 'bg-blue-500' : 'bg-gray-300'
          } w-12 h-6 rounded-full cursor-pointer relative`}
          onClick={toggleForm}
        >
          <div
            className={`toggle-dot absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
              isModal ? 'translate-x-6' : 'translate-x-1'
            }`}
          ></div>
        </div>
      </div>

      {/* Conditional Form Rendering */}
      {isModal ? <LoginModal /> : <NonModalLoginForm />}
    </div>
  );
};

export default Login;
