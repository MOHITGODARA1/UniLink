import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState } from "react";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const mockNotifications = [
  {
    _id: "1",
    type: "like",
    read: false,
    user: { UserName: "Aisha Malik", ProfilePic: null },
    message: "liked your post",
    preview: "Just finished building a full-stack app with React and Node.js...",
    createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  },
  {
    _id: "2",
    type: "comment",
    read: false,
    user: { UserName: "Zaid Hussain", ProfilePic: null },
    message: "commented on your post",
    preview: "This is really helpful, thanks for sharing!",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    _id: "3",
    type: "follow",
    read: false,
    user: { UserName: "Sara Khan", ProfilePic: null },
    message: "started following you",
    preview: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    _id: "4",
    type: "share",
    read: true,
    user: { UserName: "Hamza Tariq", ProfilePic: null },
    message: "shared your post",
    preview: "Building a REST API from scratch — a complete guide...",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    _id: "5",
    type: "like",
    read: true,
    user: { UserName: "Nadia Farooq", ProfilePic: null },
    message: "liked your post",
    preview: "DSA tips that helped me crack my first interview...",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    _id: "6",
    type: "comment",
    read: true,
    user: { UserName: "Usman Riaz", ProfilePic: null },
    message: "replied to your comment",
    preview: "Agreed! TypeScript makes large projects so much easier.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    _id: "7",
    type: "follow",
    read: true,
    user: { UserName: "Hira Baig", ProfilePic: null },
    message: "started following you",
    preview: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
];

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function getInitials(name) {
  if (!name) return "U";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const avatarColors = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-purple-600",
];

function getAvatarColor(name) {
  if (!name) return avatarColors[0];
  return avatarColors[name.charCodeAt(0) % avatarColors.length];
}

function NotificationItem({ notif, onRead, onFollow, followed }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors relative ${
        !notif.read ? "bg-blue-50/40" : "bg-white"
      }`}
      onClick={() => onRead(notif._id)}
    >
      {/* Unread dot */}
      {!notif.read && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600" />
      )}

      {/* Avatar */}
      <div className="flex-shrink-0">
        {notif.user?.ProfilePic ? (
          <img
            src={notif.user.ProfilePic}
            alt={notif.user.UserName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(
              notif.user?.UserName
            )} flex items-center justify-center text-white text-xs font-bold`}
          >
            {getInitials(notif.user?.UserName)}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 pr-6">
        <p className="text-sm text-gray-900 leading-snug">
          <span className="font-semibold">{notif.user?.UserName} </span>
          {notif.message}
        </p>
        {notif.preview && (
          <p className="text-xs text-gray-500 mt-0.5 truncate">{notif.preview}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">{timeAgo(notif.createdAt)}</p>
      </div>

      {/* Follow back */}
      {notif.type === "follow" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFollow(notif._id);
          }}
          className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
            followed[notif._id]
              ? "bg-gray-100 text-gray-500"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {followed[notif._id] ? (
            <><FaUserCheck className="w-3 h-3" /> Following</>
          ) : (
            <><FaUserPlus className="w-3 h-3" /> Follow</>
          )}
        </button>
      )}
    </div>
  );
}

function Notification() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [followed, setFollowed] = useState({});

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );

  const handleFollow = (id) =>
    setFollowed((prev) => ({ ...prev, [id]: true }));

  return (
    <div className="min-h-screen bg-gray-50">
      <UpperNavbar />
      {/* Unavailability Alert Banner */}
      <div className="w-full bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center justify-center gap-2">
        <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-amber-700 font-medium">
          Messaging is not available yet — we're working on it and will launch this feature soon!
        </p>
      </div>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 md:mt-34 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-wide">
          Uni<span className="text-blue-600 font-normal">Link</span>
        </h1>
        <p className="text-sm text-gray-500">Notifications</p>
      </div>

      <div className="max-w-2xl md:mt-18 mx-auto px-0 lg:px-6 py-0 lg:py-6">
        <div className="bg-white border-b lg:border lg:rounded-lg shadow-sm overflow-hidden">

          {/* Gradient stripe — matches Profile card */}
          <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          {/* Header */}
          <div className="px-4 lg:px-6 py-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2">
              <BsBellFill className="w-5 h-5 text-gray-700" />
              <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <IoCheckmarkDoneSharp className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BsBellFill className="w-7 h-7 text-gray-300" />
                </div>
                <p className="text-sm font-semibold text-gray-700">All caught up!</p>
                <p className="text-xs text-gray-400 mt-1 text-center">
                  No notifications yet. Check back later.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <NotificationItem
                  key={notif._id}
                  notif={notif}
                  onRead={markRead}
                  onFollow={handleFollow}
                  followed={followed}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;