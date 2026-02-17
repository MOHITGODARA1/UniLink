import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState, useRef, useEffect } from "react";
import { BsSearch, BsThreeDotsVertical, BsEmojiSmile, BsCheck2All, BsCheck2 } from "react-icons/bs";
import { IoSend, IoAttach, IoClose } from "react-icons/io5";
import { RiWifiOffLine } from "react-icons/ri";
import { MdOutlineMessage } from "react-icons/md";

// ── GRADIENTS ────────────────────────────────────────────────────────────────
const GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-500",
  "from-sky-500 to-blue-500",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-500",
];
const getGradient = (s) => GRADIENTS[s.charCodeAt(0) % GRADIENTS.length];
const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

function timeLabel(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - d) / 86400000);
  if (diffDays === 0)
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)
    return d.toLocaleDateString("en-US", { weekday: "short" });
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_CONVERSATIONS = [
  {
    _id: "1",
    user: { UserName: "Aisha Malik", ProfilePic: null, online: true },
    lastMessage: "Yeah that makes sense! Let me check the repo.",
    lastTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unread: 2,
    messages: [
      { _id: "m1", from: "them", text: "Hey! Did you push the latest changes?", time: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: true },
      { _id: "m2", from: "me",   text: "Yes just pushed to main. Check the PR.",  time: new Date(Date.now() - 1000 * 60 * 20).toISOString(), read: true },
      { _id: "m3", from: "them", text: "Got it, reviewing now 👀",                 time: new Date(Date.now() - 1000 * 60 * 15).toISOString(), read: true },
      { _id: "m4", from: "me",   text: "Let me know if anything looks off.",        time: new Date(Date.now() - 1000 * 60 * 10).toISOString(), read: true },
      { _id: "m5", from: "them", text: "Yeah that makes sense! Let me check the repo.", time: new Date(Date.now() - 1000 * 60 * 5).toISOString(), read: false },
    ],
  },
  {
    _id: "2",
    user: { UserName: "Zaid Hussain", ProfilePic: null, online: false },
    lastMessage: "See you at the hackathon bro!",
    lastTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    unread: 0,
    messages: [
      { _id: "m1", from: "them", text: "Are you joining the hackathon this weekend?", time: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), read: true },
      { _id: "m2", from: "me",   text: "100%! Already registered.",                   time: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(), read: true },
      { _id: "m3", from: "them", text: "See you at the hackathon bro!",               time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: true },
    ],
  },
  {
    _id: "3",
    user: { UserName: "Sara Khan", ProfilePic: null, online: true },
    lastMessage: "Can you share the notes from today's lecture?",
    lastTime: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    unread: 1,
    messages: [
      { _id: "m1", from: "them", text: "Hey, missed the OOP lecture today 😅",          time: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), read: true },
      { _id: "m2", from: "me",   text: "No worries, I took notes.",                      time: new Date(Date.now() - 1000 * 60 * 60 * 5.5).toISOString(), read: true },
      { _id: "m3", from: "them", text: "Can you share the notes from today's lecture?",  time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), read: false },
    ],
  },
  {
    _id: "4",
    user: { UserName: "Hamza Tariq", ProfilePic: null, online: false },
    lastMessage: "Thanks man, really helpful!",
    lastTime: new Date(Date.now() - 86400000).toISOString(),
    unread: 0,
    messages: [
      { _id: "m1", from: "me",   text: "Here's the DSA resource I was talking about.", time: new Date(Date.now() - 86400000 - 3600000).toISOString(), read: true },
      { _id: "m2", from: "them", text: "Thanks man, really helpful!",                  time: new Date(Date.now() - 86400000).toISOString(), read: true },
    ],
  },
  {
    _id: "5",
    user: { UserName: "Nadia Farooq", ProfilePic: null, online: true },
    lastMessage: "I'll send you the project brief tonight.",
    lastTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    unread: 0,
    messages: [
      { _id: "m1", from: "them", text: "Are we presenting on Wednesday?",              time: new Date(Date.now() - 86400000 * 2 - 3600000).toISOString(), read: true },
      { _id: "m2", from: "me",   text: "Yes, Wednesday 10am.",                          time: new Date(Date.now() - 86400000 * 2 - 1800000).toISOString(), read: true },
      { _id: "m3", from: "them", text: "I'll send you the project brief tonight.",      time: new Date(Date.now() - 86400000 * 2).toISOString(), read: true },
    ],
  },
];

