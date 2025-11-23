function Footer() {
  return (
    <>
      <footer className="w-full bg-black py-12 px-6 text-gray-300 border-t border-gray-700">

        {/* Top Section */}
        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-3">
              <i className="ri-global-line text-4xl text-blue-400"></i>
              <h2 className="text-2xl font-semibold text-white">Unilink</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Unilink connects students, innovators, and creators across universities. 
              Build your network, join communities, and grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Community</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-5 mt-3">
              <i className="ri-facebook-circle-fill text-3xl hover:scale-125 transition cursor-pointer text-blue-500"></i>
              <i className="ri-instagram-line text-3xl hover:scale-125 transition cursor-pointer text-pink-500"></i>
              <i className="ri-linkedin-box-fill text-3xl hover:scale-125 transition cursor-pointer text-blue-400"></i>
              <i className="ri-twitter-x-fill text-3xl hover:scale-125 transition cursor-pointer"></i>
              <i className="ri-youtube-fill text-3xl hover:scale-125 transition cursor-pointer text-red-500"></i>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full border-t border-gray-700 mt-10"></div>

        {/* Bottom Section */}
        <p className="text-center text-sm text-gray-500 mt-5">
          © {new Date().getFullYear()} Unilink. All rights reserved.
        </p>

      </footer>
    </>
  );
}

export default Footer;
