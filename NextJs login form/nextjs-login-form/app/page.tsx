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

// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';

// const Home = () => {
//   const [isModal, setIsModal] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const toggleForm = () => {
//     setIsModal(!isModal);
//     setIsModalVisible(false); // Close modal if toggling to non-modal form
//   };

//   const openModal = () => {
//     if (isModal) {
//       setIsModalVisible(true);
//     }
//   };

//   const closeModal = () => {
//     setIsModalVisible(false);
//     setIsModal(true);
//   };

//   const handleOverlayClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       closeModal(); // Close modal when clicking outside the form
//     }
//   };

//   return (
//     <div className='min-h-screen bg-gray-100 p-4'>
//       <h2 className='text-5xl font-bold text-center mb-4'>Login Form</h2>

//       {/* Toggle Switch */}
//       <div className='flex items-center justify-center mt-6 mb-4'>
//         <label htmlFor='modalToggle' className='font-semibold mr-2 text-2xl'>
//           Use Modal:
//         </label>
//         <input
//           type='checkbox'
//           id='modalToggle'
//           className='hidden'
//           checked={isModal}
//           onChange={toggleForm}
//         />
//         <div
//           className={`toggle ${
//             isModal ? 'bg-blue-500' : 'bg-gray-300'
//           } w-12 h-6 rounded-full relative cursor-pointer`}
//           onClick={toggleForm}
//         >
//           <div
//             className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
//               isModal ? 'translate-x-6' : 'translate-x-1'
//             }`}
//           ></div>
//         </div>
//       </div>

//       {/* Login Button */}
//       {isModal && (
//         <button
//           className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mx-auto block w-48'
//           onClick={openModal}
//         >
//           Login
//         </button>
//       )}

//       {/* Modal Form */}
//       {isModalVisible && (
//         <div
//           className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
//           onClick={handleOverlayClick}
//         >
//           <div className='bg-white p-8 rounded shadow-md relative w-1/2 h-1/2'>
//             <span
//               className='absolute top-2 right-10 text-3xl hover:text-red-700  cursor-pointer'
//               onClick={closeModal}
//             >
//               &times;
//             </span>
//             <div className='flex justify-center'>
//               <Image
//                 src='/profileImg.jpg'
//                 alt='Avatar'
//                 width={100}
//                 height={100}
//                 className='rounded-full'
//               />
//             </div>
//             <form>
//               <div className='mb-4'>
//                 <label htmlFor='uname' className='block mb-2 font-semibold'>
//                   Username
//                 </label>
//                 <input
//                   type='text'
//                   id='uname'
//                   placeholder='Enter Username'
//                   className='w-full p-2 border rounded'
//                   required
//                 />
//               </div>

//               <div className='mb-4'>
//                 <label htmlFor='psw' className='block mb-2 font-semibold'>
//                   Password
//                 </label>
//                 <input
//                   type='password'
//                   id='psw'
//                   placeholder='Enter Password'
//                   className='w-full p-2 border rounded'
//                   required
//                 />
//               </div>

//               <button
//                 type='submit'
//                 className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
//               >
//                 Login
//               </button>
//             </form>
//             <button
//               className='w-full bg-orange-500 text-white py-2 mt-4 rounded hover:bg-orange-600'
//               onClick={closeModal}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Non-Modal Login Form */}
//       {!isModal && (
//         <div className='relative bg-white p-8 rounded shadow-md  mx-auto mt-6 w-1/2 h-1/3'>
//           <div className='flex justify-center'>
//             <Image
//               src='/profileImg.jpg'
//               alt='Avatar'
//               width={100}
//               height={100}
//               className='rounded-full'
//             />
//           </div>
//           <form>
//             <div className='mb-4'>
//               <label htmlFor='uname' className='block mb-2 font-semibold'>
//                 Username
//               </label>
//               <input
//                 type='text'
//                 id='uname'
//                 placeholder='Enter Username'
//                 className='w-full p-2 border rounded'
//                 required
//               />
//             </div>

//             <div className='mb-4'>
//               <label htmlFor='psw' className='block mb-2 font-semibold'>
//                 Password
//               </label>
//               <input
//                 type='password'
//                 id='psw'
//                 placeholder='Enter Password'
//                 className='w-full p-2 border rounded'
//                 required
//               />
//             </div>

//             <button
//               type='submit'
//               className='w-full bg-blue-500 text-white py-2 my-8 rounded hover:bg-blue-600 '
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
