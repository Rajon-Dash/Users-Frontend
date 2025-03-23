
import React from "react";
import api from "../utils/api";
import { FaLock, FaUnlock, FaTrash } from "react-icons/fa";
import { logout } from "../utils/auth"; // Import logout function

const Toolbar = ({ selectedUsers, fetchUsers, navigate }) => {
  const handleAction = async (action) => {
    if (!selectedUsers || selectedUsers.length === 0) {
      // alert("Please select at least one user.");
      return;
    }

    try {
      const response = await api.post(`/users/${action}`, { userIds: selectedUsers });

      if (response.data.logout) {
        // alert("You have blocked/deleted yourself. Redirecting to login...");
        logout(navigate); // Logout if self-action
        return;
      }

      fetchUsers(); // Refresh user list after action
    } catch (error) {
      console.error("Action failed", error);
      // alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="d-flex gap-2 mb-3">
      <button className="btn btn-outline-primary d-flex align-items-center" onClick={() => handleAction("block")}>
        <FaLock className="me-2" /> Block
      </button>
      <button className="btn btn-outline-primary d-flex align-items-center" onClick={() => handleAction("unblock")}>
        <FaUnlock className="me-2" /> Unblock
      </button>
      <button className="btn btn-outline-danger d-flex align-items-center" onClick={() => handleAction("delete")}>
        <FaTrash className="me-2" /> Delete
      </button>
    </div>
  );
};

export default Toolbar;


