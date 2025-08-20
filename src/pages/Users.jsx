import React, { useState, useEffect } from "react";
import "../css/users.css";

// 1. Import your local static user data as fallback (simulate backend)

import { users as localUsers } from "../data/users";
import Spinner from "../components/antDesign/spin";
import AddUserDialog from "./AddingPages/AddUserDialog";
import { Button, Space, notification } from "antd";

// ("./AddUserDialog");

function Users() {
  // Modal & selected user
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  // Users data + loading + error states
  const [users, setUsers] = useState([]); // Start with static users so UI renders immediately
  const [isLoading, setIsLoading] = useState(true); // no loading on static data

  // For AddUserDialog Box
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Ant Design notification hook
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const stored = localStorage.getItem("users");
        if (stored) {
          setUsers(JSON.parse(stored));
        } else {
          const data = await new Promise((resolve) => {
            setTimeout(() => resolve(localUsers), 500);
          });
          setUsers(data);
          localStorage.setItem("users", JSON.stringify(data)); // save initial set
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Open user details modal
  const openDetails = (user) => {
    setSelectedUser(user);
    setDetailsModal(true);
  };

  // Close modal
  const closeDetails = () => {
    setSelectedUser(null);
    setDetailsModal(false);
  };

  // Filter users by search
  const filteredUsers = users.filter((user) => {
    const query = searchTerm.toLowerCase();
    return (
      query === "" ||
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.contact.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.created_at.toLowerCase().includes(query)
    );
  });

  // Delete user with Ant Design confirmation
  const handleDeleteUser = (id, name) => {
    const key = `delete-${id}`;

    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy(key)}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          danger
          onClick={() => {
            setUsers((prev) => {
              const updated = prev.filter((u) => u.id !== id);
              localStorage.setItem("users", JSON.stringify(updated)); // persist
              return updated;
            });
            api.destroy(key); // close notification
          }}>
          Confirm
        </Button>
      </Space>
    );

    api.open({
      message: "Delete Confirmation",
      description: `Are you sure you want to delete user "${name}"?`,
      btn,
      key,
      duration: 0, // stays until confirm/cancel
    });
  };

  return (
    <div className="user-container">
      {contextHolder} {/* ⬅️ must render notifications */}
      <div className="user-header">
        <div>
          <h1>Users</h1>
          <p>Manage system users</p>
        </div>
        <button className="btn-primary" onClick={() => setIsAddUserOpen(true)}>
          <i className="fa fa-plus"></i> Add User
        </button>
      </div>
      <div className="user-search">
        <i className="fa fa-search"></i>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* {isLoading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>} */}
      {/* <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "20px" }}>
                  No user Found
                </td> */}
      {isLoading ? (
        <Spinner />
      ) : filteredUsers.length === 0 ? (
        <p style={{ textAlign: "center", padding: "20px" }}>No data found</p>
      ) : (
        <div className="user-table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "20px" }}>
                    No user Found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td data-label="Name" className="bold">
                      {user.name}
                    </td>
                    <td data-label="Username">{user.username}</td>
                    <td data-label="Contact">{user.contact}</td>
                    <td data-label="Role">
                      <div className="role-container">
                        <span
                          className={`role ${
                            user.role.toLowerCase() === "admin"
                              ? "admin-role-btn"
                              : ""
                          }`}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td data-label="Created At">{user.created_at}</td>
                    <td data-label="Actions" className="actions-buttons-table">
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          onClick={() => openDetails(user)}
                          aria-label={`View details of ${user.name}`}>
                          <i className="fa fa-eye"></i>
                        </button>
                        <button
                          className="btn-icon"
                          aria-label={`Edit ${user.name}`}>
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn-icon delete"
                          aria-label={`Delete ${user.name}`}
                          onClick={() => handleDeleteUser(user.id, user.name)}>
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* User details modal */}
      {detailsModal && selectedUser && (
        <div className="dialog-overlay" onClick={closeDetails}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h3>User Details</h3>
            <div className="dialog-content">
              <label>Name:</label>
              <p>{selectedUser.name}</p>

              <label>Username</label>
              <p>{selectedUser.username}</p>

              <label>Contact</label>
              <p>{selectedUser.contact}</p>

              <label>Role</label>
              <p>{selectedUser.role}</p>

              <label>Created At</label>
              <p>{selectedUser.created_at}</p>
            </div>
            <button className="btn-close" onClick={closeDetails}>
              Close
            </button>
          </div>
        </div>
      )}
      {/* <div className="add-user"></div> */}
      <AddUserDialog
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onAddUser={(newUser) => {
          setUsers((prevUsers) => {
            const updated = [
              ...prevUsers,
              {
                ...newUser,
                id: Date.now(), // unique id (important for delete)
                created_at: new Date().toLocaleDateString(),
              },
            ];
            localStorage.setItem("users", JSON.stringify(updated)); // persist
            return updated;
          });
        }}
      />
    </div>
  );
}

export default Users;
