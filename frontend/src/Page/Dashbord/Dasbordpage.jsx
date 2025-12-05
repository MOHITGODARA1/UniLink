import UpperNavbar from "../../components/UI/UpperNavbar";
import UniLinkSidebar from "../../components/UI/leftNavbar";
import Postuplode from "./dashbordcomponent/PostUplod";
import Feed from "./dashbordcomponent/feed";
import RightNavbar from "../../components/UI/rightNavbar";

function DasbordPage() {
  return (
    <>
      <UpperNavbar />

      {/* MAIN WRAPPER */}
      <div className="w-full min-h-screen bg-black flex relative">

        {/* LEFT SIDEBAR */}
        <div className="fixed top-24 left-6 z-30">
          <UniLinkSidebar />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="top-24 right-6 z-30">
          <RightNavbar />
        </div>

        {/* CENTER CONTENT */}
        <div className="flex-1 px-6 text-white 
                        max-w-[800px] 
                        ml-68
                        mt-7 
                       ">

          {/* POST UPLOAD CARD */}
          <div className="mb-6">
            <Postuplode />
          </div>

          {/* FEED */}
          <Feed />
        </div>

      </div>
    </>
  );
}

export default DasbordPage;
