export default function ChatBox() {
  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex-1 p-4 overflow-y-auto">
        Select a user to start chatting
      </div>
      <div className="p-4 bg-gray-800 flex">
        <input
          className="flex-1 p-2 bg-gray-700 rounded"
          placeholder="Type a message..."
        />
        <button className="ml-2 bg-blue-600 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
