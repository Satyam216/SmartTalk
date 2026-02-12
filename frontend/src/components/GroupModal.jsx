import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const GroupModal = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/messages/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const toggleUser = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const createGroup = async () => {
    if (!groupName.trim()) return toast.error("Enter group name");
    if (selectedMembers.length === 0)
      return toast.error("Select at least one member");

    try {
      await axiosInstance.post("/groups", {
        name: groupName,
        members: selectedMembers,
      });

      toast.success("Group created successfully");
      onClose();
      window.location.reload();
    } catch (err) {
      toast.error("Failed to create group");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-base-100 w-[400px] rounded-xl p-5 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Create Group</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Group Name */}
        <input
          type="text"
          placeholder="Group name"
          className="input input-bordered w-full mb-4"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="max-h-60 overflow-y-auto space-y-2">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => toggleUser(user._id)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer 
                ${selectedMembers.includes(user._id)
                  ? "bg-primary/20"
                  : "hover:bg-base-200"}`}
            >
              <img
                src={user.profilePic || "/avatar.png"}
                className="size-10 rounded-full"
              />
              <span className="font-medium">{user.fullName}</span>
            </div>
          ))}
        </div>

        <button
          onClick={createGroup}
          className="btn btn-primary w-full mt-4"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default GroupModal;
