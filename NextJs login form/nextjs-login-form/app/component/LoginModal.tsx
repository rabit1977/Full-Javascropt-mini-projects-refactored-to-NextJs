import { useState } from 'react';

const LoginModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return (
    <>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={openModal}
      >
        Login
      </button>

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md w-96 relative">
            <span
              className="absolute top-2 right-2 text-3xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h3 className="text-center text-lg font-bold mb-4">Login</h3>
            <form>
              <label className="block mb-2 font-semibold" htmlFor="uname">
                Username
              </label>
              <input
                type="text"
                id="uname"
                name="uname"
                placeholder="Enter Username"
                required
                className="w-full p-2 mb-4 border rounded"
              />

              <label className="block mb-2 font-semibold" htmlFor="psw">
                Password
              </label>
              <input
                type="password"
                id="psw"
                name="psw"
                placeholder="Enter Password"
                required
                className="w-full p-2 mb-4 border rounded"
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
            <button
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
