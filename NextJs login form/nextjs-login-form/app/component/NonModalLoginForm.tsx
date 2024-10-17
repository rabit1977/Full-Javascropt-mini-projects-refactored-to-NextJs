const NonModalLoginForm = () => {
    return (
      <div className="bg-white p-8 rounded shadow-md w-96">
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
      </div>
    );
  };
  
  export default NonModalLoginForm;
  