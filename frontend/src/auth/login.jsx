import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

function Login() {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const LoginCheck = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!Name.trim()) newErrors.Name = "Email or Username is required";
    if (!Password.trim()) newErrors.Password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const response = await Axios.post(
        `${import.meta.env.VITE_API}/Login`,
        { Name, Password },
        { withCredentials: true }
      );

      localStorage.setItem("Userdata", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        server: error.response?.data?.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-gray-200">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center px-14 bg-gray-100 border-r border-gray-200">
          <h1 className="text-4xl font-semibold text-gray-900 leading-tight">
            Connect with <br />
            students from your <br />
            <span className="text-gray-600 font-medium">
              university.
            </span>
          </h1>
          <p className="mt-6 text-gray-600 text-sm leading-relaxed">
            UniLink helps verified university students connect,
            collaborate, and share ideas securely.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center px-6 sm:px-12 py-12">

          {/* MOBILE APP TITLE */}
          <div className="md:hidden mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Uni<span className="font-light">Link</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Connect with your university community
            </p>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome back 👋
          </h2>

          <form onSubmit={LoginCheck} className="space-y-4">
            {/* EMAIL */}
            <div>
              <input
                type="text"
                placeholder="University email or username"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-gray-50
                  border border-gray-300
                  text-gray-800
                  placeholder-gray-400
                  text-sm
                  outline-none
                  focus:border-blue-600
                "
              />
              {Errors.Name && (
                <p className="text-red-500 text-xs mt-1">{Errors.Name}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-gray-50
                  border border-gray-300
                  text-gray-800
                  placeholder-gray-400
                  text-sm
                  outline-none
                  focus:border-blue-600
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-xs text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {Errors.Password && (
                <p className="text-red-500 text-xs mt-1">
                  {Errors.Password}
                </p>
              )}
            </div>

            {/* FORGOT */}
            <div className="text-right">
              <span className="text-xs text-gray-500 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* SERVER ERROR */}
            {Errors.server && (
              <p className="text-red-500 text-sm">{Errors.server}</p>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* EMAIL LOGIN */}
          <button
            disabled
            className="
              w-full py-3 rounded-lg
              bg-gray-100
              border border-gray-300
              text-gray-400
              cursor-not-allowed
            "
          >
            Log in with University Email
          </button>

          {/* SIGN UP */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link to="/SignUp" className="text-blue-600 hover:underline">
              Create new account
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-8">
            © UniLink
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;