import { React, useState } from "react";
import "../css/users.css";

// import { data } from "../pages/data.js";
import { users } from "../pages/users.js";

function Users() {
  // console.log(data);
  // const [search, setSearch] = useState("");
  // console.log(search);
  // return (
  //   <>
  //     <div>
  //       <h1>Contact Keeper</h1>
  //       <input
  //         type="text"
  //         placeholder="Search contacts"
  //         onChange={(e) => setSearch(e.target.value)}
  //       />
  //       <div>
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>First Name</th>
  //               <th>Last Name</th>
  //               <th>Email</th>
  //               <th>Phone</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {data
  //               .filter((item) => {
  //                 const query = search.toLowerCase();
  //                 return (
  //                   query === "" ||
  //                   item.first_name.toLowerCase().includes(query) ||
  //                   item.last_name.toLowerCase().includes(query) ||
  //                   item.email.toLowerCase().includes(query) ||
  //                   item.phone.toLowerCase().includes(query)
  //                 );
  //               })
  //               .map((item) => {
  //                 return (
  //                   <tr key={item.id}>
  //                     <td>{item.first_name}</td>
  //                     <td>{item.last_name}</td>
  //                     <td>{item.email}</td>
  //                     <td>{item.phone}</td>
  //                   </tr>
  //                 );
  //               })}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </>
  // );

  const [searchTerm, setSearchTerm] = useState("");

  console.log(searchTerm);

  return (
    <div className="user-container">
      {/* Header */}
      <div className="user-header">
        <div>
          <h1>Users</h1>
          <p>Manage system users</p>
        </div>
        <button className="btn-primary">
          <i className="fa fa-plus"></i> Add User
        </button>
      </div>
      {/* Search */}
      <div className="user-search">
        <i className="fa fa-search"></i>
        <input
          type="text"
          placeholder="Search users..."
          value=""
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Table */}
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
            {users.map((users) => (
              <tr key={users.name}>
                <td data-label="Name" className="bold">
                  {users.name}
                </td>
                <td data-label="Username">{users.username}</td>
                <td data-label="Contact">{users.contact}</td>
                <td data-label="Role">
                  <div className="role-container">
                    <span className="role">{users.role}</span>
                  </div>
                </td>
                <td data-label="Created At">{users.created_at}</td>
                <td data-label="Actions" className="actions-buttons-table">
                  <div className="action-buttons">
                    <button className="btn-icon">
                      <i className="fa fa-eye"></i>
                    </button>
                    <button className="btn-icon">
                      <i className="fa fa-edit"></i>
                    </button>
                    <button className="btn-icon delete">
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog */}

      {/* <div className="dialog-overlay">
        <div className="dialog-box">
          <h3>User Details</h3>
          <div className="dialog-content">
            <label>Name:</label>
            <p>Admin User</p>

            <label>Username</label>
            <p>admin</p>

            <label>Contact</label>
            <p>+250798865434</p>

            <label>Role</label>
            <p>Admin</p>
            <label>Created-at</label>
            <p>1/15/2025</p>
          </div>
          <button className="btn-close">Close</button>
        </div>
      </div> */}
    </div>
  );
}

export default Users;
