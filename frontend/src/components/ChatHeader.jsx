import { X } from "lucide-react";
import { useAuth } from "../config/useAuth";
import { useChat } from "../config/useChat";
import GroupDetailsModal from "./GroupDetailsModal";
import { useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChat();
  const { onlineUsers } = useAuth();
  const [showDetails, setShowDetails] = useState(false);

  if (!selectedUser) return null;

  const isGroup = selectedUser.members !== undefined;

  return (
    <>
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img
                  src={
                    isGroup
                      ? "/group-icon.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt={
                    isGroup
                      ? selectedUser.name
                      : selectedUser.fullName
                  }
                />
              </div>
            </div>
            <div>
              <h3 className="font-medium">
                {isGroup
                  ? selectedUser.name
                  : selectedUser.fullName}
              </h3>

              {!isGroup && (
                <p className="text-sm text-base-content/70">
                  {onlineUsers.includes(selectedUser._id)
                    ? "Online"
                    : "Offline"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isGroup && (
              <button
                onClick={() => setShowDetails(true)}
                className="text-sm text-primary hover:underline"
              >
                View Details
              </button>
            )}

            <button onClick={() => setSelectedUser(null)}>
              <X />
            </button>
          </div>
        </div>
      </div>

      {isGroup && showDetails && (
        <GroupDetailsModal
          group={selectedUser}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default ChatHeader;
