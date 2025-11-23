import { Link } from "react-router-dom";
function HeroSection() {

  const stats = [
    { value: "10K+", label: "Active Students" },
    { value: "500+", label: "Universities" },
    { value: "2K+", label: "Teams Formed" },
  ];

  return (
    <>
      <section className="bg-black w-full h-auto pb-20 overflow-x-hidden flex flex-col items-center pt-20">

        {/* Tagline */}
        <div>
          <div className="bg-white/10 border border-gray-400 w-[350px] h-8 rounded-2xl flex justify-center items-center">
            <p className="text-gray-200">● Empowering Student Connection</p>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-6xl font-semibold mt-6 bg-linear-to-b from-white to-gray-400 text-transparent bg-clip-text text-center px-4">
          The Platform for Students
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-sm mt-4 text-center max-w-xl px-4">
          Unilink is a powerful platform connecting university students to collaborate,
          share ideas, and build their future together.
        </p>

        {/* Buttons */}
        <div className="flex gap-5 mt-13">
          <Link to="/Login">
            <button className="w-35 h-10 rounded-lg bg-white text-black font-medium hover:scale-105 transition">
              Get Started
            </button>
          </Link>
          <button className="w-35 h-10 rounded-lg border border-gray-500 text-white font-medium hover:scale-105 transition">
            Join Community
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-16 md:gap-20 mt-15 flex-wrap justify-center">
          {stats.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-white text-4xl font-medium">{item.value}</p>
              <p className="text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>

      </section>

      <div className="h-px w-full bg-gray-700"></div>
    </>
  );
}

export default HeroSection;
