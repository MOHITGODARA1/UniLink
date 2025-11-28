import UpperNavbar from "../../components/UI/UpperNavbar";
import UniLinkSidebar from "../../components/UI/leftNavbar";
import Postuplode from "./dashbordcomponent/PostUplod";
import Feed from "./dashbordcomponent/feed";

function DasbordPage() {
  return (
    <>
      {/* TOP NAVBAR */}
      <UpperNavbar />

      {/* MAIN WRAPPER */}
      <div className="w-full min-h-screen bg-black flex">

        {/* FIXED LEFT SIDEBAR */}
        <div className="fixed top-20 left-0">
          <UniLinkSidebar />
        </div>

        {/* RIGHT CONTENT AREA */}
        <div
          className="
            flex-1 
            ml-80  
            p-6  
              
            min-h-screen  
            text-white
          "
        >
          {/* POST UPLOAD BOX */}
          <Postuplode />

          {/* FEED SECTION */}
          <div>
            <Feed />
          </div>
        </div>
      </div>
    </>
  );
}

export default DasbordPage;
