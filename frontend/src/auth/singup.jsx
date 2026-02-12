import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div 
        className={`w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-white/20 transition-all duration-1000 my-8 ${
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
              Start Your
              <br />
              Journey Today.
            </h1>
            
            <p className="text-blue-100 text-base xl:text-lg leading-relaxed mb-8">
              Join a thriving community of verified students. Connect, collaborate, and create lasting relationships across campuses.
            </p>

            {/* Feature Pills */}
            <div className="space-y-3">
              {[
                { icon: "⚡", text: "Quick & Easy Setup" },
                { icon: "🎓", text: "Verified Student Network" },
                { icon: "🌐", text: "Connect Globally" }
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

        {/* RIGHT PANEL - Sign Up Form */}
        <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
          
          {/* Mobile Header */}
          <div className="lg:hidden mb-6 text-center">
            <h1 className="text-gray-900 text-2xl lg:text-2xl font-bold tracking-tight">
              Uni<span className="font-light text-blue-600">Link</span>
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              Join your university community
            </p>
          </div>

          {/* Welcome Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Create your account
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Takes less than a minute to get started
            </p>
          </div>

          <form onSubmit={registerUser} className="space-y-4 sm:space-y-5">
            
            {/* USERNAME INPUT */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Choose a username"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={`
                    w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-xl
                    bg-gray-50
                    border-2 ${Errors.UserName ? 'border-red-300' : 'border-gray-200'}
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
              {Errors.UserName && (
                <div className="flex items-center gap-1 mt-2 text-red-500 text-xs animate-shake">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{Errors.UserName}</span>
                </div>
              )}
            </div>

            {/* EMAIL INPUT */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="student@university.edu"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`
                    w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-xl
                    bg-gray-50
                    border-2 ${Errors.Email ? 'border-red-300' : 'border-gray-200'}
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
              {Errors.Email && (
                <div className="flex items-center gap-1 mt-2 text-red-500 text-xs animate-shake">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{Errors.Email}</span>
                </div>
              )}
            </div>

            {/* UNIVERSITY INPUT WITH AUTOCOMPLETE */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search your university"
                  value={College}
                  onChange={(e) => searchCollege(e.target.value)}
                  className={`
                    w-full pl-11 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-xl
                    bg-gray-50
                    border-2 ${Errors.College ? 'border-red-300' : 'border-gray-200'}
                    text-gray-800
                    placeholder-gray-400
                    text-sm
                    outline-none
                    transition-all duration-200
                    focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-100
                    hover:border-gray-300
                  `}
                />

                {/* Autocomplete Dropdown */}
                {Suggestions.length > 0 && (
                  <ul className="absolute z-20 w-full mt-2 bg-white border-2 border-blue-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    {Suggestions.map((s, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          setCollege(s.name);
                          setSuggestions([]);
                        }}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <p className="text-gray-900 font-medium text-sm">{s.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {s.city}, {s.state}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {Errors.College && (
                <div className="flex items-center gap-1 mt-2 text-red-500 text-xs animate-shake">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{Errors.College}</span>
                </div>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
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

            {/* CONFIRM PASSWORD INPUT */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={ConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`
                    w-full pl-11 sm:pl-12 pr-12 py-3 sm:py-3.5 rounded-xl
                    bg-gray-50
                    border-2 ${Errors.ConfirmPassword ? 'border-red-300' : 'border-gray-200'}
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  {showConfirmPassword ? (
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
              {Errors.ConfirmPassword && (
                <div className="flex items-center gap-1 mt-2 text-red-500 text-xs animate-shake">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{Errors.ConfirmPassword}</span>
                </div>
              )}
            </div>

            {/* TERMS & CONDITIONS */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <input
                type="checkbox"
                checked={Agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
              />
              <label className="text-sm text-gray-600 leading-relaxed cursor-pointer" onClick={() => setAgree(!Agree)}>
                I agree to UniLink's{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {Errors.Agree && (
              <div className="flex items-center gap-1 text-red-500 text-xs animate-shake">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{Errors.Agree}</span>
              </div>
            )}

            {/* SERVER ERROR */}
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

            {/* CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              disabled={!isFormValid || Loading}
              className={`
                w-full py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base
                transition-all duration-300 transform
                ${!isFormValid || Loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0"
                }
                disabled:transform-none
              `}
            >
              {Loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating your account...
                </span>
              ) : (
                "Create my account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-600 text-xs sm:text-sm">
              Already have an account?{" "}
              <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6 sm:mt-8">
            © 2024 UniLink. All rights reserved.
          </p>
        </div>
      </div>

      {/* Add custom animations */}
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

export default SignUp;