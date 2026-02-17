import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState } from "react";
import { BsPeople, BsPlus, BsSearch, BsShieldCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { FaDiscord, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";

// ── PLATFORM CONFIG ──────────────────────────────────────────────────────────
const PLATFORMS = {
  Discord: {
    icon: FaDiscord,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    label: "Join on Discord",
    placeholder: "https://discord.gg/xxxxxxx",
  },
  WhatsApp: {
    icon: FaWhatsapp,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    label: "Join on WhatsApp",
    placeholder: "https://chat.whatsapp.com/xxxxxxx",
  },
  Telegram: {
    icon: FaTelegram,
    color: "text-sky-500",
    bg: "bg-sky-50",
    border: "border-sky-200",
    label: "Join on Telegram",
    placeholder: "https://t.me/xxxxxxx",
  },
};

// ── CATEGORY COLORS ──────────────────────────────────────────────────────────
const CAT_COLORS = {
  Technology: { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-500"    },
  Arts:       { bg: "bg-pink-50",    text: "text-pink-700",    dot: "bg-pink-500"    },
  Sports:     { bg: "bg-orange-50",  text: "text-orange-700",  dot: "bg-orange-500"  },
  Science:    { bg: "bg-teal-50",    text: "text-teal-700",    dot: "bg-teal-500"    },
  Business:   { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-500"   },
  Social:     { bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-500"  },
  Other:      { bg: "bg-gray-100",   text: "text-gray-700",    dot: "bg-gray-400"    },
};
const CATEGORIES = Object.keys(CAT_COLORS);

// ── AVATAR GRADIENTS ─────────────────────────────────────────────────────────
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
const getGradient = (str) => GRADIENTS[str.charCodeAt(0) % GRADIENTS.length];
const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

// ── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_CLUBS = [
  {
    _id: "1", name: "Coding Club", category: "Technology",
    description: "Build projects, solve DSA problems and grow together as developers. Weekly coding sessions every Thursday.",
    members: 128, joined: false, verified: true,
    links: { Discord: "https://discord.gg/codingclub", WhatsApp: "https://chat.whatsapp.com/codingclub" },
  },
  {
    _id: "2", name: "AI & Robotics Society", category: "Technology",
    description: "Exploring machine learning, computer vision and robotics. Open to all curious minds.",
    members: 74, joined: true, verified: true,
    links: { Telegram: "https://t.me/airoboticsuni", Discord: "https://discord.gg/airobots" },
  },
  {
    _id: "3", name: "Photography Club", category: "Arts",
    description: "From phone shots to DSLRs — share your perspective with fellow shutterbugs on campus.",
    members: 53, joined: false, verified: false,
    links: { WhatsApp: "https://chat.whatsapp.com/photoclubuni" },
  },
  {
    _id: "4", name: "Cricket Team", category: "Sports",
    description: "Inter-department and inter-university cricket. Practice sessions Mon & Wed at the university ground.",
    members: 38, joined: false, verified: true,
    links: { WhatsApp: "https://chat.whatsapp.com/cricketteam" },
  },
  {
    _id: "5", name: "Astronomy Society", category: "Science",
    description: "Stargazing nights, telescope sessions and talks on the latest in space exploration.",
    members: 41, joined: false, verified: false,
    links: { Discord: "https://discord.gg/astrosoc", Telegram: "https://t.me/astrosociety" },
  },
  {
    _id: "6", name: "Entrepreneurship Cell", category: "Business",
    description: "Connect with founders, pitch ideas and learn from mentors. Monthly startup pitch nights.",
    members: 89, joined: true, verified: true,
    links: { WhatsApp: "https://chat.whatsapp.com/ecell", Discord: "https://discord.gg/ecell" },
  },
  {
    _id: "7", name: "Drama & Theatre Club", category: "Arts",
    description: "Auditions open! We perform twice a semester. No experience needed — just passion for the stage.",
    members: 29, joined: false, verified: false,
    links: { WhatsApp: "https://chat.whatsapp.com/dramaclub" },
  },
  {
    _id: "8", name: "UniLink Community", category: "Social",
    description: "The official student community for UniLink users. Share feedback, make friends and stay connected.",
    members: 312, joined: true, verified: true,
    links: { Discord: "https://discord.gg/unilink", WhatsApp: "https://chat.whatsapp.com/unilink", Telegram: "https://t.me/unilink" },
  },
];

// ── CREATE CLUB MODAL ────────────────────────────────────────────────────────
function CreateClubModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "", category: "Technology", description: "",
    Discord: "", WhatsApp: "", Telegram: "",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Club name is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.Discord && !form.WhatsApp && !form.Telegram)
      e.links = "Add at least one group link (Discord, WhatsApp or Telegram)";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const links = {};
    if (form.Discord)  links.Discord  = form.Discord;
    if (form.WhatsApp) links.WhatsApp = form.WhatsApp;
    if (form.Telegram) links.Telegram = form.Telegram;
    onCreate({
      _id: Date.now().toString(),
      name: form.name, category: form.category,
      description: form.description,
      members: 1, joined: true, verified: false, links,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <BsPeople className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-semibold text-gray-900">Create a Club</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4 max-h-[72vh] overflow-y-auto">

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Club Name *</label>
            <input
              type="text"
              placeholder="e.g. Web Dev Society"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={`w-full text-sm px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.name ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Category *</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const c = CAT_COLORS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => set("category", cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      form.category === cat
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

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              rows={3}
              placeholder="What is this club about? Who can join?"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={`w-full text-sm px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition ${errors.description ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Platform Links */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Group Links <span className="text-gray-400 font-normal">(add at least one)</span>
            </label>
            <div className="space-y-2">
              {Object.entries(PLATFORMS).map(([platform, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <div key={platform} className={`flex items-center gap-2.5 border rounded-lg px-3 py-2 ${cfg.border} ${cfg.bg}`}>
                    <Icon className={`w-4 h-4 flex-shrink-0 ${cfg.color}`} />
                    <input
                      type="url"
                      placeholder={cfg.placeholder}
                      value={form[platform]}
                      onChange={(e) => set(platform, e.target.value)}
                      className="flex-1 text-xs bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                );
              })}
            </div>
            {errors.links && <p className="text-xs text-red-500 mt-1">{errors.links}</p>}
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
            Create Club
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CLUB CARD ────────────────────────────────────────────────────────────────
function ClubCard({ club, onToggleJoin }) {
  const c = CAT_COLORS[club.category] || CAT_COLORS.Other;

  return (
    <div className="bg-white border-b lg:border lg:rounded-lg shadow-sm overflow-hidden group">
      <div className={`h-1 w-full ${c.dot}`} />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          {/* Club avatar */}
          <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${getGradient(club.name)} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
            {getInitials(club.name)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm font-semibold text-gray-900 leading-tight">{club.name}</h3>
              {club.verified && (
                <BsShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" title="Verified Club" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                {club.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <BsPeople className="w-3 h-3" />
                {club.members} members
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
          {club.description}
        </p>

        {/* Platform links */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(club.links).map(([platform, url]) => {
            const cfg = PLATFORMS[platform];
            if (!cfg) return null;
            const Icon = cfg.icon;
            return (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all hover:shadow-sm ${cfg.bg} ${cfg.color} ${cfg.border}`}
                title={cfg.label}
              >
                <Icon className="w-3.5 h-3.5" />
                {platform}
                <HiExternalLink className="w-3 h-3 opacity-60" />
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            {club.verified ? "✓ Official Club" : "Student Community"}
          </span>
          <button
            onClick={() => onToggleJoin(club._id)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors ${
              club.joined
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {club.joined ? "✓ Joined" : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────
function GroupTeam() {
  const [clubs, setClubs] = useState(MOCK_CLUBS);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = clubs.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const toggleJoin = (id) => {
    setClubs((prev) =>
      prev.map((c) =>
        c._id === id
          ? { ...c, joined: !c.joined, members: c.joined ? c.members - 1 : c.members + 1 }
          : c
      )
    );
  };

  const createClub = (newClub) => {
    setClubs((prev) => [newClub, ...prev]);
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
        <CreateClubModal onClose={() => setShowModal(false)} onCreate={createClub} />
      )}

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 md:mt-34 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-wide">
          Uni<span className="text-blue-600 font-normal">Link</span>
        </h1>
        <p className="text-sm text-gray-500">Groups & Clubs</p>
      </div>

      <div className="max-w-6xl md:mt-18 mx-auto px-0 lg:px-6 py-0 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">

          {/* ── LEFT SIDEBAR ─────────────────────────────────────── */}
          <div className="lg:col-span-1">

            {/* CTA Card */}
            <div className="bg-white border-b lg:border lg:rounded-lg shadow-sm overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
              <div className="px-5 py-5">
                <div className="flex items-center gap-2 mb-1">
                  <BsPeople className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base font-semibold text-gray-900">Groups & Clubs</h2>
                </div>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                  Join official university clubs or create your own community. Connect via Discord, WhatsApp or Telegram.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <BsPlus className="w-5 h-5" />
                  Create a Club
                </button>
              </div>
            </div>


          </div>

          {/* ── CLUBS LIST ───────────────────────────────────────── */}
          <div className="lg:col-span-2">

            {/* Search bar */}
            <div className="bg-white border-b lg:border lg:rounded-lg shadow-sm px-4 py-3 mb-0 lg:mb-4">
              <div className="relative">
                <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clubs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Section heading */}
            <div className="bg-white border-b lg:border-0 px-4 lg:px-0 py-3 lg:py-0 lg:mb-4">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <BsPeople className="w-4 h-4" />
                All Clubs
                <span className="text-sm font-normal text-gray-500">({filtered.length})</span>
              </h2>
            </div>

            {/* Cards */}
            {filtered.length === 0 ? (
              <div className="bg-white border lg:rounded-lg shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BsPeople className="w-7 h-7 text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">No clubs found</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {search ? `No results for "${search}"` : "Be the first to create one!"}
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <BsPlus className="w-4 h-4" /> Create Club
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-0 lg:gap-4">
                {filtered.map((club) => (
                  <ClubCard key={club._id} club={club} onToggleJoin={toggleJoin} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupTeam;