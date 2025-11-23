import { Link } from "react-router-dom";
function SignUp() {
  return (
    <>
      <div className="w-full h-screen bg-black flex justify-center items-center px-6">
        <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-white transition">
          <i className="ri-arrow-left-line mr-1"></i> Home
        </Link>

        {/* MAIN BOX */}
        <div className="w-[90%] max-w-5xl bg-white/5 border border-gray-700 rounded-2xl backdrop-blur-md p-10 
                        grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* LEFT SIDE — 40% width → col-span-2 */}
          <div className="flex flex-col justify-center items-center text-center px-6 md:col-span-2">
            <img src="./logo.png" alt="logo" className="h-36 mb-4" />

            <h1 className="text-4xl font-semibold bg-linear-to-b from-white to-gray-400 text-transparent bg-clip-text">
              Join Unilink
            </h1>

            <p className="text-gray-400 mt-3 text-lg leading-relaxed">
              Create your Unilink account and connect with thousands of students.
              Build your profile, join communities, and explore university-wide collaborations.
            </p>
          </div>

          {/* RIGHT SIDE — 60% width → col-span-3 */}
          <div className="flex flex-col justify-center md:col-span-3">

            {/* Username + Email Row */}
            <div className="flex gap-4 w-full">
              {/* Username */}
              <div className="flex-1">
                <label className="text-gray-300 text-sm ml-1">Username</label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-400 transition"
                  placeholder="Enter username"
                />
              </div>

              {/* Email */}
              <div className="flex-1">
                <label className="text-gray-300 text-sm ml-1">Email</label>
                <input
                  type="email"
                  className="w-full mt-2 px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-400 transition"
                  placeholder="Enter email"
                />
              </div>
            </div>

            {/* University */}
            <div className="mt-4">
              <label className="text-gray-300 text-sm ml-1">University</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-400 transition"
                placeholder="Enter your university"
              />
            </div>

            {/* Password + Confirm */}
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label className="text-gray-300 text-sm ml-1">Password</label>
                <input
                  type="password"
                  className="w-full mt-2 px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-400 transition"
                  placeholder="Create password"
                />
              </div>

              <div className="flex-1">
                <label className="text-gray-300 text-sm ml-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full mt-2 px-4 py-3 bg-white/10 border border-gray-700 rounded-lg text-white outline-none focus:border-blue-400 transition"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            {/* Agree Terms */}
            <div className="flex items-center mt-5">
              <input type="checkbox" className="mr-2" />
              <p className="text-gray-400 text-sm">
                I agree to the{" "}
                <span className="text-blue-400 cursor-pointer hover:underline">
                  Terms & Services
                </span>
              </p>
            </div>

            {/* Create Account Button */}
            <button className="w-full mt-6 py-3 h-11 bg-white text-black rounded-lg font-medium hover:scale-105 transition">
              Create Account
            </button>

            {/* OR Separator */}
            <div className="w-full flex items-center my-4">
              <div className="grow h-px bg-gray-700"></div>
              <span className="px-3 text-gray-400 text-sm">OR</span>
              <div className="grow h-px bg-gray-700"></div>
            </div>

            {/* Google Signup */}
            <button className="w-full py-3 border border-gray-600 text-white rounded-lg font-medium flex justify-center items-center gap-2 hover:scale-105 transition">
              <i className="ri-google-fill text-xl text-red-400"></i>
              Sign Up with Google
            </button>

            {/* Already Have Account */}
            <p className="text-center text-gray-400 mt-4 text-sm">
              Already have an account?{" "}
              <Link to="/Login">
                <span className="text-blue-400 cursor-pointer hover:underline">
                  Login
                </span>
              </Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
