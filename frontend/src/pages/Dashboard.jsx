import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState(null);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        setSelectedUser={setSelectedUser}
        setConversation={setConversation}
      />
      <ChatBox
        selectedUser={selectedUser}
        conversation={conversation}
      />
    </div>
  );
}
