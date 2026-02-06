import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function UpperNavbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // CLOSE MENU ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={navRef}
      className="w-full bg-black text-white px-4 md:px-6 py-4 flex items-center justify-between shadow-md relative z-50"
    >
      {/* LEFT — HAMBURGER (ABSOLUTE) */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-2xl absolute left-4"
      >
        ☰
      </button>

      {/* LOGO — CENTER LEFT */}
      <div className="flex items-center ml-8 md:ml-0">
        <img
          src="./logo.png"
          alt="logo"
          className="h-14 w-auto md:h-21 md:w-12 object-contain"
        />
      </div>

      {/* SEARCH (DESKTOP) */}
      <div className="hidden md:flex flex-1 justify-center px-10">
        <div className="relative w-full max-w-md">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* DESKTOP MENU */}
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
        <NavItem to="/dashboard" icon="ri-home-4-line" label="Home" />
        <NavItem to="/Study-Resourse" icon="ri-book-open-line" label="Study Resources" />
        <NavItem to="/Groups-Teams" icon="ri-team-line" label="Groups & Team" />
        <NavItem to="/Message" icon="ri-message-3-line" label="Messages" />
        <NavItem to="/Event" icon="ri-calendar-event-line" label="Events" />
        <NavItem to="/notification" icon="ri-notification-3-line" label="Notification" badge />
        <NavItem to="/profile" icon="ri-user-3-line" label="Profile" />
      </ul>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden absolute top-full left-0 w-full
          bg-black border-t border-gray-800
          transition-all duration-300
          ${open ? "block" : "hidden"}
        `}
      >
        <ul className="flex flex-col px-6 py-4 gap-4 text-sm">
          <MobileItem to="/dashboard" icon="ri-home-4-line" label="Home" setOpen={setOpen} />
          <MobileItem to="/Study-Resourse" icon="ri-book-open-line" label="Study Resources" setOpen={setOpen} />
          <MobileItem to="/Groups-Teams" icon="ri-team-line" label="Groups & Team" setOpen={setOpen} />
          <MobileItem to="/Message" icon="ri-message-3-line" label="Messages" setOpen={setOpen} />
          <MobileItem to="/Event" icon="ri-calendar-event-line" label="Events" setOpen={setOpen} />
          <MobileItem to="/notification" icon="ri-notification-3-line" label="Notification" setOpen={setOpen} badge />
          <MobileItem to="/profile" icon="ri-user-3-line" label="Profile" setOpen={setOpen} />
        </ul>
      </div>
    </div>
  );
}

/* DESKTOP ITEM */
const NavItem = ({ to, icon, label, badge }) => (
  <Link to={to}>
    <li className="cursor-pointer hover:text-white text-gray-300 transition flex items-center gap-1 relative">
      <i className={`${icon} text-md`} />
      {label}
      {badge && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
          3
        </span>
      )}
    </li>
  </Link>
);

/* MOBILE ITEM */
const MobileItem = ({ to, icon, label, badge, setOpen }) => (
  <Link to={to} onClick={() => setOpen(false)}>
    <li className="flex items-center gap-3 text-gray-300 hover:text-white transition">
      <i className={`${icon} text-lg`} />
      {label}
      {badge && (
        <span className="ml-auto bg-red-500 text-white text-xs px-2 rounded-full">
          3
        </span>
      )}
    </li>
  </Link>
);

export default UpperNavbar;