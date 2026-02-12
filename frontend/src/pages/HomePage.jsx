import { useChat } from "../config/useChat";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChat();

  return (
    <div className="h-screen bg-base-400">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-300 rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>  
    </div>
  );
};
export default HomePage;
