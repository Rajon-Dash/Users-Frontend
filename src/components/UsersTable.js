import React, { useEffect } from "react";
import { timeAgo } from "../utils/timeFormatter";

const UsersTable = ({ users, selectedUsers, setSelectedUsers }) => {
  const toggleSelection = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const selectAll = (e) => {
    setSelectedUsers(e.target.checked ? users.map((user) => user.id) : []);
  };

  useEffect(() => {
    setSelectedUsers([]); // Reset selection when users change
  }, [users, setSelectedUsers]);

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr className="fw-bolder text-secondary fs-7">
            <th>
              <input
                type="checkbox"
                onChange={selectAll}
                checked={selectedUsers.length > 0 && selectedUsers.length === users.length}
              />
            </th>
            <th className="fs-8">Name</th>
            <th className="fs-8">Email</th>
            <th className="fs-8">Last Seen</th>
            <th className="fs-8">Registration</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="fs-7">
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleSelection(user.id)}
                  className="form-check-input"
                />
              </td>
              <td className={`fw-light ${user.status === "blocked" ? "text-muted text-decoration-line-through" : ""}`}>{user.name}</td>
              <td className={`fw-light ${user.status === "blocked" ? "text-muted text-decoration-line-through" : ""}`}>{user.email}</td>
              <td className={`fw-light ${user.status === "blocked" ? "text-muted text-decoration-line-through" : ""}`}>{timeAgo(user.last_login)}</td>
              <td className={`fw-light ${user.status === "blocked" ? "text-muted text-decoration-line-through" : ""}`}>
                {new Date(user.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;


