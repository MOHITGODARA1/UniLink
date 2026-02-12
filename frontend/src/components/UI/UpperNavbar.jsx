import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
function UpperNavbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  // CLOSE MENU ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* DESKTOP / TABLET TOP NAVBAR */}
      <div
        ref={navRef}
        className="
          hidden md:flex
          w-full
          bg-white/80 backdrop-blur-lg
          border-b border-gray-200/50
          px-6 lg:px-8 py-4
          items-center justify-between
          fixed top-0 z-50
          shadow-sm
        "
      >
        {/* LOGO */}
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <h1 className="text-gray-900 text-xl lg:text-2xl font-bold tracking-tight">
            Uni<span className="font-light text-blue-600">Link</span>
          </h1>
        </Link>

        {/* SEARCH */}
        <div className="flex-1 flex justify-center px-6 lg:px-10">
          <div className="relative w-full max-w-xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search students, groups, events..."
              className="
                w-full pl-12 pr-4 py-2.5
                bg-gray-50
                border-2 border-gray-200
                rounded-xl
                text-sm
                text-gray-800
                placeholder-gray-400
                outline-none
                transition-all duration-200
                focus:bg-white
                focus:shadow-lg 
                hover:border-gray-300
              "
            />
          </div>
        </div>

        {/* DESKTOP MENU */}
        <nav>
          <ul className="flex items-center gap-1 lg:gap-2">
            <NavItem 
              to="/dashboard" 
              icon="ri-home-4-line" 
              label="Home" 
              active={location.pathname === "/dashboard"} 
            />
            <NavItem 
              to="/Groups-Teams" 
              icon="ri-team-line" 
              label="Groups" 
              active={location.pathname === "/Groups-Teams"} 
            />
            <NavItem 
              to="/Message" 
              icon="ri-message-3-line" 
              label="Messages" 
              active={location.pathname === "/Message"} 
            />
            <NavItem 
              to="/Event" 
              icon="ri-calendar-event-line" 
              label="Events" 
              active={location.pathname === "/Event"} 
            />
            <NavItem 
              to="/notification" 
              icon="ri-notification-3-line" 
              label="Alerts" 
              badge 
              active={location.pathname === "/notification"} 
            />
            <NavItem 
              to="/profile" 
              icon="ri-user-3-line" 
              label="Profile" 
              active={location.pathname === "/profile"} 
            />
          </ul>
        </nav>
      </div>

      {/* MOBILE BOTTOM NAVBAR */}
      <div
        className="
          md:hidden fixed bottom-0 left-0 w-full
          bg-white/90 backdrop-blur-lg
          border-t border-gray-200/50
          z-50
          shadow-lg
        "
      >
        <nav className="safe-area-padding-bottom">
          <ul className="flex justify-around items-center py-2 px-2">
            <MobileIcon 
              to="/dashboard" 
              icon="ri-home-4-line" 
              label="Home"
              active={location.pathname === "/dashboard"} 
            />
            <MobileIcon 
              to="/Groups-Teams" 
              icon="ri-team-line" 
              label="Groups"
              active={location.pathname === "/Groups-Teams"} 
            />
            <MobileIcon 
              to="/Message" 
              icon="ri-message-3-line" 
              label="Messages"
              active={location.pathname === "/Message"} 
            />
            <MobileIcon 
              to="/Event" 
              icon="ri-calendar-event-line" 
              label="Events"
              active={location.pathname === "/Event"} 
            />
            <MobileIcon 
              to="/notification" 
              icon="ri-notification-3-line" 
              label="Alerts"
              badge 
              active={location.pathname === "/notification"} 
            />
            <MobileIcon 
              to="/profile" 
              icon="ri-user-3-line" 
              label="Profile"
              active={location.pathname === "/profile"} 
            />
          </ul>
        </nav>
      </div>
    </>
  );
}

/* DESKTOP NAV ITEM - Enhanced Design */
const NavItem = ({ to, icon, label, badge, active }) => (
  <Link to={to}>
    <li
      className={`
        relative flex items-center gap-2
        px-3 lg:px-4 py-2 lg:py-2.5
        rounded-xl
        text-sm lg:text-base font-medium
        transition-all duration-200
        ${
          active
            ? "bg-gray-100 text-gray-900 shadow-sm"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }
      `}
    >
      <i className={`${icon} text-lg lg:text-xl`} />
      <span className="hidden lg:inline">{label}</span>
      {badge && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
          3
        </span>
      )}
    </li>
  </Link>
);

/* MOBILE ICON - Enhanced Design */
const MobileIcon = ({ to, icon, label, badge, active }) => (
  <Link to={to} className="flex-1">
    <li
      className={`
        relative flex flex-col items-center justify-center
        px-2 py-2
        rounded-xl
        transition-all duration-200
        ${
          active
            ? "text-gray-900"
            : "text-gray-500 active:bg-gray-100"
        }
      `}
    >
      <div className="relative">
        <i className={`${icon} text-2xl mb-0.5 transition-transform duration-200 ${active ? 'scale-110' : ''}`} />
        {/* {badge && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
            3
          </span>
        )} */}
      </div>
      <span className={`text-[10px] font-medium mt-0.5 transition-all duration-200 ${active ? 'text-gray-900' : 'text-gray-600'}`}>
        {label}
      </span>
      {active && (
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-900 rounded-full" />
      )}
    </li>
  </Link>
);

export default UpperNavbar;