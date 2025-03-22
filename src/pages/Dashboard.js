
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UsersTable from "../components/UsersTable";
import Toolbar from "../components/Toolbar";
import api from "../utils/api";
import { logout } from "../utils/auth";
import { FaUsers, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (err) {
      setError("Session expired or access denied.");
      logout(navigate);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center bg-white shadow-sm p-3 rounded">
        <h2 className="m-0 d-flex align-items-center">
          <FaUsers className="me-2 text-primary" /> All User 
        </h2>
        <button className="btn btn-outline-danger d-flex align-items-center" onClick={() => logout(navigate)}>
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Toolbar & Users Table */}
      <div className="card mt-3 p-3 border-0">
        <Toolbar selectedUsers={selectedUsers} fetchUsers={fetchUsers} navigate={navigate} />
        <UsersTable users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
      </div>
    </div>
  );
};

export default Dashboard;

