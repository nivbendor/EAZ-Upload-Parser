// // src/CakewalkExp/RecStep2.tsx

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useJourneyContext } from '../context/JourneyContext';

// interface FilterOption {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
// }

// interface Recommendation {
//   id: string;
//   title: string;
//   description: string;
//   matchPercentage: number;
//   benefits: string[];
// }

// const RecStep2: React.FC = () => {
//   const navigate = useNavigate();
//   const { updateUserData } = useJourneyContext();
//   const [selectedFilter, setSelectedFilter] = useState<string>('');
//   const [showRecommendations, setShowRecommendations] = useState(false);

//   const filters: FilterOption[] = [
//     {
//       id: 'industry',
//       title: 'Industry-Based',
//       description: 'Find packages tailored to your specific industry requirements and standards',
//       icon: '🏢'
//     },
//     {
//       id: 'size',
//       title: 'Business Size',
//       description: 'Get recommendations based on your company\'s size and scale',
//       icon: '👥'
//     },
//     {
//       id: 'popularity',
//       title: 'Popularity',
//       description: 'See what other businesses like yours are choosing',
//       icon: '⭐'
//     }
//   ];

//   const recommendations: Record<string, Recommendation[]> = {
//     industry: [
//       {
//         id: 'ind-1',
//         title: 'Professional Services Package',
//         description: 'Tailored for consulting and professional service firms',
//         matchPercentage: 98,
//         benefits: ['Comprehensive Health', 'Enhanced Dental', 'Vision Plus', 'Life Insurance']
//       },
//       // Add more industry-specific recommendations
//     ],
//     size: [
//       {
//         id: 'size-1',
//         title: 'Growing Business Bundle',
//         description: 'Perfect for small to medium-sized companies',
//         matchPercentage: 95,
//         benefits: ['Core Health', 'Dental Essential', 'Vision Care', 'Basic Life']
//       },
//       // Add more size-based recommendations
//     ],
//     popularity: [
//       {
//         id: 'pop-1',
//         title: 'Most Popular Package',
//         description: 'Chosen by 70% of similar businesses',
//         matchPercentage: 92,
//         benefits: ['Premium Health', 'Complete Dental', 'Vision Elite', 'Extended Life']
//       },
//       // Add more popularity-based recommendations
//     ]
//   };

//   const handleFilterSelect = (filterId: string) => {
//     setSelectedFilter(filterId);
//     setShowRecommendations(true);
//   };

//   const handlePackageSelect = (recommendation: Recommendation) => {
//     updateUserData({
//       selectedPackage: recommendation,
//       filterType: selectedFilter
//     });
//     navigate('/business-owner-info');
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center p-6">
//       {/* Progress Bar */}
//       <div className="w-full max-w-2xl mb-8">
//         <div className="flex justify-between text-sm text-gray-600 mb-2">
//           <span>Progress</span>
//           <span>Step 4 of 8</span>
//         </div>
//         <div className="h-2 bg-gray-200 rounded-full">
//           <div className="h-full bg-[#0066FF] rounded-full" style={{ width: '50%' }}></div>
//         </div>
//       </div>

//       <header className="text-center mb-12">
//         <h1 className="text-3xl md:text-4xl font-bold text-[#0066FF] mb-4">
//           Find Your Perfect Package
//         </h1>
//         <p className="text-gray-600 text-lg">
//           Choose how you'd like us to recommend benefits packages
//         </p>
//       </header>

//       <div className="w-full max-w-2xl">
//         {/* Filter Options */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           {filters.map((filter) => (
//             <button
//               key={filter.id}
//               onClick={() => handleFilterSelect(filter.id)}
//               className={`p-6 rounded-2xl text-left transition-all ${
//                 selectedFilter === filter.id
//                   ? 'bg-[#0066FF] text-white shadow-lg scale-105'
//                   : 'bg-white shadow-md hover:shadow-lg hover:-translate-y-1'
//               }`}
//             >
//               <span className="text-3xl mb-4 block">{filter.icon}</span>
//               <h3 className={`text-xl font-semibold mb-2 ${
//                 selectedFilter === filter.id ? 'text-white' : 'text-[#0066FF]'
//               }`}>
//                 {filter.title}
//               </h3>
//               <p className={selectedFilter === filter.id ? 'text-white/90' : 'text-gray-600'}>
//                 {filter.description}
//               </p>
//             </button>
//           ))}
//         </div>

//         {/* Recommendations */}
//         {showRecommendations && (
//           <div className="space-y-4 animate-fadeIn">
//             {recommendations[selectedFilter]?.map((rec) => (
//               <button
//                 key={rec.id}
//                 onClick={() => handlePackageSelect(rec)}
//                 className="w-full bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-semibold text-[#0066FF] mb-2">
//                       {rec.title}
//                     </h3>
//                     <p className="text-gray-600">{rec.description}</p>
//                   </div>
//                   <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                     {rec.matchPercentage}% Match
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {rec.benefits.map((benefit, index) => (
//                     <span
//                       key={index}
//                       className="bg-blue-50 text-[#0066FF] px-3 py-1 rounded-full text-sm"
//                     >
//                       {benefit}
//                     </span>
//                   ))}
//                 </div>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecStep2;