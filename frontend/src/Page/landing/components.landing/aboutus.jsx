function AboutUs() {
  return (
    <>
      <div className="w-full h-auto bg-black py-16 px-6 flex justify-center">
        <div className="w-[85%]  rounded-xl p-10">

          {/* Global Icon */}
          <div className="flex justify-center mb-4">
            <i className="ri-global-line text-6xl text-gray-400 "></i>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-semibold bg-linear-to-b from-white to-gray-400 text-transparent bg-clip-text text-center mb-5">
            About Us
          </h1>

          {/* Paragraph */}
          <p className="text-gray-400 text-md leading-relaxed text-center">
            Unilink is a next-generation platform built with the vision of connecting students,
            innovators, and young professionals across universities. Our mission is to empower
            students by providing a collaborative environment where ideas can grow, talent can be
            discovered, and teams can form naturally through shared interests and academic goals.
            We believe that every student deserves access to the right network—one that encourages
            learning, creativity, and real-world problem-solving. <br /><br />
            Unilink bridges the gap between
            colleges and opportunities by offering a space where students can explore projects,
            share knowledge, and build meaningful relationships. Whether you are looking for a team
            partner, searching for inspiration, or simply wanting to connect with motivated
            individuals, Unilink is designed to support your journey. Our platform highlights
            collaboration, transparency, and growth, ensuring that every user feels valued and
            supported. With powerful tools, smart features, and a vibrant community, we aim to
            create an ecosystem that encourages innovation at every step. From academic assistance
            to project building and career networking, Unilink opens the door to endless
            possibilities. Together, we are shaping the future of student collaboration—one
            connection at a time.
          </p>

        </div>
      </div>
    </>
  );
}

export default AboutUs;
