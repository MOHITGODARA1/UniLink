import { Link,useNavigate  } from "react-router-dom";
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
      const data = { Name, Password };

      const response = await Axios.post(
        `${import.meta.env.VITE_API}/Login`,
        data
      );
      navigate("/dashboard");
      console.log(response.data);

    } catch (error) {
      if (error.response) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: "Something went wrong" });
      }
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-black flex justify-center items-center px-6 overflow-hidden relative">

        {/* BACK BUTTON */}
        <Link
          to="/"
          className="absolute top-6 left-6 text-gray-400 hover:text-white transition flex items-center gap-2"
        >
          <i className="ri-arrow-left-line"></i>
          <span>Home</span>
        </Link>

        {/* MAIN BOX */}
        <div className="
          w-[95%] max-w-5xl 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          rounded-3xl shadow-xl 
          grid grid-cols-1 md:grid-cols-2
          overflow-hidden
        ">

          {/* LEFT SIDE (Welcome Section) */}
          <div className="flex flex-col justify-center items-center text-center p-10 bg-white/5 border-r border-gray-700">

            <img src="./logo.png" alt="logo" className="h-32 mb-6 drop-shadow-xl" />

            <h1 className="text-4xl font-bold bg-linear-to-b from-white to-gray-300 text-transparent bg-clip-text drop-shadow-md">
              Welcome Back!
            </h1>

            <p className="text-gray-300 text-lg mt-4 leading-relaxed px-4">
              Login to your Unilink account and continue your journey  
              of connecting with students across the world.
            </p>

          </div>

          {/* RIGHT SIDE (Form) */}
          <div className="flex flex-col justify-center p-10">

            <h2 className="text-3xl font-semibold text-white mb-6">Login</h2>

            {/* Email / Username */}
            <label className="text-gray-300 text-sm ml-1">Email or Username</label>
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
            {Errors.Name && (
              <p className="text-red-500 text-sm mt-1">{Errors.Name}</p>
            )}

            {/* Password */}
            <div className="mt-5">
              <label className="text-gray-300 text-sm ml-1">Password</label>
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
            </div>

            {/* SERVER ERROR */}
            {Errors.server && (
              <p className="text-red-500 text-sm mt-4">{Errors.server}</p>
            )}

            {/* LOGIN BUTTON */}
            <button
              className="
                w-full mt-7 py-3 h-12 
                bg-white text-black font-semibold 
                rounded-xl shadow-md 
                hover:bg-blue-400 hover:text-white 
                hover:scale-[1.03] 
                active:scale-95 
                transition duration-200
              "
              onClick={LoginCheck}
            >
              Login
            </button>

            {/* Divider */}
            <div className="w-full flex items-center my-6">
              <div className="grow h-px bg-gray-700"></div>
              <span className="px-3 text-gray-400 text-sm">OR</span>
              <div className="grow h-px bg-gray-700"></div>
            </div>

            {/* Google Login */}
            <button
              className="
                w-full py-3 
                border border-gray-600 text-white 
                rounded-xl font-medium 
                flex justify-center items-center gap-2 
                hover:scale-[1.03] 
                active:scale-95 
                transition
              "
            >
              <i className="ri-google-fill text-xl text-red-400"></i>
              Login with Google
            </button>

            {/* SIGNUP LINK */}
            <p className="text-center text-gray-400 mt-6 text-sm">
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
