import UpperNavbar from "../../../components/UI/UpperNavbar";
import { useState } from "react";

function Message() {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: "Amit Kumar", lastMsg: "See you tomorrow!", online: true },
    { id: 2, name: "Priya Sharma", lastMsg: "Can you send notes?", online: false },
    { id: 3, name: "Rohit Singh", lastMsg: "I finished the project.", online: true },
    { id: 4, name: "Neha Verma", lastMsg: "Let's join study group", online: false },
    { id: 5, name: "Karan Patel", lastMsg: "Okay bro!", online: true },
  ];

  const [messages, setMessages] = useState([
    { from: "me", text: "Hello!" },
    { from: "them", text: "Hey, how are you?" },
    { from: "me", text: "I'm good, what about you?" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  return (
    <>
      <UpperNavbar />

      <div className="w-full h-[calc(100vh-80px)] bg-black flex">
        {/* LEFT SIDEBAR */}
        <div className="w-80 bg-[#0e0e0e] border-r border-gray-800 p-4 overflow-y-auto">
          <h2 className="text-white text-lg font-semibold mb-4">Chats</h2>

          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-white/10 transition ${
                  selectedUser?.id === u.id ? "bg-white/10" : ""
                }`}
              >
                <div>
                  <p className="text-white font-medium">{u.name}</p>
                  <p className="text-gray-400 text-xs">{u.lastMsg}</p>
                </div>

                <span
                  className={`w-2 h-2 rounded-full ${
                    u.online ? "bg-green-400" : "bg-gray-600"
                  }`}
                ></span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CHAT WINDOW */}
        <div className="flex-1 bg-black/40 backdrop-blur-xl p-6 relative flex flex-col">
          {!selectedUser ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <div>
                  <p className="text-white text-lg font-semibold">{selectedUser.name}</p>
                  <p className="text-gray-400 text-xs">
                    {selectedUser.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>

              {/* MESSAGE LIST */}
              <div className="flex-1 overflow-y-auto mt-4 mb-24 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-xs p-3 rounded-xl text-sm transition ${
                      msg.from === "me"
                        ? "ml-auto text-white bg-gradient-to-r from-purple-400/40 to-pink-500/40 border border-purple-500/30"
                        : "mr-auto bg-white/10 text-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* MESSAGE INPUT */}
              <div className="absolute bottom-5 left-6 right-6">
                <div className="flex items-center gap-3 bg-[#111] border border-gray-700 rounded-xl p-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-white outline-none"
                  />

                  <button
                    onClick={sendMessage}
                    className="px-5 py-2 rounded-xl text-white text-sm font-semibold bg-linear-to-r from-purple-400/40 to-pink-500/40 hover:from-purple-400/60 hover:to-pink-500/60 border border-purple-500/20 transition"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Message;
