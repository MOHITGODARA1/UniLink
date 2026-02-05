import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  const stats = [
    { value: "10K+", label: "Active Students" },
    { value: "500+", label: "Universities" },
    { value: "2K+", label: "Teams Formed" },
  ];

  return (
    <>
      <section className="bg-black w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
        
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="bg-white/10 border border-white/20 px-5 py-1.5 rounded-full">
            <p className="text-gray-200 text-sm tracking-wide">
              ● Empowering Student Connections
            </p>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            text-5xl md:text-6xl lg:text-7xl font-semibold
            bg-linear-to-b from-white to-gray-400
            text-transparent bg-clip-text
            text-center
          "
        >
          The Platform for Students
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-400 text-base md:text-lg mt-6 text-center max-w-2xl"
        >
          Unilink is a powerful platform connecting university students to collaborate,
          share ideas, and build their future together.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex gap-6 mt-12"
        >
          <Link to="/Login">
            <button className="
              px-7 py-2.5 rounded-xl bg-white text-black font-medium
              hover:scale-105 hover:shadow-lg transition
            ">
              Get Started
            </button>
          </Link>

          <button className="
            px-7 py-2.5 rounded-xl border border-gray-500 text-white font-medium
            hover:bg-white/5 hover:scale-105 transition
          ">
            Join Community
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.6 },
            },
          }}
          className="flex gap-14 md:gap-20 mt-20 flex-wrap justify-center"
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-center"
            >
              <p className="text-white text-4xl md:text-5xl font-semibold">
                {item.value}
              </p>
              <p className="text-gray-400 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gray-700" />
    </>
  );
}

export default HeroSection;