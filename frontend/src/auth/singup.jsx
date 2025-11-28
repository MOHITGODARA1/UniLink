import { Link,useNavigate  } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";

function SignUp() {
  const [UserName, SetUsername] = useState("");
  const [Email, SetEmail] = useState("");
  const [Collage, setCollage] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const [Errors, setErrors] = useState({});

  const registerUser = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!UserName.trim()) newErrors.UserName = "Username is required!";
    if (!Email.trim()) newErrors.Email = "Email is required!";
    if (!Collage.trim()) newErrors.Collage = "University is required!";
    if (!Password.trim()) newErrors.Password = "Password is required!";
    if (!ConfirmPassword.trim()) newErrors.ConfirmPassword = "Confirm Password is required!";
    if (Password && ConfirmPassword && Password !== ConfirmPassword)
      newErrors.ConfirmPassword = "Passwords do not match!";
    if (!Agree) newErrors.Agree = "You must accept Terms & Services.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const data = { UserName, Email, Collage, Password };

      await Axios.post(
        `${import.meta.env.VITE_API}/user-Register`,
        data
      );
      localStorage.setItem("UserName",UserName)
      navigate("/Skill-Select");
      SetUsername("");
      SetEmail("");
      setCollage("");
      setPassword("");
      setConfirmPassword("");
      setAgree(false);

    } catch (error) {
      if (error.response?.data) {
        const serverError = error.response.data;

        let updatedErrors = {};

        if (serverError.field === "email") {
          updatedErrors.Email = "Email already exists!";
        }

        if (serverError.field === "username") {
          updatedErrors.UserName = "Username is already taken!";
        }

        // fallback general message
        if (!serverError.field) {
          updatedErrors.general = serverError.message || "Something went wrong";
        }

        setErrors(updatedErrors);
      }
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-black flex justify-center items-center px-6 overflow-hidden relative">

        <Link
          to="/"
          className="absolute top-6 left-6 text-gray-400 hover:text-white transition flex items-center gap-2"
        >
          <i className="ri-arrow-left-line"></i>
          <span>Home</span>
        </Link>

        <div className="
          w-[95%] max-w-5xl 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          rounded-3xl shadow-xl 
          grid grid-cols-1 md:grid-cols-[40%_60%]
          overflow-hidden
        ">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center items-center text-center p-10 bg-white/5 border-r border-gray-700">

            <img src="./logo.png" alt="logo" className="h-32 mb-6 drop-shadow-xl" />

            <h1 className="text-4xl font-bold bg-linear-to-b from-white to-gray-400 text-transparent bg-clip-text">
              Join Unilink
            </h1>

            <p className="text-gray-300 text-lg mt-4 leading-relaxed px-4">
              Create your Unilink account and start connecting with students across the world.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-center p-10">

            <h2 className="text-3xl font-semibold text-white mb-6">Create Account</h2>

            {/* General Error Message */}
            {Errors.general && (
              <p className="text-red-500 text-sm mb-3">{Errors.general}</p>
            )}

            {/* USERNAME + EMAIL */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <label className="text-gray-300 text-sm ml-1">Username</label>
                <input
                  type="text"
                  value={UserName}
                  onChange={(e) => SetUsername(e.target.value)}
                  className="
                    w-full mt-2 px-4 py-3 
                    bg-white/5 border border-gray-700 
                    rounded-xl text-white 
                    outline-none 
                    focus:border-blue-400 focus:bg-white/10 
                    transition
                  "
                  placeholder="Enter username"
                />
                {Errors.UserName && <p className="text-red-500 text-sm mt-1">{Errors.UserName}</p>}
              </div>

              <div className="flex-1">
                <label className="text-gray-300 text-sm ml-1">Email</label>
                <input
                  type="email"
                  value={Email}
                  onChange={(e) => SetEmail(e.target.value)}
                  className="
                    w-full mt-2 px-4 py-3 
                    bg-white/5 border border-gray-700 
                    rounded-xl text-white 
                    outline-none 
                    focus:border-blue-400 focus:bg-white/10 
                    transition
                  "
                  placeholder="Enter email"
                />
                {Errors.Email && <p className="text-red-500 text-sm mt-1">{Errors.Email}</p>}
              </div>
            </div>

            {/* UNIVERSITY */}
            <div className="mt-5">
              <label className="text-gray-300 text-sm ml-1">University</label>
              <input
                type="text"
                value={Collage}
                onChange={(e) => setCollage(e.target.value)}
                className="
                  w-full mt-2 px-4 py-3 
                  bg-white/5 border border-gray-700 
                  rounded-xl text-white 
                  outline-none 
                  focus:border-blue-400 focus:bg-white/10 
                  transition
                "
                placeholder="Enter your university"
              />
              {Errors.Collage && <p className="text-red-500 text-sm mt-1">{Errors.Collage}</p>}
            </div>

            {/* PASSWORD + CONFIRM */}
            <div className="flex flex-col md:flex-row gap-5 mt-5">
              <div className="flex-1">
                <label className="text-gray-300 text-sm ml-1">Password</label>
                <input
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full mt-2 px-4 py-3 
                    bg-white/5 border border-gray-700 
                    rounded-xl text-white 
                    outline-none 
                    focus:border-blue-400 focus:bg-white/10 
                    transition
                  "
                  placeholder="Create password"
                />
                {Errors.Password && <p className="text-red-500 text-sm mt-1">{Errors.Password}</p>}
              </div>

              <div className="flex-1">
                <label className="text-gray-300 text-sm ml-1">Confirm Password</label>
                <input
                  type="password"
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="
                    w-full mt-2 px-4 py-3 
                    bg-white/5 border border-gray-700 
                    rounded-xl text-white 
                    outline-none 
                    focus:border-blue-400 focus:bg-white/10 
                    transition
                  "
                  placeholder="Confirm password"
                />
                {Errors.ConfirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{Errors.ConfirmPassword}</p>
                )}
              </div>
            </div>

            {/* TERMS */}
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                checked={Agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mr-2 w-4 h-4"
              />
              <p className="text-gray-300 text-sm">
                I agree to the{" "}
                <span className="text-blue-400 cursor-pointer hover:underline">
                  Terms & Services
                </span>
              </p>
            </div>
            {Errors.Agree && <p className="text-red-500 text-sm mt-1">{Errors.Agree}</p>}

            {/* SUBMIT BUTTON */}
            <button
              className="
                w-full mt-8 py-3 h-12 
                bg-white text-black font-semibold 
                rounded-xl shadow-md 
                hover:bg-blue-400 hover:text-white 
                hover:scale-[1.03] 
                active:scale-95 
                transition duration-200
              "
              onClick={(e) => registerUser(e)}
            >
              Create Account
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
