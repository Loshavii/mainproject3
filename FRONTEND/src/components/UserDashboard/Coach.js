

// import React from 'react';
// import '../CSS/Coach.css';
// import { Link } from 'react-router-dom';
// import profile from "../profile.jpg";

// const Coach = () => {
//   const coaches = [
//     { name: 'Julie', peopleTrained: '1,000+', experience: '20+ years', imgSrc: profile },
//     { name: 'Fiona', peopleTrained: '500+', experience: '15+ years', imgSrc: profile },
//     { name: 'Mark', peopleTrained: '500+', experience: '15+ years', imgSrc: profile },
//     { name: 'Sarah', peopleTrained: '800+', experience: '18+ years', imgSrc: profile },
//     { name: 'Tom', peopleTrained: '600+', experience: '16+ years', imgSrc: profile },
//     { name: 'Anna', peopleTrained: '700+', experience: '17+ years', imgSrc: profile }
//   ];

//   return (
//     <div className="coaches-container">
//       {coaches.map((coach, index) => (
//         <div key={index} className="coach-card">
//           <img src={coach.imgSrc} alt="Coach Image" className="coach-img" />
//           <div className="coach-info">
//             <h2 className="coach-name">{coach.name}</h2>
//             <p className="coach-text">
//               {coach.peopleTrained} people Trained<br />
//               {coach.experience} exp.
//             </p>
//             <Link to={`/coach/${coach.name.toLowerCase()}`}>
//               <button className="book-session-btn">View Details</button>
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Coach;



import React, { useEffect, useState } from 'react';
import '../CSS/Coach.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Coach = () => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get('http://localhost:2003/api/coaches/coaches/approved');
        setCoaches(response.data);
      } catch (error) {
        console.error('Error fetching coaches:', error);
      }
    };
    
    fetchCoaches();
  }, []);

  return (
    <div className="coaches-container">
      {coaches.map((coach) => (
        <div key={coach._id} className="coach-card">
          <img src="/path/to/profile/image" alt="Coach" className="coach-img" />
          <div className="coach-info">
            <h2 className="coach-name">{coach.username || 'Unknown Coach'}</h2>
            <p className="coach-text">
              Specialization: {coach.specialization || 'N/A'}<br />
              {coach.experience || 'N/A'} exp.
            </p>
            <Link to={`/coach/${coach.username ? coach.username.toLowerCase() : 'unknown-coach'}`}>
              <button className="book-session-btn">View Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Coach;
