import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

function Login() {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Errors, setErrors] = useState({});
  const navigate = useNavigate();

  const LoginCheck = async () => {
    let newErrors = {};

    if (!Name.trim()) newErrors.Name = "Email or Username is required!";
    if (!Password.trim()) newErrors.Password = "Password is required!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_API}/Login`,
        { Name, Password },
        { withCredentials: true }
      );

      localStorage.setItem("Token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        server: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center px-4">

      {/* BACK BUTTON */}
      <Link
        to="/"
        className="absolute top-5 left-5 text-gray-400 hover:text-white transition flex items-center gap-2 text-sm"
      >
        <i className="ri-arrow-left-line"></i>
        Home
      </Link>

      {/* MAIN BOX */}
      <div
        className="
          w-full max-w-5xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          rounded-3xl shadow-xl
          grid grid-cols-1 md:grid-cols-2
          overflow-hidden
        "
      >
        {/* LEFT SIDE — HIDDEN ON MOBILE */}
        <div className="hidden md:flex flex-col justify-center items-center text-center p-10 bg-white/5 border-r border-gray-700">
          <img
            src="./logo.png"
            alt="logo"
            className="h-28 mb-6"
          />

          <h1 className="text-4xl font-bold bg-linear-to-b from-white to-gray-300 text-transparent bg-clip-text">
            Welcome Back!
          </h1>

          <p className="text-gray-300 text-lg mt-4 px-4">
            Login to your Unilink account and continue connecting with students.
          </p>
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className="flex flex-col justify-center p-6 sm:p-10">
          {/* MOBILE LOGO */}
          <img
            src="./logo.png"
            alt="logo"
            className="h-12 mx-auto mb-6 md:hidden"
          />

          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center md:text-left">
            Login
          </h2>

          {/* USERNAME */}
          <label className="text-gray-300 text-sm">Email or Username</label>
          <input
            type="text"
            className="
              w-full mt-2 px-4 py-3
              bg-white/5 border border-gray-700
              rounded-xl text-white
              outline-none
              focus:border-blue-400 focus:bg-white/10
              transition
            "
            placeholder="Enter email or username"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          {Errors.Name && <p className="text-red-500 text-sm mt-1">{Errors.Name}</p>}

          {/* PASSWORD */}
          <label className="text-gray-300 text-sm mt-5">Password</label>
          <input
            type="password"
            className="
              w-full mt-2 px-4 py-3
              bg-white/5 border border-gray-700
              rounded-xl text-white
              outline-none
              focus:border-blue-400 focus:bg-white/10
              transition
            "
            placeholder="Enter password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {Errors.Password && (
            <p className="text-red-500 text-sm mt-1">{Errors.Password}</p>
          )}

          {/* SERVER ERROR */}
          {Errors.server && (
            <p className="text-red-500 text-sm mt-4">{Errors.server}</p>
          )}

          {/* LOGIN BUTTON */}
          <button
            onClick={LoginCheck}
            className="
              w-full mt-6 py-3
              bg-white text-black font-semibold
              rounded-xl
              hover:bg-blue-400 hover:text-white
              transition
            "
          >
            Login
          </button>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            className="
              w-full py-3
              border border-gray-600 text-white
              rounded-xl
              flex justify-center items-center gap-2
              hover:bg-white/10
              transition
            "
          >
            <i className="ri-google-fill text-xl text-red-400"></i>
            Login with Google
          </button>

          {/* SIGN UP */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/SignUp" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;