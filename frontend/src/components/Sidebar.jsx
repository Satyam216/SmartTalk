import { useEffect, useState } from "react";
import { useChat } from "../config/useChat";
import { useAuth } from "../config/useAuth";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Plus } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import GroupModal from "./GroupModal";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChat();
  const { onlineUsers } = useAuth();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //Fetch Groups
    useEffect(() => {
      const fetchGroups = async () => {
        try {
          const res = await axiosInstance.get("/groups");
          setGroups(res.data);
        } catch (err) {
          console.log("Group fetch error", err);
        }
      };

      fetchGroups();
    }, [selectedUser]);

  // Fetch Users
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
  <>
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn btn-sm btn-circle"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">

        <p className="px-3 text-xs text-zinc-400 mb-2">Personal</p>

        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {groups.length > 0 && (
          <>
            <p className="px-3 mt-4 text-xs text-zinc-400 mb-2">Groups</p>

            {groups.map((group) => (
              <button
                key={group._id}
                onClick={() => setSelectedUser(group)}
                className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${selectedUser?._id === group._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src="/group-icon.png"
                    alt={group.name}
                    className="size-12 object-cover rounded-full"
                  />
                </div>

                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{group.name}</div>
                  <div className="text-sm text-zinc-400">
                    {group.members.length} members
                  </div>
                </div>
              </button>
            ))}
          </>
        )}

        {filteredUsers.length === 0 && groups.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            No contacts found
          </div>
        )}
      </div>
    </aside>
    {showModal && <GroupModal onClose={() => setShowModal(false)} />}
  </>
);
};
export default Sidebar;
