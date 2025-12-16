function Connect() {
  return (
    <>
      <div className="w-full h-auto bg-black py-16 px-6 flex justify-center">

        <div className="w-[85%] rounded-xl p-10 text-center
          bg-white/5 backdrop-blur-xl border border-white/10
          animate-glow">

          {/* Floating Icon */}
          <div className="flex justify-center mb-4">
            <i className="ri-share-forward-line text-6xl text-gray-400 animate-float"></i>
          </div>

          {/* Heading */}
          <h1 className="
            text-4xl font-semibold 
            bg-linear-to-b from-white to-gray-400 text-transparent bg-clip-text
            animate-slideUp
          ">
            Connect With Us
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-lg mt-3 animate-fadeIn">
            Join our community on social media
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-8 mt-10">

            <i className="ri-facebook-circle-fill text-4xl text-blue-500 
              hover:scale-125 transition duration-300 cursor-pointer animate-stagger-1"></i>

            <i className="ri-instagram-line text-4xl text-pink-500 
              hover:scale-125 transition duration-300 cursor-pointer animate-stagger-2"></i>

            <i className="ri-linkedin-box-fill text-4xl text-blue-400 
              hover:scale-125 transition duration-300 cursor-pointer animate-stagger-3"></i>

            <i className="ri-twitter-x-fill text-4xl text-gray-300 
              hover:scale-125 transition duration-300 cursor-pointer animate-stagger-4"></i>

            <i className="ri-youtube-fill text-4xl text-red-500 
              hover:scale-125 transition duration-300 cursor-pointer animate-stagger-5"></i>

          </div>

        </div>

      </div>
    </>
  );
}

export default Connect;
