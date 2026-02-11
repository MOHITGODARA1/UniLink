import { lazy, Suspense, useState } from "react";
import UpperNavbar from "../../components/UI/UpperNavbar";

// LAZY LOAD
const UniLinkSidebar = lazy(() =>
  import("../../components/UI/leftNavbar")
);
const RightNavbar = lazy(() =>
  import("../../components/UI/rightNavbar")
);
const Postuplode = lazy(() =>
  import("./dashbordcomponent/PostUplod")
);
const Feed = lazy(() =>
  import("./dashbordcomponent/feed")
);

const Loader = ({ text }) => (
  <div className="text-gray-400 py-6 text-center text-sm">
    {text || "Loading..."}
  </div>
);

function DasbordPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP NAVBAR */}
      <UpperNavbar />

      {/* MOBILE LEFT SIDEBAR DRAWER */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-all
          ${open ? "visible" : "invisible"}
        `}
      >
        <div
          onClick={() => setOpen(false)}
          className={`
            absolute inset-0 bg-black/40
            transition-opacity
            ${open ? "opacity-100" : "opacity-0"}
          `}
        />

        <div
          className={`
            absolute top-0 left-0
            h-full w-[260px]
            bg-white
            border-r border-gray-200
            p-4
            transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Suspense fallback={<Loader text="Loading menu..." />}>
            <UniLinkSidebar />
          </Suspense>
        </div>
      </div>

      {/* PAGE LAYOUT */}
      <div className="w-full min-h-screen bg-gray-50 pt-5 sm:pt-24">

        <div className="relative max-w-[1400px] mx-auto flex justify-center">

          {/* LEFT SIDEBAR — DESKTOP */}
          <div className="hidden md:block fixed top-24 left-4 lg:left-6 z-30">
            <Suspense fallback={<Loader text="Loading menu..." />}>
              <UniLinkSidebar />
            </Suspense>
          </div>

          {/* RIGHT SIDEBAR — DESKTOP */}
          <div className="hidden lg:block fixed top-24 right-4 lg:right-6 z-30">
            <Suspense fallback={null}>
              <RightNavbar />
            </Suspense>
          </div>

          {/* CENTER FEED */}
          <div
            className="
              w-full
              max-w-[720px]
              px-3 sm:px-4
              md:ml-[260px]
              lg:mr-[300px]
            "
          >
            <div className="mb-4 sm:mb-5">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-wide">
                Uni<span className="text-gray-500 font-normal">Link</span>
              </h1>
              <p className="text-sm text-gray-500">
                Connect with students from your college
              </p>
            </div>
            {/* POST UPLOAD */}
            <Suspense fallback={<Loader text="Preparing post box..." />}>
              <div className="mb-5 sm:mb-6">
                <Postuplode />
              </div>
            </Suspense>

            {/* FEED */}
            <Suspense fallback={<Loader text="Loading feed..." />}>
              <Feed />
            </Suspense>
          </div>

        </div>
      </div>
    </>
  );
}

export default DasbordPage;