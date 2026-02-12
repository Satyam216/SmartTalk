import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { socket } from "../socket/socket";
import { AuthContext } from "../context/AuthContext";

export default function ChatBox({ currentChat }) {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages when conversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentChat) return;

      const { data } = await API.get(
        `/messages/${currentChat._id}`
      );

      setMessages(data);

      socket.emit("join", currentChat._id);
    };

    fetchMessages();
  }, [currentChat]);

  // Receive message
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const handleSend = async () => {
    if (!newMessage || !currentChat) return;

    const { data } = await API.post("/messages", {
      conversationId: currentChat._id,
      text: newMessage,
    });

    socket.emit("sendMessage", data);

    setMessages((prev) => [...prev, data]);
    setNewMessage("");
  };

  if (!currentChat)
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        Select a user to start chatting
      </div>
    );

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded max-w-xs ${
              msg.sender === user._id
                ? "bg-blue-600 ml-auto"
                : "bg-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-800 flex">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 bg-gray-700 rounded"
          placeholder="Type message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
