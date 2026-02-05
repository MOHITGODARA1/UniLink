import { motion } from "framer-motion";

function AboutUs() {
  return (
    <section className="w-full bg-black py-24 px-6 flex justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          w-full max-w-6xl relative
          rounded-3xl p-10 md:p-14
          border border-white/10
          bg-white/5 backdrop-blur-xl
        "
      >
        {/* Soft Glow Layer */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 pointer-events-none" />

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-6 relative z-10"
        >
          <i className="ri-global-line text-6xl text-gray-400" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="
            text-4xl md:text-5xl font-semibold
            bg-linear-to-b from-white to-gray-400
            text-transparent bg-clip-text
            text-center mb-8 relative z-10
          "
        >
          About Us
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-10"
        >
          <p className="text-gray-400 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto">
            Unilink is a next-generation platform built with the vision of connecting students,
            innovators, and young professionals across universities. Our mission is to empower
            students by providing a collaborative environment where ideas can grow, talent can be
            discovered, and teams can form naturally through shared interests and academic goals.
            <br /><br />
            We believe that every student deserves access to the right network—one that encourages
            learning, creativity, and real-world problem-solving. Unilink bridges the gap between
            colleges and opportunities by offering a space where students can explore projects,
            share knowledge, and build meaningful relationships.
            <br /><br />
            Whether you are looking for a team partner, searching for inspiration, or simply wanting
            to connect with motivated individuals, Unilink is designed to support your journey.
            Our platform highlights collaboration, transparency, and growth.
            <br /><br />
            With powerful tools and a vibrant community, we aim to create an ecosystem that
            encourages innovation at every step—opening the door to endless possibilities.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AboutUs;