// ── BETA TOAST ───────────────────────────────────────────────────────────────
function BetaToast({ onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-sm">
      <div className="bg-gray-900 text-white rounded-xl px-4 py-3 shadow-2xl flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
          <RiWifiOffLine className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white">Feature in Testing Phase</p>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
            We are working hard but this feature is currently in testing phase. Please be patient and we will launch this soon! 🚀
          </p>
        </div>
        <button onClick={onClose} className="flex-shrink-0 text-gray-500 hover:text-gray-300 transition-colors">
          <IoClose className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── CONVERSATION ITEM ────────────────────────────────────────────────────────
function ConversationItem({ conv, active, onClick }) {
  const u = conv.user;
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors ${
        active ? "bg-blue-50 border-r-2 border-blue-600" : "hover:bg-gray-50"
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${getGradient(u.UserName)} flex items-center justify-center text-white text-sm font-bold`}>
          {getInitials(u.UserName)}
        </div>
        {u.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-sm truncate ${active ? "font-semibold text-blue-700" : "font-semibold text-gray-900"}`}>
            {u.UserName}
          </p>
          <span className="text-xs text-gray-400 flex-shrink-0 ml-1">{timeLabel(conv.lastTime)}</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-xs text-gray-500 truncate pr-2">{conv.lastMessage}</p>
          {conv.unread > 0 && (
            <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {conv.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MESSAGE BUBBLE ───────────────────────────────────────────────────────────
function MessageBubble({ msg, isMe }) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-[72%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
        isMe
          ? "bg-gray-900 text-white rounded-br-sm"
          : "bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm"
      }`}>
        <p>{msg.text}</p>
        <div className={`flex items-center gap-1 mt-1 ${isMe ? "justify-end" : "justify-start"}`}>
          <span className={`text-xs ${isMe ? "text-gray-400" : "text-gray-400"}`}>
            {new Date(msg.time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
          {isMe && (
            msg.read
              ? <BsCheck2All className="w-3.5 h-3.5 text-blue-400" />
              : <BsCheck2 className="w-3.5 h-3.5 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
function Message() {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeId, setActiveId] = useState("1");
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [mobileView, setMobileView] = useState("list"); // "list" | "chat"
  const messagesEndRef = useRef(null);

  const activeConv = conversations.find((c) => c._id === activeId);

  const filteredConvs = conversations.filter((c) =>
    c.user.UserName.toLowerCase().includes(search.toLowerCase())
  );

  // Auto-scroll to bottom on open / new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, conversations]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setInputText("");
    setShowToast(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openChat = (id) => {
    setActiveId(id);
    setMobileView("chat");
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c._id === id ? { ...c, unread: 0 } : c))
    );
  };

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
        <p className="text-sm text-gray-500">Messages</p>
      </div>

      {/* Chat Layout */}
      <div className="flex-1 max-w-6xl md:mt-18 w-full mx-auto px-0 lg:px-6 py-0 lg:py-6">
        <div className="flex h-[calc(100vh-140px)] lg:h-[calc(100vh-120px)] bg-white lg:rounded-xl lg:border shadow-sm overflow-hidden">

          {/* ── SIDEBAR ─────────────────────────────────────────── */}
          <div className={`w-full lg:w-80 xl:w-96 flex-shrink-0 border-r border-gray-100 flex flex-col ${mobileView === "chat" ? "hidden lg:flex" : "flex"}`}>

            {/* Sidebar Header */}
            <div className="px-4 pt-4 pb-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-gray-900">Messages</h2>
                  {totalUnread > 0 && (
                    <span className="w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {totalUnread}
                    </span>
                  )}
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <BsThreeDotsVertical className="w-4 h-4" />
                </button>
              </div>
              {/* Search */}
              <div className="relative">
                <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {filteredConvs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center px-4">
                  <p className="text-sm text-gray-400">No conversations found</p>
                </div>
              ) : (
                filteredConvs.map((conv) => (
                  <ConversationItem
                    key={conv._id}
                    conv={conv}
                    active={conv._id === activeId}
                    onClick={() => openChat(conv._id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* ── CHAT PANEL ──────────────────────────────────────── */}
          <div className={`flex-1 flex flex-col min-w-0 ${mobileView === "list" ? "hidden lg:flex" : "flex"}`}>

            {activeConv ? (
              <>
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-white">
                  {/* Mobile back button */}
                  <button
                    onClick={() => setMobileView("list")}
                    className="lg:hidden text-gray-500 hover:text-gray-700 mr-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getGradient(activeConv.user.UserName)} flex items-center justify-center text-white text-xs font-bold`}>
                      {getInitials(activeConv.user.UserName)}
                    </div>
                    {activeConv.user.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{activeConv.user.UserName}</p>
                    <p className={`text-xs ${activeConv.user.online ? "text-emerald-500" : "text-gray-400"}`}>
                      {activeConv.user.online ? "Online" : "Offline"}
                    </p>
                  </div>

                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <BsThreeDotsVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 relative">
                  {activeConv.messages.map((msg) => (
                    <MessageBubble key={msg._id} msg={msg} isMe={msg.from === "me"} />
                  ))}
                  <div ref={messagesEndRef} />

                  {/* Beta Toast */}
                  {showToast && <BetaToast onClose={() => setShowToast(false)} />}
                </div>

                {/* Input Bar */}
                <div className="px-4 py-3 border-t border-gray-100 bg-white">
                  <div className="flex items-end gap-2">
                    <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors pb-2">
                      <BsEmojiSmile className="w-5 h-5" />
                    </button>
                    <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors pb-2">
                      <IoAttach className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                      <textarea
                        rows={1}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none max-h-28 overflow-y-auto"
                        style={{ lineHeight: "1.4" }}
                      />
                    </div>
                    <button
                      onClick={handleSend}
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        inputText.trim()
                          ? "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <IoSend className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-2">
                    Messaging is in beta · <span className="text-blue-500">Learn more</span>
                  </p>
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 bg-gray-50">
                <div className="w-20 h-20 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <MdOutlineMessage className="w-9 h-9 text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Your Messages</h3>
                <p className="text-sm text-gray-500">Select a conversation to start chatting.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;