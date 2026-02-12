import { useState } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useAuth } from "../config/useAuth";
import toast from "react-hot-toast";

const GroupDetailsModal = ({ group, onClose }) => {
  const { authUser } = useAuth();

  const [groupName, setGroupName] = useState(group.name);
  const [members, setMembers] = useState(group.members);

  const isAdmin = group.admin === authUser._id || group.admin?._id === authUser._id;

  const removeMember = async (memberId) => {
    try {
      await axiosInstance.post("/groups/remove-member", {
        groupId: group._id,
        memberId,
      });

      setMembers(members.filter((m) => m._id !== memberId));
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
      onClose();
      window.location.reload();
    } catch {
      toast.error("Only admin can delete");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-base-100 w-[460px] rounded-xl p-5 shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Group Details</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Rename */}
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

        {/* Members */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {members.map((member) => {
  const memberIsAdmin =
    member?._id && group?.admin && member._id == group.admin._id;

  return (
    <div
      key={member._id}
      className="flex justify-between items-center bg-base-200 p-2 rounded"
    >
      <div className="flex items-center gap-3">
        <img
          src={member.profilePic || "/avatar.png"}
          className="w-8 h-8 rounded-full"
        />
        <span>{member.fullName}</span>

        {memberIsAdmin && (
          <span className="text-xs text-primary font-medium">
            Admin
          </span>
        )}
      </div>

      {isAdmin && !memberIsAdmin && (
        <button
          onClick={() => removeMember(member._id)}
          className="text-red-500 text-sm"
        >
          Remove
        </button>
      )}
    </div>
  );
})}

        </div>

        {/* Delete */}
        {isAdmin && (
          <button
            onClick={deleteGroup}
            className="btn btn-error w-full mt-4"
          >
            Delete Group
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupDetailsModal;
