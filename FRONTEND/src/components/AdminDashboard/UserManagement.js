// UserManagement.js

import React from 'react';
import '../CSS/UserManagement.css'; // Import the CSS file for styling
import { FaUser } from 'react-icons/fa';

const UserManagement = () => {
  const users = [
    {
      id: 1,
      name: 'John McCormick',
      email: 'john@example.com',
      phone: '123-456-7890',
      registrationDate: '01 Aug 2023',
      lastLogin: '05 Sep 2023',
      status: 'Active',
      totalSessions: 10,
      completedSessions: 8,
      pendingRequests: 2,
      paymentsMade: '$150',
    },
    // Add more users as needed
  ];

  return (
    <div className="contain">
      {/* <div className="sidebar">
        <ul className="menu">
          <li className="menu-item">Dashboard</li>
          <li className="menu-item">Users</li>
          <li className="menu-item">Sessions</li>
          <li className="menu-item">Payments</li>
        </ul>
      </div> */}

      <div className="main-content">
        <h1 className="header">User Management</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Phone</th>
              <th className="table-header">Registration Date</th>
              <th className="table-header">Last Login</th>
              <th className="table-header">Status</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="table-row">
                <td className="table-cell">
                  <div className="user-info">
                    <div className="avatar">
                      <FaUser />
                    </div>
                    {user.name}
                  </div>
                </td>
                <td className="table-cell">{user.email}</td>
                <td className="table-cell">{user.phone}</td>
                <td className="table-cell">{user.registrationDate}</td>
                <td className="table-cell">{user.lastLogin}</td>
                <td className="table-cell">
                  <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
                </td>
                <td className="table-cell">
                  <button className="action-button">View</button>
                  {/* <button className="action-button">Edit</button> */}
                  <button className="action-button danger">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
