// // UserManagement.js

// import React from 'react';
// import '../CSS/UserManagement.css'; 
// import { FaUser } from 'react-icons/fa';

// const UserManagement = () => {
//   const users = [
//     {
//       id: 1,
//       name: 'John McCormick',
//       email: 'john@example.com',
//       phone: '123-456-7890',
//       registrationDate: '01 Aug 2023',
//       lastLogin: '05 Sep 2023',
//       status: 'Active',
//       totalSessions: 10,
//       completedSessions: 8,
//       pendingRequests: 2,
//       paymentsMade: '$150',
//     },
//     // Add more users as needed
//   ];

//   return (
//     <div className="contain">
//       {/* <div className="sidebar">
//         <ul className="menu">
//           <li className="menu-item">Dashboard</li>
//           <li className="menu-item">Users</li>
//           <li className="menu-item">Sessions</li>
//           <li className="menu-item">Payments</li>
//         </ul>
//       </div> */}

//       <div className="main-content">
//         <h1 className="header">User Management</h1>
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th className="table-header">Name</th>
//               <th className="table-header">Email</th>
//               <th className="table-header">Phone</th>
//               <th className="table-header">Registration Date</th>
//               <th className="table-header">Last Login</th>
//               <th className="table-header">Status</th>
//               <th className="table-header">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="table-row">
//                 <td className="table-cell">
//                   <div className="user-info">
//                     <div className="avatar">
//                       <FaUser />
//                     </div>
//                     {user.name}
//                   </div>
//                 </td>
//                 <td className="table-cell">{user.email}</td>
//                 <td className="table-cell">{user.phone}</td>
//                 <td className="table-cell">{user.registrationDate}</td>
//                 <td className="table-cell">{user.lastLogin}</td>
//                 <td className="table-cell">
//                   <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
//                 </td>
//                 <td className="table-cell">
//                   <button className="action-button">View</button>
//                   {/* <button className="action-button">Edit</button> */}
//                   <button className="action-button danger">Deactivate</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
// import '../CSS/UserManagement.css';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch users from the server
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:2003/api/users/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleEditUser = (id) => {
//     // Logic to edit user by id
//     const updatedData = { /* add updated user data */ };
//     axios.put(`http://localhost:2003/api/users/users/${id}`, updatedData)
//       .then(response => {
//         console.log(response.data);
//         alert('User updated successfully');
//       })
//       .catch(error => console.error('Error updating user:', error));
//   };

//   const handleDeactivateUser = (id) => {
//     if (window.confirm('Are you sure you want to deactivate this user?')) {
//       axios.put(`http://localhost:2003/api/users/users/${id}/deactivate`)
//         .then(response => {
//           console.log(response.data);
//           setUsers(users.map(user => (user._id === id ? { ...user, status: 'Deactivated' } : user)));
//         })
//         .catch(error => console.error('Error deactivating user:', error));
//     }
//   };

//   return (
//     <div className="contain">
//       <div className="main-content">
//         <h1 className="header">User Management</h1>
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th className="table-header">Name</th>
//               <th className="table-header">Email</th>
//               <th className="table-header">Phone</th>
//               <th className="table-header">Registration Date</th>
//               <th className="table-header">Last Login</th>
//               <th className="table-header">Status</th>
//               <th className="table-header">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((User) => (
//               <tr key={User._id} className="table-row">
//                 <td className="table-cell">
//                   <div className="user-info">
//                     <div className="avatar">
//                       <FaUser />
//                     </div>
//                     {`${User.firstName} ${User.lastName}`}
//                   </div>
//                 </td>
//                 <td className="table-cell">{User.email}</td>
//                 <td className="table-cell">{User.phone}</td>
//                 <td className="table-cell">{User.registrationDate}</td>
//                 <td className="table-cell">{User.lastLogin}</td>
//                 <td className="table-cell">
//                   <span className={`status ${User.status.toLowerCase()}`}>{User.status}</span>
//                 </td>
//                 <td className="table-cell">
//                   <button className="action-button" onClick={() => handleEditUser(User._id)}>
//                     <FaEdit /> Edit
//                   </button>
//                   <button className="action-button danger" onClick={() => handleDeactivateUser(User._id)}>
//                     <FaTrash /> Deactivate
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import '../CSS/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the server
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:2003/api/users/users');
        console.log(response.data); // Log the data for debugging
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = (id) => {
    // Logic to edit user by id
    const updatedData = { /* add updated user data */ };
    axios.put(`http://localhost:2003/api/users/users/${id}`, updatedData)
      .then(response => {
        console.log(response.data);
        alert('User updated successfully');
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDeactivateUser = (id) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      axios.put(`http://localhost:2003/api/users/users/${id}/deactivate`)
        .then(response => {
          console.log(response.data);
          setUsers(users.map(user => (user._id === id ? { ...user, status: 'Deactivated' } : user)));
        })
        .catch(error => console.error('Error deactivating user:', error));
    }
  };

  return (
    <div className="contain">
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
            {users.map((User) => (
              <tr key={User._id} className="table-row">
                <td className="table-cell">
                  <div className="user-info">
                    <div className="avatar">
                      <FaUser />
                    </div>
                    {`${User.firstName} ${User.lastName}`}
                  </div>
                </td>
                <td className="table-cell">{User.email}</td>
                <td className="table-cell">{User.phone}</td>
                <td className="table-cell">{User.registrationDate}</td>
                <td className="table-cell">{User.lastLogin}</td>
                <td className="table-cell">
                  <span className={`status ${User.status ? User.status.toLowerCase() : 'unknown'}`}>
                    {User.status || 'Unknown'}
                  </span>
                </td>
                <td className="table-cell">
                  <button className="action-button" onClick={() => handleEditUser(User._id)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="action-button danger" onClick={() => handleDeactivateUser(User._id)}>
                    <FaTrash /> Deactivate
                  </button>
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
