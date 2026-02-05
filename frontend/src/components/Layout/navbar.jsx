import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Feature", path: "#" },
    { name: "Community", path: "#" },
    { name: "About", path: "#" },
    { name: "Sponsors", path: "#" },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-16 bg-black px-6 flex items-center border-b border-gray-500/40 relative z-50"
      >
        {/* Logo */}
        <div className="flex-1">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-22 cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-1 justify-center gap-10 text-gray-400 text-sm">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive ? "text-white" : "hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex flex-1 justify-end gap-4">
          <Link to="/Login">
            <button className="bg-white/10 border border-gray-400 px-5 py-1.5 rounded-lg text-gray-200 text-sm hover:scale-105 transition">
              Sign in
            </button>
          </Link>
          <Link to="/SignUp">
            <button className="bg-white/10 border border-gray-400 px-5 py-1.5 rounded-lg text-gray-200 text-sm hover:scale-105 transition">
              Sign up
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300 text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black border-b border-gray-500/40 overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-6 text-gray-400 text-sm">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="hover:text-white transition"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              <div className="flex gap-4 pt-4">
                <Link to="/Login">
                  <button className="bg-white/10 border border-gray-400 px-5 py-1.5 rounded-lg text-gray-200 text-sm">
                    Sign in
                  </button>
                </Link>
                <Link to="/SignUp">
                  <button className="bg-white/10 border border-gray-400 px-5 py-1.5 rounded-lg text-gray-200 text-sm">
                    Sign up
                  </button>
                </Link>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;