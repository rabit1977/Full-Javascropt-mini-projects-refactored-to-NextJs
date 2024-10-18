'use client';

const LoginForm = () => {
  return (
    <form>
      <div className='mb-4'>
        <label htmlFor='uname' className='block mb-2 font-semibold'>
          Username
        </label>
        <input
          type='text'
          id='uname'
          placeholder='Enter Username'
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='psw' className='block mb-2 font-semibold'>
          Password
        </label>
        <input
          type='password'
          id='psw'
          placeholder='Enter Password'
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <button
        type='submit'
        className='w-full bg-blue-500 text-white py-2 mt-6 rounded hover:bg-blue-600'
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
