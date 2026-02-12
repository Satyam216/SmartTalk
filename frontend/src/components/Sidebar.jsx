import { useEffect, useState } from "react";
import API from "../api/api";

export default function Sidebar({ setCurrentChat }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await API.get("/users");
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleUserClick = async (user) => {
    const { data } = await API.post("/conversations", {
      userId: user._id,
    });

    setCurrentChat(data);
  };

  return (
    <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto">
      <h2 className="text-xl mb-4">Users</h2>

      {users.map((u) => (
        <div
          key={u._id}
          onClick={() => handleUserClick(u)}
          className="p-3 hover:bg-gray-700 rounded cursor-pointer transition"
        >
          {u.name}
        </div>
      ))}
    </div>
  );
}
