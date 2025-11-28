import UpperNavbar from "../../../components/UI/UpperNavbar";

function Notification() {

  const notifications = [
    {
      id: 1,
      type: "like",
      icon: "ri-heart-3-fill text-pink-500",
      text: "Amit Kumar liked your post.",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "comment",
      icon: "ri-chat-3-fill text-blue-400",
      text: "Priya commented on your post: “Nice work!”",
      time: "10 min ago",
    },
    {
      id: 3,
      type: "follow",
      icon: "ri-user-follow-fill text-purple-400",
      text: "Rohit started following you.",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "system",
      icon: "ri-notification-2-fill text-yellow-400",
      text: "Your profile is 80% complete. Add more skills!",
      time: "3 hours ago",
    },
    {
      id: 5,
      type: "message",
      icon: "ri-message-3-fill text-green-400",
      text: "Neha sent you a new message.",
      time: "Yesterday",
    },
  ];

  return (
    <>
      <UpperNavbar />

      <div className="w-full min-h-screen bg-black px-6 py-10">
        <div className="max-w-3xl mx-auto">

          {/* HEADER */}
          <h1 className="text-3xl font-bold text-white mb-3">Notifications</h1>
          <p className="text-gray-400 mb-8">Here are your latest updates</p>

          {/* NOTIFICATIONS LIST */}
          <div className="space-y-4">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 bg-white/5 border border-gray-800 p-4 rounded-2xl hover:bg-white/10 transition cursor-pointer"
              >
                {/* ICON */}
                <div className="text-2xl">
                  <i className={item.icon}></i>
                </div>

                {/* TEXT CONTENT */}
                <div className="flex-1">
                  <p className="text-white text-sm">{item.text}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default Notification;
