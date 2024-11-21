// // src/CakewalkExp/RecStep1.tsx

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useJourneyContext } from '../context/JourneyContext';

// interface FormData {
//   age: string;
//   zipCode: string;
//   annualIncome: string;
// }

// const RecStep1: React.FC = () => {
//   const navigate = useNavigate();
//   const { updateUserData } = useJourneyContext();
//   const [formData, setFormData] = useState<FormData>({
//     age: '',
//     zipCode: '',
//     annualIncome: ''
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});

//   const formatIncome = (value: string) => {
//     // Remove non-numeric characters
//     const numericValue = value.replace(/\D/g, '');
//     // Format with commas
//     return numericValue ? `$${parseInt(numericValue).toLocaleString()}` : '';
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
    
//     if (name === 'annualIncome') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: formatIncome(value)
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }

//     // Clear error when user starts typing
//     if (errors[name as keyof FormData]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormData> = {};

//     if (!formData.age || parseInt(formData.age) < 21 || parseInt(formData.age) > 90) {
//       newErrors.age = 'Age must be between 21 and 90';
//     }

//     if (!formData.zipCode || !/^\d{5}$/.test(formData.zipCode)) {
//       newErrors.zipCode = 'Enter a valid 5-digit ZIP code';
//     }

//     if (!formData.annualIncome || formData.annualIncome === '$0') {
//       newErrors.annualIncome = 'Enter a valid annual income';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       updateUserData({
//         basicInfo: {
//           age: parseInt(formData.age),
//           zipCode: formData.zipCode,
//           annualIncome: formData.annualIncome
//         }
//       });
//       navigate('/rec-step2');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center p-6">
//       {/* Progress Bar */}
//       <div className="w-full max-w-2xl mb-8">
//         <div className="flex justify-between text-sm text-gray-600 mb-2">
//           <span>Progress</span>
//           <span>Step 3 of 8</span>
//         </div>
//         <div className="h-2 bg-gray-200 rounded-full">
//           <div className="h-full bg-[#0066FF] rounded-full" style={{ width: '37.5%' }}></div>
//         </div>
//       </div>

//       <header className="text-center mb-12">
//         <h1 className="text-3xl md:text-4xl font-bold text-[#0066FF] mb-4">
//           Tell Us About Yourself
//         </h1>
//         <p className="text-gray-600 text-lg">
//           Help us personalize your benefits package
//         </p>
//       </header>

//       <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
//         <div className="space-y-4">
//           {/* Age Input */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Age
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
//                 👤
//               </span>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
//                   errors.age ? 'border-red-500' : 'border-gray-200'
//                 } focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-20 outline-none transition-all`}
//                 placeholder="Enter your age (21-90)"
//               />
//             </div>
//             {errors.age && (
//               <p className="mt-1 text-red-500 text-sm">{errors.age}</p>
//             )}
//           </div>

//           {/* ZIP Code Input */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Business ZIP Code
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
//                 📍
//               </span>
//               <input
//                 type="text"
//                 name="zipCode"
//                 value={formData.zipCode}
//                 onChange={handleInputChange}
//                 maxLength={5}
//                 className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
//                   errors.zipCode ? 'border-red-500' : 'border-gray-200'
//                 } focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-20 outline-none transition-all`}
//                 placeholder="Enter 5-digit ZIP code"
//               />
//             </div>
//             {errors.zipCode && (
//               <p className="mt-1 text-red-500 text-sm">{errors.zipCode}</p>
//             )}
//           </div>

//           {/* Annual Income Input */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Annual Income
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
//                 💰
//               </span>
//               <input
//                 type="text"
//                 name="annualIncome"
//                 value={formData.annualIncome}
//                 onChange={handleInputChange}
//                 className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
//                   errors.annualIncome ? 'border-red-500' : 'border-gray-200'
//                 } focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-20 outline-none transition-all`}
//                 placeholder="Enter annual income"
//               />
//             </div>
//             {errors.annualIncome && (
//               <p className="mt-1 text-red-500 text-sm">{errors.annualIncome}</p>
//             )}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#0066FF] text-white rounded-full py-4 px-8 text-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-lg mt-8"
//         >
//           Continue
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RecStep1;