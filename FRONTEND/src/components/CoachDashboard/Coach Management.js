import React, { useState, useEffect } from 'react';
import "../CSS/CoachManagement.css";

function CoachManagement() {
  const [pendingCoaches, setPendingCoaches] = useState([]);

  useEffect(() => {
    // Fetch pending coaches
    const fetchPendingCoaches = async () => {
      try {
        const response = await fetch('/admin/coaches/pending');
        const data = await response.json();
        setPendingCoaches(data);
      } catch (error) {
        console.error('Error fetching pending coaches:', error);
      }
    };

    fetchPendingCoaches();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const response = await fetch(`/admin/coaches/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      console.log(data.message);

      // Update the UI after approval/rejection
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
      {pendingCoaches.length > 0 ? (
        <ul>
          {pendingCoaches.map(coach => (
            <li key={coach._id}>
              <p>
                <strong>{coach.name}</strong> ({coach.email})
              </p>
              <p>Qualifications: {coach.qualifications}</p>
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
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending requests</p>
      )}
    </div>
  );
}

export default CoachManagement;
