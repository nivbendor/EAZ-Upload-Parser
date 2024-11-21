// // src/CakewalkExp/BusinessOwnerInfo.tsx

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useJourneyContext } from '../context/JourneyContext';

// interface FormData {
//   personal: {
//     firstName: string;
//     lastName: string;
//     email: string;
//   };
//   business: {
//     legalName: string;
//     ein: string;
//   };
// }

// const BusinessOwnerInfo: React.FC = () => {
//   const navigate = useNavigate();
//   const { updateUserData } = useJourneyContext();
//   const [currentStep, setCurrentStep] = useState<'personal' | 'business'>('personal');
//   const [formData, setFormData] = useState<FormData>({
//     personal: {
//       firstName: '',
//       lastName: '',
//       email: ''
//     },
//     business: {
//       legalName: '',
//       ein: ''
//     }
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});

//   const formatEIN = (value: string) => {
//     const numbers = value.replace(/\D/g, '');
//     if (numbers.length <= 2) return numbers;
//     return `${numbers.slice(0, 2)}-${numbers.slice(2, 9)}`;
//   };

//   const handleInputChange = (section: 'personal' | 'business', field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: field === 'ein' ? formatEIN(value) : value
//       }
//     }));

//     // Clear error when user types
//     if (errors[section]?.[field as keyof typeof errors[typeof section]]) {
//       setErrors(prev => ({
//         ...prev,
//         [section]: {
//           ...prev[section],
//           [field]: ''
//         }
//       }));
//     }
//   };

//   const validateSection = (section: 'personal' | 'business'): boolean => {
//     const newErrors: any = { [section]: {} };
//     let isValid = true;

//     if (section === 'personal') {
//       if (!formData.personal.firstName.trim()) {
//         newErrors.personal.firstName = 'First name is required';
//         isValid = false;
//       }
//       if (!formData.personal.lastName.trim()) {
//         newErrors.personal.lastName = 'Last name is required';
//         isValid = false;
//       }
//       if (!formData.personal.email.trim() || 
//           !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personal.email)) {
//         newErrors.personal.email = 'Valid email is required';
//         isValid = false;
//       }
//     } else {
//       if (!formData.business.legalName.trim()) {
//         newErrors.business.legalName = 'Business name is required';
//         isValid = false;
//       }
//       if (!formData.business.ein.trim() || 
//           !/^\d{2}-\d{7}$/.test(formData.business.ein)) {
//         newErrors.business.ein = 'Valid EIN is required (XX-XXXXXXX)';
//         isValid = false;
//       }
//     }

//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return isValid;
//   };

//   const handleContinue = () => {
//     if (currentStep === 'personal' && validateSection('personal')) {
//       setCurrentStep('business');
//     } else if (currentStep === 'business' && validateSection('business')) {
//       updateUserData({
//         businessOwner: {
//           ...formData.personal,
//           businessName: formData.business.legalName,
//           ein: formData.business.ein
//         }
//       });
//       navigate('/thank-you-owner');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center p-6">
//       {/* Progress Bar */}
//       <div className="w-full max-w-2xl mb-8">
//         <div className="flex justify-between text-sm text-gray-600 mb-2">
//           <span>Progress</span>
//           <span>Step 6 of 8</span>
//         </div>
//         <div className="h-2 bg-gray-200 rounded-full">
//           <div className="h-full bg-[#0066FF] rounded-full" style={{ width: '75%' }}></div>
//         </div>
//       </div>

//       {/* Mini Steps Indicator */}
//       <div className="flex gap-4 mb-8 w-full max-w-2xl">
//         <button
//           onClick={() => currentStep === 'business' && setCurrentStep('personal')}
//           className={`flex-1 p-4 rounded-xl transition-all ${
//             currentStep === 'personal'
//               ? 'bg-[#0066FF] text-white'
//               : 'bg-white text-gray-600 hover:bg-gray-50'
//           }`}
//         >
//           <div className="flex items-center gap-3">
//             <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-sm">
//               1
//             </span>
//             <span className="font-medium">Personal Info</span>
//           </div>
//         </button>
//         <button
//           className={`flex-1 p-4 rounded-xl transition-all ${
//             currentStep === 'business'
//               ? 'bg-[#0066FF] text-white'
//               : 'bg-white text-gray-600'
//           }`}
//           disabled={currentStep === 'personal'}
//         >
//           <div className="flex items-center gap-3">
//             <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-sm">
//               2
//             </span>
//             <span className="font-medium">Business Info</span>
//           </div>
//         </button>
//       </div>

//       <div className="w-full max-w-2xl">
//         {/* Personal Information Form */}
//         <form 
//           className={`space-y-6 transition-all ${
//             currentStep === 'personal' ? 'block' : 'hidden'
//           }`}
//         >
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               First Name
//             </label>
//             <input
//               type="text"
//               value={formData.personal.firstName}
//               onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border ${
//                 errors.personal?.firstName ? 'border-red-500' : 'border-gray-200'
//               } focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-20 outline-none transition-all`}
//               placeholder="Enter your first name"
//             />
//             {errors.personal?.firstName && (
//               <p className="mt-1 text-red-500 text-sm">{errors.personal.firstName}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Last Name
//             </label>
//             <input
//               type="text"
//               value={formData.personal.lastName}
//               onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border ${
//                 errors.personal?.lastName ? 'border-red-500' : 'border-gray-200'
//               } focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-20 outline-none transition-all`}
//               placeholder="Enter your last name"
//             />
//             {errors.personal?.lastName && (
//               <p className="mt-1 text-red-500 text-sm">{errors.personal.lastName}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={formData.personal.email}
//               onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border ${
//                 errors.personal?.email ? 'border-red-500' : 'border-gray-200'
//               } focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-20 outline-none transition-all`}
//               placeholder="Enter your email address"
//             />
//             {errors.personal?.email && (
//               <p className="mt-1 text-red-500 text-sm">{errors.personal.email}</p>
//             )}
//           </div>
//         </form>

//         {/* Business Information Form */}
//         <form 
//           className={`space-y-6 transition-all ${
//             currentStep === 'business' ? 'block' : 'hidden'
//           }`}
//         >
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Legal Business Name
//             </label>
//             <input
//               type="text"
//               value={formData.business.legalName}
//               onChange={(e) => handleInputChange('business', 'legalName', e.target.value)}
//               className={`w-full px-4 py-3 rounded-xl border ${
//                 errors.business?.legalName ? 'border-red-500' : 'border-gray-200'
//               } focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-20 outline-none transition-all`}
//               placeholder="Enter legal business name"
//             />
//             {errors.business?.legalName && (
//               <p className="mt-1 text-red-500 text-sm">{errors.business.legalName}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               EIN (XX-XXXXXXX)
//             </label>
//             <input
//               type="text"
//               value={formData.business.ein}
//               onChange={(e) => handleInputChange('business', 'ein', e.target.value)}
//               maxLength={10}
//               className={`w-full px-4 py-3 rounded-xl border ${
//                 errors.business?.ein ? 'border-red-500' : 'border-gray-200'
//               } focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-20 outline-none transition-all`}
//               placeholder="XX-XXXXXXX"
//             />
//             {errors.business?.ein && (
//               <p className="mt-1 text-red-500 text-sm">{errors.business.ein}</p>
//             )}
//           </div>
//         </form>

//         <div className="mt-8 flex justify-end">
//           <button
//             onClick={handleContinue}
//             className="bg-[#0066FF] text-white rounded-full py-4 px-8 text-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-lg"
//           >
//             {currentStep === 'personal' ? 'Continue to Business Info' : 'Complete Registration'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessOwnerInfo;