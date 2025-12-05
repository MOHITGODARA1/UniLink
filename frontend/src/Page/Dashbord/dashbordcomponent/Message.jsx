import UpperNavbar from "../../../components/UI/UpperNavbar";

function Message() {
  return (
    <>
      <UpperNavbar />

      <div className="w-full h-[calc(100vh-80px)] bg-black flex items-center justify-center">
        <h1 className="text-transparent bg-clip-text bg-linear-to-r from-gray-400 to-white text-4xl font-bold">
          Coming Soon
        </h1>
      </div>
    </>
  );
}

export default Message;
