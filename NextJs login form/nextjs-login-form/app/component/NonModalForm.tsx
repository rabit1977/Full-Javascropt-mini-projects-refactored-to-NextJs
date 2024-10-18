'use client';

import Image from 'next/image';
import LoginForm from './LoginForm';

const NonModalForm = () => {
  return (
    <div className='relative bg-white p-8 rounded shadow-md mx-auto mt-6 w-3/5 md:w-2/5 h-1/3'>
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
    </div>
  );
};

export default NonModalForm;
