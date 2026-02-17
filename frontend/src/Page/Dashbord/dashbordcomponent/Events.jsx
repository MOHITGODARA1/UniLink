import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState } from "react";
import { BsCalendarEvent, BsPlus, BsClock, BsGeoAlt, BsPeople } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const categoryColors = {
  Workshop:   { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500"   },
  Seminar:    { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500" },
  Hackathon:  { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  Social:     { bg: "bg-emerald-50",text: "text-emerald-700",dot: "bg-emerald-500"},
  Sports:     { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  Other:      { bg: "bg-gray-100",  text: "text-gray-700",   dot: "bg-gray-400"   },
};

const categories = Object.keys(categoryColors);

const mockEvents = [
  {
    _id: "1",
    title: "Full-Stack Web Dev Workshop",
    category: "Workshop",
    date: "2026-03-05",
    time: "10:00 AM",
    location: "CS Block, Room 204",
    description: "Hands-on session covering React, Node.js and MongoDB. Bring your laptop and get ready to build!",
    organizer: "Zaid Hussain",
    attendees: 34,
    going: false,
  },
  {
    _id: "2",
    title: "AI & The Future of Jobs — Seminar",
    category: "Seminar",
    date: "2026-03-10",
    time: "2:00 PM",
    location: "Auditorium A",
    description: "Industry speakers discuss how AI is reshaping careers and what students should prepare for.",
    organizer: "Sara Khan",
    attendees: 120,
    going: true,
  },
  {
    _id: "3",
    title: "UniLink Hackathon 2026",
    category: "Hackathon",
    date: "2026-03-22",
    time: "9:00 AM",
    location: "Innovation Hub",
    description: "48-hour hackathon open to all students. Build something amazing, win prizes and meet top recruiters.",
    organizer: "Tech Society",
    attendees: 86,
    going: false,
  },
  {
    _id: "4",
    title: "Inter-Department Cricket Tournament",
    category: "Sports",
    date: "2026-03-28",
    time: "8:00 AM",
    location: "University Ground",
    description: "Annual cricket tournament between departments. Register your team before March 20th.",
    organizer: "Sports Committee",
    attendees: 52,
    going: false,
  },
  {
    _id: "5",
    title: "End-of-Semester Social Night",
    category: "Social",
    date: "2026-04-15",
    time: "7:00 PM",
    location: "Student Center",
    description: "Chill out with your fellow students! Food, games, and good vibes to wrap up the semester.",
    organizer: "Student Union",
    attendees: 200,
    going: true,
  },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function getDaysLeft(dateStr) {
  const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "Passed";
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `In ${diff} days`;
}

function getDaysLeftColor(dateStr) {
  const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "text-gray-400";
  if (diff <= 3) return "text-red-500";
  if (diff <= 7) return "text-orange-500";
  return "text-emerald-600";
}

// ── ADD EVENT MODAL ─────────────────────────────────────────────────────────
function AddEventModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "", category: "Workshop", date: "", time: "",
    location: "", description: "",
  });
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())       e.title       = "Title is required";
    if (!form.date)               e.date        = "Date is required";
    if (!form.time)               e.time        = "Time is required";
    if (!form.location.trim())    e.location    = "Location is required";
    if (!form.description.trim()) e.description = "Description is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({
      ...form,
      _id: Date.now().toString(),
      organizer: "You",
      attendees: 1,
      going: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Gradient stripe */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        {/* Modal header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <BsCalendarEvent className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-semibold text-gray-900">Add New Event</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Event Title *</label>
            <input
              type="text"
              placeholder="e.g. DSA Workshop for Beginners"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={`w-full text-sm px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.title ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const c = categoryColors[cat];
                const active = form.category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => set("category", cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      active
                        ? `${c.bg} ${c.text} border-current`
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => set("date", e.target.value)}
                className={`w-full text-sm px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.date ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Time *</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
                className={`w-full text-sm px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.time ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Location *</label>
            <input
              type="text"
              placeholder="e.g. CS Block, Room 101"
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className={`w-full text-sm px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.location ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              rows={3}
              placeholder="What's this event about?"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={`w-full text-sm px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none ${
                errors.description ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Post Event
          </button>
        </div>
      </div>
    </div>
  );
}

// ── EVENT CARD ───────────────────────────────────────────────────────────────
function EventCard({ event, onToggleGoing }) {
  const c = categoryColors[event.category] || categoryColors.Other;
  const daysLeft = getDaysLeft(event.date);
  const daysColor = getDaysLeftColor(event.date);

  return (
    <div className="bg-white border-b lg:border lg:rounded-lg shadow-sm overflow-hidden">
      {/* Top accent line in category color */}
      <div className={`h-1 w-full ${c.dot}`} />

      <div className="p-4">
        {/* Category + days left */}
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
            {event.category}
          </span>
          <span className={`text-xs font-semibold ${daysColor}`}>{daysLeft}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 leading-snug mb-2">
          {event.title}
        </h3>

        {/* Meta */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <BsCalendarEvent className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{formatDate(event.date)} · {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <BsGeoAlt className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
          {event.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <BsPeople className="w-3.5 h-3.5" />
            <span><span className="font-semibold text-gray-700">{event.attendees}</span> going</span>
          </div>
          <button
            onClick={() => onToggleGoing(event._id)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors ${
              event.going
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {event.going ? "✓ Going" : "I'm Going"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────
function Event() {
  const [events, setEvents] = useState(mockEvents);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", ...categories];

  const filtered =
    activeFilter === "All"
      ? events
      : events.filter((e) => e.category === activeFilter);

  const upcomingCount = events.filter(
    (e) => Math.ceil((new Date(e.date) - new Date()) / 86400000) >= 0
  ).length;

  const toggleGoing = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e._id === id
          ? { ...e, going: !e.going, attendees: e.going ? e.attendees - 1 : e.attendees + 1 }
          : e
      )
    );
  };

  const addEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

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
      {showModal && (
        <AddEventModal onClose={() => setShowModal(false)} onAdd={addEvent} />
      )}

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 md:mt-34 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-wide">
          Uni<span className="text-blue-600 font-normal">Link</span>
        </h1>
        <p className="text-sm text-gray-500">Events</p>
      </div>

      <div className="max-w-6xl md:mt-18 mx-auto px-0 lg:px-6 py-0 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">

          {/* ── LEFT SIDEBAR ─────────────────────────────────────── */}
          <div className="lg:col-span-1">

            {/* Add Event CTA Card */}
            <div className="bg-white border-b lg:border lg:rounded-lg shadow-sm overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
              <div className="px-5 py-5">
                <div className="flex items-center gap-2 mb-1">
                  <BsCalendarEvent className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base font-semibold text-gray-900">University Events</h2>
                </div>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Discover workshops, seminars, hackathons and more happening at your campus.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <BsPlus className="w-5 h-5" />
                  Add an Event
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white border-t lg:border lg:rounded-lg shadow-sm mt-0 lg:mt-4">
              <div className="px-5 py-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Overview</h3>
                <div className="flex justify-around text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Total</p>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Upcoming</p>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {events.filter((e) => e.going).length}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Going</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter — desktop */}
            <div className="hidden lg:block bg-white border lg:rounded-lg shadow-sm mt-4">
              <div className="px-5 py-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MdOutlineCategory className="w-4 h-4 text-gray-500" />
                  Filter by Category
                </h3>
                <div className="space-y-1">
                  {filters.map((f) => {
                    const c = f !== "All" ? categoryColors[f] : null;
                    const active = activeFilter === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {c && <span className={`w-2 h-2 rounded-full ${c.dot}`} />}
                        {!c && <span className="w-2 h-2 rounded-full bg-gray-300" />}
                        {f}
                        <span className="ml-auto text-xs text-gray-400">
                          {f === "All"
                            ? events.length
                            : events.filter((e) => e.category === f).length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── EVENTS LIST ─────────────────────────────────────── */}
          <div className="lg:col-span-2 mt-0 lg:mt-0">

            {/* Mobile filter chips */}
            <div className="lg:hidden bg-white border-b px-4 py-3 flex gap-2 overflow-x-auto">
              {filters.map((f) => {
                const active = activeFilter === f;
                const c = f !== "All" ? categoryColors[f] : null;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                      active
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-600 border-gray-200"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            {/* Section heading */}
            <div className="bg-white border-b lg:border-0 px-4 lg:px-0 py-3 lg:py-0 lg:mb-4">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <BsCalendarEvent className="w-4 h-4" />
                {activeFilter === "All" ? "All Events" : `${activeFilter} Events`}
                <span className="text-sm font-normal text-gray-500">({filtered.length})</span>
              </h2>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white border lg:rounded-lg shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BsCalendarEvent className="w-7 h-7 text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">No events found</h3>
                <p className="text-sm text-gray-500 mb-4">Be the first to add one!</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <BsPlus className="w-4 h-4" /> Add Event
                </button>
              </div>
            ) : (
              <div className="space-y-0 lg:space-y-4">
                {filtered.map((event) => (
                  <EventCard key={event._id} event={event} onToggleGoing={toggleGoing} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Event;