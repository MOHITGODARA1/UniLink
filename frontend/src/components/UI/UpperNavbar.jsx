import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

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
          bg-white
          border-b border-gray-200
          px-6 py-4
          items-center justify-between
          fixed top-0 z-50
        "
      >
        {/* LOGO */}
        <h1 className="text-black text-2xl font-semibold tracking-wide">
          Uni<span className="text-gray-700">link</span>
        </h1>

        {/* SEARCH */}
        <div className="flex-1 flex justify-center px-10">
          <div className="relative w-full max-w-md">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="
                w-full pl-10 pr-4 py-2
                bg-gray-50
                border border-gray-200
                rounded-lg
                text-sm
                text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:border-gray-400
              "
            />
          </div>
        </div>

        {/* DESKTOP MENU */}
        <ul className="flex items-center gap-2 text-sm font-medium">
          <NavItem to="/dashboard" icon="ri-home-4-line" label="Home" active={location.pathname === "/dashboard"} />
          <NavItem to="/Groups-Teams" icon="ri-team-line" label="Groups" active={location.pathname === "/Groups-Teams"} />
          <NavItem to="/Message" icon="ri-message-3-line" label="Messages" active={location.pathname === "/Message"} />
          <NavItem to="/Event" icon="ri-calendar-event-line" label="Events" active={location.pathname === "/Event"} />
          <NavItem to="/notification" icon="ri-notification-3-line" label="Notification" badge />
          <NavItem to="/profile" icon="ri-user-3-line" label="Profile" active={location.pathname === "/profile"} />
        </ul>
      </div>

      {/* MOBILE BOTTOM NAVBAR */}
      <div
        className="
          md:hidden fixed bottom-0 left-0 w-full
          bg-white
          border-t border-gray-200
          z-50
        "
      >
        <ul className="flex justify-around py-3">
          <MobileIcon to="/dashboard" icon="ri-home-4-line" active={location.pathname === "/dashboard"} />
          <MobileIcon to="/Groups-Teams" icon="ri-team-line" active={location.pathname === "/Groups-Teams"} />
          <MobileIcon to="/Message" icon="ri-message-3-line" active={location.pathname === "/Message"} />
          <MobileIcon to="/Event" icon="ri-calendar-event-line" active={location.pathname === "/Event"} />
          <MobileIcon to="/notification" icon="ri-notification-3-line" badge />
          <MobileIcon to="/profile" icon="ri-user-3-line" active={location.pathname === "/profile"} />
        </ul>
      </div>
    </>
  );
}

/* DESKTOP NAV ITEM (RightNavbar Style) */
const NavItem = ({ to, icon, label, badge, active }) => (
  <Link to={to}>
    <li
      className={`
        flex items-center gap-2
        px-4 py-2
        rounded-lg
        transition
        ${
          active
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }
      `}
    >
      <i className={`${icon} text-lg`} />
      {label}
      {badge && (
        <span className="ml-2 bg-red-500 text-white text-xs px-1 rounded-full">
          3
        </span>
      )}
    </li>
  </Link>
);

/* MOBILE ICON */
const MobileIcon = ({ to, icon, badge, active }) => (
  <Link to={to}>
    <li
      className={`
        relative p-2
        transition
        ${
          active
            ? "text-gray-900"
            : "text-gray-500 hover:text-gray-800"
        }
      `}
    >
      <i className={`${icon} text-xl`} />
      {badge && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
          3
        </span>
      )}
    </li>
  </Link>
);

export default UpperNavbar;