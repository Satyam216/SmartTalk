import { useState } from "react";
import { X, UserPlus } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useAuth } from "../config/useAuth";
import { useChat } from "../config/useChat";
import toast from "react-hot-toast";
import AddMemberModal from "./AddMemberModal";

const GroupDetailsModal = ({ group, onClose }) => {
  const { authUser } = useAuth();
  const { selectedUser, setSelectedUser } = useChat();

  const [groupName, setGroupName] = useState(group.name);
  const [members, setMembers] = useState(group.members);
  const [showAddModal, setShowAddModal] = useState(false);

  const isAdmin =
    group.admin === authUser._id ||
    group.admin?._id === authUser._id;

  const removeMember = async (memberId) => {
    try {
      await axiosInstance.post("/groups/remove-member", {
        groupId: group._id,
        memberId,
      });

      const updatedMembers = members.filter(
        (m) => m._id !== memberId
      );

      setMembers(updatedMembers);
      setSelectedUser({
        ...selectedUser,
        members: updatedMembers,
      });

      toast.success("Member removed");
    } catch {
      toast.error("Only admin can remove");
    }
  };

  const renameGroup = async () => {
    try {
      await axiosInstance.post("/groups/rename", {
        groupId: group._id,
        name: groupName,
      });

      setSelectedUser({
        ...selectedUser,
        name: groupName,
      });

      toast.success("Group renamed");
    } catch {
      toast.error("Rename failed");
    }
  };

  const deleteGroup = async () => {
    try {
      await axiosInstance.post("/groups/delete", {
        groupId: group._id,
      });

      toast.success("Group deleted");
      setSelectedUser(null);
      onClose();
    } catch {
      toast.error("Only admin can delete");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-base-100 w-[520px] rounded-xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Group Details</h2>

            <div className="flex items-center gap-3">
              {isAdmin && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-sm btn-outline flex items-center gap-2"
                >
                  <UserPlus size={16} />
                  Add Member
                </button>
              )}

              <button onClick={onClose}>
                <X />
              </button>
            </div>
          </div>

          {isAdmin && (
            <>
              <input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="input input-bordered w-full mb-3"
              />
              <button
                onClick={renameGroup}
                className="btn btn-sm btn-primary w-full mb-4"
              >
                Rename Group
              </button>
            </>
          )}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {members.map((member) => {
              const memberIsAdmin =
                member._id === group.admin._id;

              return (
                <div
                  key={member._id}
                  className="flex justify-between items-center bg-base-200 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.profilePic || "/avatar.png"}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={member.fullName}
                    />
                    <div>
                      <p className="font-medium">{member.fullName}</p>
                      {memberIsAdmin && (
                        <span className="text-xs text-primary font-medium">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>

                  {isAdmin && !memberIsAdmin && (
                    <button
                      onClick={() => removeMember(member._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {isAdmin && (
            <button
              onClick={deleteGroup}
              className="btn btn-error w-full mt-6"
            >
              Delete Group
            </button>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddMemberModal
          group={group}
          members={members}
          setMembers={(updated) => {
            setMembers(updated);
            setSelectedUser({
              ...selectedUser,
              members: updated,
            });
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
};

export default GroupDetailsModal;
