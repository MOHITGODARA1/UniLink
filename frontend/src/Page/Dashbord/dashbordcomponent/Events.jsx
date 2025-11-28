import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState } from "react";

function Event() {
  const [showRegister, setShowRegister] = useState(false);
  const [showEventView, setShowEventView] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 17 Fully Described Events
  const [events] = useState([
    {
      id: 1,
      title: "Hackathon 3.0",
      type: "Technical",
      price: "Free",
      date: "3 Feb 2025",
      desc: "48-hour hackathon where students build real-time solutions using AI, web, ML or blockchain.",
    },
    {
      id: 2,
      title: "Robotics Expo",
      type: "Tech Exhibition",
      price: "₹100",
      date: "10 Feb 2025",
      desc: "Showcase of autonomous robots, drone projects, and mechanical builds from engineering clubs.",
    },
    {
      id: 3,
      title: "AI & ML Seminar",
      type: "Seminar",
      price: "Free",
      date: "12 Feb 2025",
      desc: "Industry experts discuss Deep Learning, LLMs, Prompt Engineering & future AI careers.",
    },
    {
      id: 4,
      title: "Cultural Fest 2025",
      type: "Cultural",
      price: "₹150",
      date: "20 Feb 2025",
      desc: "Music, dance competitions, food stalls and fun events for all departments.",
    },
    {
      id: 5,
      title: "Photography Contest",
      type: "Competition",
      price: "Free",
      date: "28 Feb 2025",
      desc: "Submit your best nature, macro or portrait photographs and win exciting prizes.",
    },
    {
      id: 6,
      title: "Startup Pitch Event",
      type: "Entrepreneurship",
      price: "Free",
      date: "1 Mar 2025",
      desc: "Pitch your startup idea to judges and win seed funding + mentorship.",
    },
    {
      id: 7,
      title: "Sports Meet 2025",
      type: "Sports",
      price: "₹50",
      date: "3 Mar 2025",
      desc: "Athletics, cricket, football and indoor game tournaments.",
    },
    {
      id: 8,
      title: "Resume Building Workshop",
      type: "Workshop",
      price: "Free",
      date: "5 Mar 2025",
      desc: "Learn professional resume design, projects presentation, and interview preparation.",
    },
    {
      id: 9,
      title: "Cyber Security Bootcamp",
      type: "Training",
      price: "₹200",
      date: "7 Mar 2025",
      desc: "Hands-on workshop covering ethical hacking basics, Kali Linux & network security.",
    },
    {
      id: 10,
      title: "Debate Competition",
      type: "Competition",
      price: "Free",
      date: "9 Mar 2025",
      desc: "Inter-department debate on tech, politics and innovation topics.",
    },
    {
      id: 11,
      title: "Marathon Run 2025",
      type: "Outdoor",
      price: "₹100",
      date: "12 Mar 2025",
      desc: "5 km, 10 km marathon run for promoting fitness and health awareness.",
    },
    {
      id: 12,
      title: "Gaming Championship",
      type: "E-Sports",
      price: "₹120",
      date: "15 Mar 2025",
      desc: "Valorant, BGMI, and FIFA tournaments with exciting rewards.",
    },
    {
      id: 13,
      title: "Art Exhibition",
      type: "Cultural",
      price: "Free",
      date: "17 Mar 2025",
      desc: "Painting, sketches, sculptures & digital art made by talented students.",
    },
    {
      id: 14,
      title: "Career Guidance Talk",
      type: "Seminar",
      price: "Free",
      date: "19 Mar 2025",
      desc: "HRs and professionals guide students on placements, internships & job strategies.",
    },
    {
      id: 15,
      title: "Logic & Puzzle Quiz",
      type: "Competition",
      price: "Free",
      date: "22 Mar 2025",
      desc: "A competitive quiz event that tests intelligence, reasoning and logic.",
    },
    {
      id: 16,
      title: "Web Dev Bootcamp",
      type: "Workshop",
      price: "₹300",
      date: "25 Mar 2025",
      desc: "Practical web development bootcamp covering React, APIs & authentication.",
    },
    {
      id: 17,
      title: "Business Case Study Competition",
      type: "Management",
      price: "Free",
      date: "28 Mar 2025",
      desc: "Teams solve real-world business cases with innovative strategic solutions.",
    },
  ]);

  return (
    <>
      <UpperNavbar />

      <div className="w-full min-h-screen bg-black px-6 py-10">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white">University Events</h1>
              <p className="text-gray-400">Explore amazing events happening on campus.</p>
            </div>

            <button
              onClick={() => setShowRegister(true)}
              className="bg-blue-600 px-5 py-2 rounded-xl text-white font-semibold hover:bg-blue-500 transition"
            >
              + Register Event
            </button>
          </div>

          {/* EVENT LIST */}
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div
                key={ev.id}
                onClick={() => {
                  setSelectedEvent(ev);
                  setShowEventView(true);
                }}
                className="bg-white/5 p-6 border border-gray-800 rounded-2xl shadow-lg cursor-pointer hover:bg-white/10 transition"
              >
                <h3 className="text-white text-lg font-semibold">{ev.title}</h3>
                <p className="text-gray-400 text-sm">{ev.type}</p>

                <p className="text-blue-400 text-sm mt-2">📅 {ev.date}</p>
                <p className="text-green-400 text-sm">💰 {ev.price}</p>

                <p className="text-gray-500 text-xs mt-3">Tap to view →</p>
              </div>
            ))}
          </div>

          {/* EVENT VIEW MODAL */}
          {showEventView && selectedEvent && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-6">
              <div className="w-[80%] h-[80%] bg-[#141414] border border-gray-700 rounded-2xl p-8 overflow-y-auto relative">

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setShowEventView(false)}
                  className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 transition"
                >
                  ✕
                </button>

                <h2 className="text-3xl font-bold text-white">{selectedEvent.title}</h2>
                <p className="text-blue-400 mt-2 text-lg">Type: {selectedEvent.type}</p>
                <p className="text-green-400 mt-1">Price: {selectedEvent.price}</p>
                <p className="text-gray-400 mt-1">Date: {selectedEvent.date}</p>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white">Event Details</h3>
                  <p className="text-gray-300 mt-2 leading-relaxed">
                    {selectedEvent.desc}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* REGISTER EVENT POPUP */}
          {showRegister && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-6">
              <div className="w-[80%] max-w-xl bg-[#161616] border border-gray-700 rounded-2xl p-8 relative">

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setShowRegister(false)}
                  className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 transition"
                >
                  ✕
                </button>

                <h2 className="text-xl font-semibold text-white mb-4">Register New Event</h2>

                <input
                  type="text"
                  placeholder="Event Title"
                  className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 mb-3"
                />

                <input
                  type="text"
                  placeholder="Event Type"
                  className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 mb-3"
                />

                <input
                  type="text"
                  placeholder="Price (Free / ₹100)"
                  className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 mb-3"
                />

                <input
                  type="date"
                  className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 mb-3"
                />

                <textarea
                  rows="3"
                  placeholder="Description..."
                  className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 mb-3"
                />

                <button className="w-full bg-blue-600 py-3 rounded-xl text-white font-semibold hover:bg-blue-500 transition">
                  Submit Event
                </button>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Event;
