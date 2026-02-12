import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const AddMemberModal = ({ group, members, setMembers, onClose }) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/messages/users");
        setAllUsers(res.data);
      } catch {
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const addMember = async (userId) => {
    try {
      await axiosInstance.post("/groups/add-member", {
        groupId: group._id,
        memberId: userId,
      });

      const addedUser = allUsers.find((u) => u._id === userId);
      setMembers((prev) => [...prev, addedUser]);

      toast.success("Member added");
    } catch {
      toast.error("Failed to add member");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-base-100 w-[420px] max-h-[70vh] overflow-y-auto rounded-xl p-5 shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Add Members</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-3">
          {allUsers.map((user) => {
            const alreadyMember = members.some(
              (m) => m._id === user._id
            );

            return (
              <div
                key={user._id}
                className="flex justify-between items-center bg-base-200 p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.fullName}</span>
                </div>

                {alreadyMember ? (
                  <span className="text-xs text-zinc-400">
                    Already Member
                  </span>
                ) : (
                  <button
                    onClick={() => addMember(user._id)}
                    className="text-primary text-sm hover:underline"
                  >
                    Add
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
