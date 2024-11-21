// // src/CakewalkExp/StartExp.tsx

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useJourneyContext } from '../context/JourneyContext';

// const StartExp: React.FC = () => {
//   const navigate = useNavigate();
//   const { updateUserData } = useJourneyContext();

//   const handleExploreClick = () => {
//     updateUserData({ currentStep: 1 });
//     navigate('/info-one');
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center p-6">
//       <header className="text-center mb-12">
//         <h1 className="text-4xl md:text-5xl font-bold text-[#0066FF] mb-4">
//           Cakewalk
//         </h1>
//         <h2 className="text-xl md:text-2xl text-gray-600">
//           Your Benefits Journey Starts Here
//         </h2>
//       </header>

//       <div className="w-full max-w-2xl space-y-6">
//         {/* Vision Coverage Card */}
//         <div className="bg-white rounded-2xl p-8 shadow-lg text-center transition-transform hover:-translate-y-1">
//           <div className="w-12 h-12 mx-auto mb-4">
//             <img src="/icons/eye-icon.svg" alt="Vision" className="w-full h-full" />
//           </div>
//           <h3 className="text-xl font-semibold text-[#0066FF] mb-2">
//             Vision Coverage
//           </h3>
//           <p className="text-gray-600">
//             Comprehensive vision care including exams, frames, and lenses
//           </p>
//         </div>

//         {/* Dental Plan Card */}
//         <div className="bg-white rounded-2xl p-8 shadow-lg text-center transition-transform hover:-translate-y-1">
//           <div className="w-12 h-12 mx-auto mb-4">
//             <img src="/icons/tooth-icon.svg" alt="Dental" className="w-full h-full" />
//           </div>
//           <h3 className="text-xl font-semibold text-[#0066FF] mb-2">
//             Dental Plan
//           </h3>
//           <p className="text-gray-600">
//             Full dental coverage including preventive care and major procedures
//           </p>
//         </div>

//         {/* Long-Term Disability Card */}
//         <div className="bg-white rounded-2xl p-8 shadow-lg text-center transition-transform hover:-translate-y-1">
//           <div className="w-12 h-12 mx-auto mb-4">
//             <img src="/icons/shield-icon.svg" alt="Disability" className="w-full h-full" />
//           </div>
//           <h3 className="text-xl font-semibold text-[#0066FF] mb-2">
//             Long-Term Disability
//           </h3>
//           <p className="text-gray-600">
//             Income protection for extended health-related absences
//           </p>
//         </div>

//         {/* Life Insurance Card */}
//         <div className="bg-white rounded-2xl p-8 shadow-lg text-center transition-transform hover:-translate-y-1">
//           <div className="w-12 h-12 mx-auto mb-4">
//             <img src="/icons/heart-icon.svg" alt="Life Insurance" className="w-full h-full" />
//           </div>
//           <h3 className="text-xl font-semibold text-[#0066FF] mb-2">
//             Life Insurance
//           </h3>
//           <p className="text-gray-600">
//             Financial security for you and your loved ones
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={handleExploreClick}
//         className="mt-8 w-full max-w-2xl bg-[#0066FF] text-white rounded-full py-4 px-8 text-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
//       >
//         Explore Your Benefits
//       </button>
//     </div>
//   );
// };

// export default StartExp;