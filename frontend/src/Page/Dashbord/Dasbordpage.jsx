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
  <div className="text-gray-400 py-4 text-center">
    {text || "Loading..."}
  </div>
);

function DasbordPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UpperNavbar />

      {/* MOBILE LEFT SIDEBAR (ONLY VIA DRAWER) */}
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
            absolute inset-0 bg-black/50
            transition-opacity
            ${open ? "opacity-100" : "opacity-0"}
          `}
        />

        <div
          className={`
            absolute top-0 left-0
            h-full w-[260px]
            bg-black
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

      {/* PAGE */}
      <div className="w-full min-h-screen bg-black flex justify-center">

        {/* LEFT SIDEBAR — DESKTOP ONLY */}
        <div className="hidden md:block fixed top-24 left-6 z-30">
          <Suspense fallback={<Loader text="Loading menu..." />}>
            <UniLinkSidebar />
          </Suspense>
        </div>

        {/* RIGHT SIDEBAR — DESKTOP ONLY */}
        <div className="hidden lg:block fixed top-24 right-6 z-30">
          <Suspense fallback={null}>
            <RightNavbar />
          </Suspense>
        </div>

        {/* CENTER CONTENT */}
        <div
          className="
            w-full
            max-w-[800px]
            px-4 sm:px-6
            text-white
            mt-7
            md:ml-[260px]
            lg:mr-[260px]
          "
        >
          <Suspense fallback={<Loader text="Preparing post box..." />}>
            <div className="mb-6">
              <Postuplode />
            </div>
          </Suspense>

          <Suspense fallback={<Loader text="Loading feed..." />}>
            <Feed />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default DasbordPage;