import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

function SignUp() {
  const [UserName, SetUsername] = useState("");
  const [Email, SetEmail] = useState("");
  const [Collage, setCollage] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Agree, setAgree] = useState(false);
  const [Errors, setErrors] = useState({});
  const [Suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  // 🔍 SEARCH UNIVERSITY
  const searchCollege = async (value) => {
    setCollage(value);
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

  // 🧾 REGISTER
  const registerUser = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!UserName.trim()) newErrors.UserName = "Username is required!";
    if (!Email.trim()) newErrors.Email = "Email is required!";
    if (!Collage.trim()) newErrors.Collage = "University is required!";
    if (!Password.trim()) newErrors.Password = "Password is required!";
    if (!ConfirmPassword.trim())
      newErrors.ConfirmPassword = "Confirm Password is required!";
    if (Password !== ConfirmPassword)
      newErrors.ConfirmPassword = "Passwords do not match!";
    if (!Agree) newErrors.Agree = "You must accept Terms & Services.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await Axios.post(`${import.meta.env.VITE_API}/user-Register`, {
        UserName,
        Email,
        Collage,
        Password,
      });
      navigate("/Skill-Select");
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center px-4">

      {/* BACK */}
      <Link
        to="/"
        className="absolute top-5 left-5 text-gray-400 hover:text-white flex items-center gap-2 text-sm"
      >
        <i className="ri-arrow-left-line"></i> Home
      </Link>

      {/* MAIN CARD */}
      <div
        className="
          w-full max-w-5xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          rounded-3xl shadow-xl
          grid grid-cols-1 md:grid-cols-[40%_60%]
          overflow-hidden
        "
      >
        {/* LEFT — DESKTOP ONLY */}
        <div className="hidden md:flex flex-col justify-center items-center text-center p-10 bg-white/5 border-r border-gray-700">
          <img src="./logo.png" alt="logo" className="h-28 mb-6" />
          <h1 className="text-4xl font-bold bg-linear-to-b from-white to-gray-400 text-transparent bg-clip-text">
            Join Unilink
          </h1>
          <p className="text-gray-300 text-lg mt-4 px-4">
            Create your account and connect with students worldwide.
          </p>
        </div>

        {/* RIGHT — FORM */}
        <form
          onSubmit={registerUser}
          className="flex flex-col justify-center p-6 sm:p-10"
        >
          {/* MOBILE LOGO */}
          <img src="./logo.png" alt="logo" className="h-12 mx-auto mb-6 md:hidden" />

          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center md:text-left">
            Create Account
          </h2>

          {Errors.general && (
            <p className="text-red-500 text-sm mb-3">{Errors.general}</p>
          )}

          {/* INPUT STYLE */}
          {[
            {
              label: "Username",
              value: UserName,
              setter: SetUsername,
              error: Errors.UserName,
              placeholder: "Enter username",
            },
            {
              label: "Email",
              value: Email,
              setter: SetEmail,
              error: Errors.Email,
              placeholder: "Enter email",
            },
          ].map((field, i) => (
            <div key={i} className="mb-4">
              <label className="text-gray-200 text-sm font-medium">
                {field.label}
              </label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="
                  w-full mt-2 px-4 py-4 text-base
                  bg-black/40 border border-gray-600
                  rounded-xl text-white
                  placeholder-gray-400
                  outline-none focus:outline-none
                  focus:border-blue-500 focus:bg-black/60
                  transition
                "
              />
              {field.error && (
                <p className="text-red-500 text-sm mt-1">{field.error}</p>
              )}
            </div>
          ))}

          {/* UNIVERSITY */}
          <div className="mb-4 relative">
            <label className="text-gray-200 text-sm font-medium">
              University
            </label>
            <input
              type="text"
              value={Collage}
              onChange={(e) => searchCollege(e.target.value)}
              placeholder="Search university"
              className="
                w-full mt-2 px-4 py-4 text-base
                bg-black/40 border border-gray-600
                rounded-xl text-white
                placeholder-gray-400
                outline-none focus:outline-none
                focus:border-blue-500 focus:bg-black/60
                transition
              "
            />
            {Suggestions.length > 0 && (
              <ul className="absolute z-50 w-full bg-white text-black rounded-xl shadow-lg mt-1 max-h-52 overflow-y-auto">
                {Suggestions.map((u, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setCollage(u.name);
                      setSuggestions([]);
                    }}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-xs text-gray-600">
                      {u.city}, {u.state}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {Errors.Collage && (
              <p className="text-red-500 text-sm mt-1">{Errors.Collage}</p>
            )}
          </div>

          {/* PASSWORDS */}
          {[{
            label: "Password",
            value: Password,
            setter: setPassword,
            error: Errors.Password,
            placeholder: "Create password",
          },
          {
            label: "Confirm Password",
            value: ConfirmPassword,
            setter: setConfirmPassword,
            error: Errors.ConfirmPassword,
            placeholder: "Confirm password",
          }].map((field, i) => (
            <div key={i} className="mb-4">
              <label className="text-gray-200 text-sm font-medium">
                {field.label}
              </label>
              <input
                type="password"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="
                  w-full mt-2 px-4 py-4 text-base
                  bg-black/40 border border-gray-600
                  rounded-xl text-white
                  placeholder-gray-400
                  outline-none focus:outline-none
                  focus:border-blue-500 focus:bg-black/60
                  transition
                "
              />
              {field.error && (
                <p className="text-red-500 text-sm mt-1">{field.error}</p>
              )}
            </div>
          ))}

          {/* TERMS */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={Agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-5 h-5 accent-blue-500"
            />
            <p className="text-gray-300 text-sm ml-2">
              I agree to the{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">
                Terms & Services
              </span>
            </p>
          </div>
          {Errors.Agree && (
            <p className="text-red-500 text-sm mt-1">{Errors.Agree}</p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              w-full mt-6 py-4 text-lg
              bg-white text-black font-semibold
              rounded-xl
              hover:bg-blue-500 hover:text-white
              transition
            "
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;