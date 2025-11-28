import { Link } from "react-router-dom";

function UpperNavbar() {
  return (
    <div className="w-full bg-black text-white px-6 py-4 flex items-center justify-between shadow-md h-18">

      {/* LEFT — LOGO */}
      <div className="flex items-center">
        <img 
          src="./logo.png"
          alt="logo"
          className="h-17 w-16 object-contain"
        />
      </div>

      {/* CENTER — SEARCH BAR */}
      <div className="hidden md:flex flex-1 justify-center px-10">
        <div className="relative w-full max-w-md">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-700 rounded-full
                       text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* RIGHT — NAV MENU */}
      <ul className="flex items-center gap-6 text-sm font-medium">

        <Link to="/dashboard">
          <li className="cursor-pointer hover:text-white text-gray-300 transition flex items-center gap-1">
            <i className="ri-home-4-line text-md text-gray-300"></i> Home
          </li>
        </Link>

        <Link to="/Study-Resourse">
          <li className="cursor-pointer hover:text-white text-gray-300 transition flex items-center gap-1">
            <i className="ri-book-open-line text-md text-gray-300"></i> Study Resources
          </li>
        </Link>

        <Link to="/Groups-Teams">
          <li className="cursor-pointer hover:text-white text-gray-300 transition flex items-center gap-1">
            <i className="ri-team-line text-md text-gray-300"></i> Groups & Team
          </li>
        </Link>

        <Link to="/Message">
          <li className="cursor-pointer hover:text-white text-gray-300 transition flex items-center gap-1">
            <i className="ri-message-3-line text-md text-gray-300"></i> Messages
          </li>
        </Link>

        <Link to="/Event">
          <li className="cursor-pointer hover:text-white text-gray-300 transition flex items-center gap-1">
            <i className="ri-calendar-event-line text-md text-gray-300"></i> Events
          </li>
        </Link>

        <Link to="/notification">
          <li className="cursor-pointer hover:text-white text-gray-300 transition flex items-center gap-1 relative">
            <i className="ri-notification-3-line text-md text-gray-300"></i> Notification
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              3
            </span>
          </li>
        </Link>

        <Link to="/profile">
          <li className="cursor-pointer hover:text-white text-gray-300 transition flex items-center gap-1">
            <i className="ri-user-3-line text-md text-gray-300"></i> Profile
          </li>
        </Link>
      </ul>

    </div>
  );
}

export default UpperNavbar;
