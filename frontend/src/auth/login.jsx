import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

function Login() {
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div 
        className={`w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-white/20 transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* LEFT PANEL - Enhanced Visual Design */}
        <div className="hidden lg:flex flex-col justify-center px-8 xl:px-16 py-12 xl:py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 border-4 border-white rounded-lg rotate-45"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            {/* Logo */}
            <div className="mb-8 inline-block">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">UL</span>
                </div>
                <span className="text-white font-semibold text-lg">UniLink</span>
              </div>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
              Your Campus,
              <br />
              Connected.
            </h1>
            
            <p className="text-blue-100 text-base xl:text-lg leading-relaxed mb-8">
              Join thousands of verified students building meaningful connections across campuses worldwide.
            </p>

            {/* Feature Pills */}
            <div className="space-y-3">
              {[
                { icon: "🎓", text: "Verified Students Only" },
                { icon: "🔒", text: "Secure & Private" },
                { icon: "💬", text: "Real-time Collaboration" }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 text-white/90 transform transition-all duration-300 hover:translate-x-2"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Login Form */}
        <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 max-h-screen overflow-y-auto">
          
          {/* Mobile Header */}
          <div className="lg:hidden mb-6 text-center">
            <h1 className="text-gray-900 text-2xl lg:text-2xl font-bold tracking-tight">
              Uni<span className="font-light text-blue-600">Link</span>
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              Connect with your university community
            </p>
          </div>

          {/* Welcome Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={LoginCheck} className="space-y-4 sm:space-y-5">
            
            {/* Email/Username Input */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="student@university.edu"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  className={`
                    w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-xl
                    bg-gray-50
                    border-2 ${Errors.Name ? 'border-red-300' : 'border-gray-200'}
                    text-gray-800
                    placeholder-gray-400
                    text-sm
                    outline-none
                    transition-all duration-200
                    focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-100
                    hover:border-gray-300
                  `}
                />
              </div>
              {Errors.Name && (
                <div className="flex items-center gap-1 mt-2 text-red-500 text-xs animate-shake">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{Errors.Name}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="group">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`
                    w-full pl-11 sm:pl-12 pr-12 py-3 sm:py-3.5 rounded-xl
                    bg-gray-50
                    border-2 ${Errors.Password ? 'border-red-300' : 'border-gray-200'}
                    text-gray-800
                    placeholder-gray-400
                    text-sm
                    outline-none
                    transition-all duration-200
                    focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-100
                    hover:border-gray-300
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {Errors.Password && (
                <div className="flex items-center gap-1 mt-2 text-red-500 text-xs animate-shake">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{Errors.Password}</span>
                </div>
              )}
            </div>

            {/* Server Error */}
            {Errors.server && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-shake">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700 font-medium">{Errors.server}</p>
                </div>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base
                transition-all duration-300 transform
                ${loading 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0"
                }
                disabled:transform-none
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log in to your account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6 sm:my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="px-3 sm:px-4 text-gray-400 text-xs sm:text-sm font-medium">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Social Login */}
          <button
            disabled
            className="
              w-full py-3 sm:py-3.5 rounded-xl
              bg-white
              border-2 border-gray-200
              text-gray-400
              font-medium text-sm sm:text-base
              cursor-not-allowed
              flex items-center justify-center gap-2 sm:gap-3
              transition-all duration-200
            "
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            University Email (Coming Soon)
          </button>

          {/* Sign Up Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-600 text-xs sm:text-sm">
              New to UniLink?{" "}
              <Link 
                to="/SignUp" 
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6 sm:mt-8">
            © 2024 UniLink. All rights reserved.
          </p>
        </div>
      </div>

      {/* Add custom animations to your global CSS or tailwind.config.js */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Login;