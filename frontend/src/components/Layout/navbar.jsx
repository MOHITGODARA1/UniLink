import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="w-full h-16 bg-black flex items-center overflow-hidden px-4">
        
        {/* Left Section */}
        <div className="w-1/3">
            <img src="/logo.png" alt="Logo" className="h-23 cursor-pointer" />
          
        </div>

        {/* Middle Section */}
        <div className="w-1/3">
          <ul className="w-full flex justify-evenly items-center text-gray-400 text-sm">
            <li><Link to="/feature" className="hover:text-white">Feature</Link></li>
            <li><Link to="/community" className="hover:text-white">Community</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/sponsors" className="hover:text-white">Sponsors</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="w-1/3 flex justify-end gap-4">
          <Link to="/Login">
            <button className="bg-white/10 border border-gray-400 w-20 h-9 rounded-lg cursor-pointer hover:scale-110 transition-all duration-300 text-gray-200">
              Sign in
            </button>
          </Link>

          <Link to="/SignUp">
            <button className="bg-white/10 border border-gray-400 w-20 h-9 rounded-lg cursor-pointer hover:scale-110 transition-all duration-300 text-gray-200">
              Sign up
            </button>
          </Link>
        </div>

      </div>

      {/* Divider */}
      <div className="bg-gray-500 h-px w-full"></div>
    </>
  );
}

export default Navbar;
