import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

function SignUp() {
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [College, setCollege] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Agree, setAgree] = useState(false);
  const [Errors, setErrors] = useState({});
  const [Suggestions, setSuggestions] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const searchCollege = async (value) => {
    setCollege(value);
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await Axios.get(
        `${import.meta.env.VITE_API}/Search?query=${value}`
      );
      setSuggestions(res.data);
    } catch {
      setSuggestions([]);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!UserName.trim()) newErrors.UserName = "Username is required";
    if (!Email.trim()) newErrors.Email = "Email is required";
    if (!College.trim()) newErrors.College = "University is required";
    if (Password.length < 8)
      newErrors.Password = "Password must be at least 8 characters";
    if (Password !== ConfirmPassword)
      newErrors.ConfirmPassword = "Passwords do not match";
    if (!Agree) newErrors.Agree = "You must accept the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await Axios.post(`${import.meta.env.VITE_API}/user-Register`, {
        UserName,
        Email,
        Collage: College,
        Password,
      });

      navigate("/Skill-Select");
    } catch (error) {
      setErrors({
        server: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    UserName && Email && College && Password && ConfirmPassword && Agree;

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-gray-200">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center px-14 bg-gray-100 border-r border-gray-200">
          <h1 className="text-4xl font-semibold text-gray-900 leading-tight">
            Join your <br />
            university <br />
            network.
          </h1>
          <p className="mt-6 text-gray-600 text-base leading-relaxed">
            UniLink helps students connect, collaborate,
            and grow within verified university communities.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center px-6 sm:px-12 py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            It takes less than a minute.
          </p>

          <form onSubmit={registerUser} className="space-y-4">
            {/* USERNAME */}
            <div>
              <input
                placeholder="Username"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-gray-50
                  border border-gray-300
                  text-gray-800
                  placeholder-gray-400
                  text-sm outline-none
                  focus:border-blue-600
                "
              />
              {Errors.UserName && (
                <p className="text-red-500 text-xs mt-1">
                  {Errors.UserName}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                placeholder="University email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-gray-50
                  border border-gray-300
                  text-gray-800
                  placeholder-gray-400
                  text-sm outline-none
                  focus:border-blue-600
                "
              />
              {Errors.Email && (
                <p className="text-red-500 text-xs mt-1">
                  {Errors.Email}
                </p>
              )}
            </div>

            {/* UNIVERSITY */}
            <div className="relative">
              <input
                placeholder="University name"
                value={College}
                onChange={(e) => searchCollege(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-gray-50
                  border border-gray-300
                  text-gray-800
                  placeholder-gray-400
                  text-sm outline-none
                  focus:border-blue-600
                "
              />

              {Suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                  {Suggestions.map((s, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setCollege(s.name);
                        setSuggestions([]);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <p className="text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-500">
                        {s.city}, {s.state}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {Errors.College && (
                <p className="text-red-500 text-xs mt-1">
                  {Errors.College}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 8 characters)"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-gray-50
                  border border-gray-300
                  text-gray-800
                  placeholder-gray-400
                  text-sm outline-none
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

            {/* CONFIRM */}
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-lg
                  bg-gray-50
                  border border-gray-300
                  text-gray-800
                  placeholder-gray-400
                  text-sm outline-none
                  focus:border-blue-600
                "
              />
              {Errors.ConfirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {Errors.ConfirmPassword}
                </p>
              )}
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={Agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 accent-blue-600"
              />
              <p className="text-sm text-gray-500">
                I agree to UniLink’s{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Terms & Privacy Policy
                </span>
              </p>
            </div>

            {Errors.Agree && (
              <p className="text-red-500 text-xs">{Errors.Agree}</p>
            )}

            {/* SERVER ERROR */}
            {Errors.server && (
              <p className="text-red-500 text-sm">{Errors.server}</p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={!isFormValid || Loading}
              className={`w-full py-3 rounded-lg font-medium transition ${
                Loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {Loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* LOGIN */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Log in
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

export default SignUp;