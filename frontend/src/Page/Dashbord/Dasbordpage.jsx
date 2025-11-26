import UpperNavbar from "../../components/UI/UpperNavbar";
import UniLinkSidebar from "../../components/UI/leftNavbar";
import Postuplode from "./dashbordcomponent/PostUplod";
import Feed from "./dashbordcomponent/feed";
function DasbordPage() {
  return (
    <>
      {/* NAVBAR */}
      <UpperNavbar />

      {/* MAIN DASHBOARD AREA */}
      <div className="w-full min-h-screen bg-black flex">

        {/* FIXED LEFT SIDEBAR */}
        <UniLinkSidebar />

        {/* RIGHT CONTENT AREA */}
        <div className="flex-1 ml-80 p-6">

          {/* RIGHT TOP POST UPLOAD */}
          <div className="flex flex-col">
            <Postuplode />
            <Feed />
          </div>
          
          
        </div>
      </div>
    </>
  );
}

export default DasbordPage;
