import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Feature() {
  return (
    <>
      <section className="w-full bg-black py-20 overflow-hidden">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl font-semibold bg-linear-to-b from-white to-gray-400 text-transparent bg-clip-text">
            Powerful Features
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Everything you need to succeed and collaborate seamlessly
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mt-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: "ri-team-line",
              title: "Team Collaboration",
              desc: "Connect with teammates, share tasks, and work smarter together.",
            },
            {
              icon: "ri-graduation-cap-line",
              title: "Student Profiles",
              desc: "Explore verified student profiles and build meaningful connections.",
            },
            {
              icon: "ri-lightbulb-flash-line",
              title: "Idea Sharing",
              desc: "Share project ideas and find partners with matching skills.",
            },
            {
              icon: "ri-group-line",
              title: "Community Groups",
              desc: "Join university communities and collaborate on projects.",
            },
            {
              icon: "ri-chat-voice-line",
              title: "Smart Communication",
              desc: "Real-time chats and voice-enabled messaging.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={card}
              whileHover={{ y: -8, scale: 1.03 }}
              className="
                relative bg-white/5 border border-gray-700/60
                rounded-2xl p-8 backdrop-blur-xl
                hover:border-gray-500 transition
              "
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

              <i className={`${item.icon} text-4xl text-white`} />
              <h2 className="text-white text-xl font-semibold mt-6">
                {item.title}
              </h2>
              <p className="text-gray-400 mt-3 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gray-700" />
    </>
  );
}

export default Feature;