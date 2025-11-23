function Sponsor() {
  return (
    <>
      <div className="h-auto w-full bg-black flex justify-center items-center">
        <div className="rounded-xl w-[90%] bg-white/5 border border-gray-700 mt-12 mb-12 py-14 px-8">

          {/* Icon */}
          <div className="flex justify-center mb-3">
            <i className="ri-flashlight-line text-6xl text-gray-400"></i>
          </div>

          {/* Tagline */}
          <p className="text-center text-green-400 text-sm tracking-wide font-medium uppercase">
            Premium Sponsorship Opportunity
          </p>

          {/* Heading */}
          <h1 className="text-5xl font-semibold bg-linear-to-b from-white to-gray-400 text-transparent bg-clip-text text-center mt-2">
            Become a Sponsor
          </h1>

          {/* Paragraph */}
          <p className="text-center text-gray-300 mt-4 text-md leading-relaxed max-w-3xl mx-auto">
            Partner with Unilink to empower thousands of students.  
            Showcase your brand, support innovation, and connect directly  
            with ambitious young talent across universities.
          </p>

          

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-12">
            <button className="px-7 py-3 rounded-lg bg-white text-black font-medium hover:scale-105 transition">
              Learn More
            </button>
            <button className="px-7 py-3 rounded-lg border border-gray-500 text-white font-medium hover:scale-105 transition">
              Contact Sales
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Sponsor;
