

// import React, { useState, useEffect } from 'react';
// import "../CSS/CoachManagement.css";

// function CoachManagement() {
//   const [pendingCoaches, setPendingCoaches] = useState([]);

//   useEffect(() => {
//     // Fetch pending coaches
//     const fetchPendingCoaches = async () => {
//       try {
//         const response = await fetch('/admin/coaches/pending');
//         const data = await response.json();
//         setPendingCoaches(data);
//       } catch (error) {
//         console.error('Error fetching pending coaches:', error);
//       }
//     };

//     fetchPendingCoaches();
//   }, []);

//   const handleApproval = async (id, status) => {
//     try {
//       const response = await fetch(`/admin/coaches/${id}/approve`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status }),
//       });

//       const data = await response.json();
//       console.log(data.message);

//       // Update the UI after approval/rejection
//       setPendingCoaches(pendingCoaches.filter(coach => coach._id !== id));
//     } catch (error) {
//       console.error('Error updating coach status:', error);
//     }
//   };

//   return (
//     <div className="coach-management">
//       <h3>Coach Management</h3>
//       <p>Manage coaches and approve pending requests.</p>

//       <h4>Pending Coach Requests</h4>
//       {pendingCoaches.length > 0 ? (
//         <table className="coach-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Specialization</th>
//               <th>Experience</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingCoaches.map(coach => (
//               <tr key={coach._id}>
//                 <td>{coach.firstName} {coach.lastName}</td>
//                 <td>{coach.email}</td>
//                 <td>{coach.specialization}</td>
//                 <td>{coach.experience} years</td>
//                 <td>{coach.status}</td>
//                 <td>
//                   <button
//                     onClick={() => handleApproval(coach._id, 'approved')}
//                     className="approve-btn"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleApproval(coach._id, 'rejected')}
//                     className="reject-btn"
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No pending requests</p>
//       )}
//     </div>
//   );
// }

// export default CoachManagement;


// import React, { useState, useEffect } from 'react';
// import "../CSS/CoachManagement.css";

// function CoachManagement() {
//   const [pendingCoaches, setPendingCoaches] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Pending coaches-ஐ பெறுவதற்கான function
//     const fetchPendingCoaches = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/coach/admin/coaches/pending'); // சரியான URL
//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setPendingCoaches(data);
//       } catch (error) {
//         console.error('Error fetching pending coaches:', error);
//         setError('Failed to load pending coaches');
//       }
//     };

//     fetchPendingCoaches();
//   }, []);

//   const handleApproval = async (id, status) => {
//     try {
//       const response = await fetch(`http://localhost:3000/coach/admin/coaches/${id}/approve`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log(data.message);

//       // Approval/Rejection செய்ய UI update செய்கிறது
//       setPendingCoaches(pendingCoaches.filter(coach => coach._id !== id));
//     } catch (error) {
//       console.error('Error updating coach status:', error);
//     }
//   };

//   return (
//     <div className="coach-management">
//       <h3>Coach Management</h3>
//       <p>Manage coaches and approve pending requests.</p>

//       <h4>Pending Coach Requests</h4>
//       {error && <p className="error-message">{error}</p>}
//       {pendingCoaches.length > 0 ? (
//         <table className="coach-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Specialization</th>
//               <th>Experience</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pendingCoaches.map(coach => (
//               <tr key={coach._id}>
//                 <td>{coach.firstName} {coach.lastName}</td>
//                 <td>{coach.email}</td>
//                 <td>{coach.specialization}</td>
//                 <td>{coach.experience} years</td>
//                 <td>{coach.status}</td>
//                 <td>
//                   <button
//                     onClick={() => handleApproval(coach._id, 'approved')}
//                     className="approve-btn"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleApproval(coach._id, 'rejected')}
//                     className="reject-btn"
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No pending requests</p>
//       )}
//     </div>
//   );
// }

// export default CoachManagement;


import React, { useState, useEffect } from 'react';
import "../CSS/CoachManagement.css";

function CoachManagement() {
  const [pendingCoaches, setPendingCoaches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Pending coaches-ஐ பெறுவதற்கான function
    const fetchPendingCoaches = async () => {
      try {
        const response = await fetch('http://localhost:2003/api/admin/coaches/pending'); // சரியான URL
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setPendingCoaches(data);
      } catch (error) {
        console.error('Error fetching pending coaches:', error);
        setError('Failed to load pending coaches');
      }
    };

    fetchPendingCoaches();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:2003/api/admin/coaches/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.message);

      // Approval/Rejection செய்ய UI update செய்கிறது
      setPendingCoaches(pendingCoaches.filter(coach => coach._id !== id));
    } catch (error) {
      console.error('Error updating coach status:', error);
    }
  };

  return (
    <div className="coach-management">
      <h3>Coach Management</h3>
      <p>Manage coaches and approve pending requests.</p>

      <h4>Pending Coach Requests</h4>
      {error && <p className="error-message">{error}</p>}
      {pendingCoaches.length > 0 ? (
        <table className="coach-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingCoaches.map(coach => (
              <tr key={coach._id}>
                <td>{coach.firstName} {coach.lastName}</td>
                <td>{coach.email}</td>
                <td>{coach.specialization}</td>
                <td>{coach.experience} years</td>
                <td>{coach.status}</td>
                <td>
                  <button
                    onClick={() => handleApproval(coach._id, 'approved')}
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(coach._id, 'rejected')}
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending requests</p>
      )}
    </div>
  );
}

export default CoachManagement;
