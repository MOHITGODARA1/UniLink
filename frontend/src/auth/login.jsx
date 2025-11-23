import { Link } from "react-router-dom";
function Login() {
  return (
    <>
      <div className="w-full h-screen bg-black flex justify-center px-4">
        <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-white transition">
          <i className="ri-arrow-left-line mr-1"></i> Home
        </Link>

        <div className="w-[90%] sm:w-[600px]  backdrop-blur-md">

          {/* Unilink Icon */}
          <div className="flex justify-center">
            <img src="./logo.png" alt="logo" className="h-30" />
          </div>

          {/* Welcome Back */}
          <h1 className="text-5xl text-center font-semibold bg-linear-to-b from-white to-gray-400 text-transparent bg-clip-text">
            Welcome Back
          </h1>

          <p className="text-center text-gray-400 mt-2">
            Login to continue your journey
          </p>

          {/* Email / Username */}
          <div className="bg-white/5 border mt-2 border-gray-700 rounded-2xl">

            <div className="mt-4">
              <label className="text-gray-300 text-sm ml-4">Email or Username</label>
              <input 
                type="text"
                className="w-[90%] h-10 mt-2 ml-4 px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-400 transition"
                placeholder="Enter email or username"
              />
            </div>

            {/* Password */}
            <div className="mt-3">
              <label className="text-gray-300 text-sm ml-4">Password</label>
              <input 
                type="password"
                className="w-[90%] mt-2 ml-4 h-10 px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-400 transition"
                placeholder="Enter password"
              />
            </div>

            {/* Login Button */}
            <button className="w-[90%] mt-6 py-3 ml-4 h-11 bg-white text-black rounded-lg font-medium hover:scale-105 transition">
              Login
            </button>
            <div className="w-full flex items-center my-4 px-4">
              <div className="grow h-px bg-gray-700"></div>
              <span className="px-3 text-gray-400 text-sm">OR</span>
              <div className="grow h-px bg-gray-700"></div>
            </div>
            {/* Google Login */}
            <button className="w-[90%] mt-4 py-3 ml-4 border border-gray-600 text-white rounded-lg font-medium flex justify-center items-center gap-2 hover:scale-105 transition">
              <i className="ri-google-fill text-xl text-red-400"></i>
              Login with Google
            </button>
          {/* Don't Have Account */}

          <p className="text-center text-gray-400 mt-4 mb-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/SignUp">
              <span className="text-blue-400 cursor-pointer hover:underline">
                Sign Up
              </span>
            </Link>
          </p>
          </div>


        </div>

      </div>
    </>
  );
}

export default Login;
