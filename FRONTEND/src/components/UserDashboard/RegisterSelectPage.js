
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../CSS/RegisterSelectPage.css'; // Updated CSS file for styling

// function RegisterSelectPage() {
//   const navigate = useNavigate();

//   const navigateToCoachDetail = () => {
//     navigate('/coach');
//   };

//   const handleCoachLogin = () => {
//     navigate('/register-coach');
//   };

//   const handleUserLogin = () => {
//     navigate('/register-user');
//   };

//   return (
//     <div className="landing-container">
//       <div className="left-content">
//         <h1>Welcome to Fitaybl</h1>
//         <p>
//           Track your fitness journey with personalized workout plans, virtual coaches, 
//           and advanced analytics designed to help you achieve your goals. Whether you're 
//           a beginner or a fitness expert, Fitaybl offers everything you need to stay on 
//           top of your progress.
//         </p>
//         <button className="find-coach-button" onClick={navigateToCoachDetail}>
//           Find a Coach
//         </button>
//       </div>

//       <div className="right-content">
//         <div className="top-right">
//           <button className="user-login-button" onClick={handleUserLogin}>
//             Login
//           </button>
//         </div>

//         <div className="bottom-right">
//           <div className="coachi-card">
//             <p>
//               Ready to help others reach their fitness goals? Join our platform and become a coach today!
//             </p>
//             <button className="coach-login-button" onClick={handleCoachLogin}>
//               Register Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterSelectPage;
// RegisterSelectPage.js
import React from 'react';
import '../CSS/RegisterSelectPage.css';
import yogaImage from './img1.webp'; // replace with the path to the image file

const RegisterSelectPage = () => {
  return (
    <div className="select-container" id="about">
      <div className="select-content">
        <div className="select-image">
          <img
            src={yogaImage}
            alt="Yoga Pose"
            className="ima"
          />
        </div>
        <div className="select-text">
    <h2 className="heading">Elevate Your Wellness Journey</h2>
    <p className="subtext">
        At Fitaybl, we’re dedicated to helping you reach new heights in your fitness and well-being. Our mission is to bring you a personalized experience that supports both your body and mind.
    </p>
    <p className="highlight">
        Connect with expert coaches, set achievable goals, and transform your health journey with a community built for growth and inspiration.
    </p>
    <button className="cta-button">Get Started</button>
</div>

      </div>
    </div>
  );
};

export default RegisterSelectPage;
