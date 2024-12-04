// import ProcessTracker from './ProcessTracker';
// import { ToastContainer } from 'react-toastify';


// const BatchTrackingDashboard = () => {
//   const batchInfo = {
//     batchId: 'XXX_C_EMP_122924_1734',
//     dateStarted: '12/29/24 17:34',
//     user: 'Niv BD',
//     status: 'In Progress'
//   };

//   const metrics = {
//     rawSubmissions: 0,
//     clientShellUniqueIds: 0,
//     productAssignmentUniqueIds: 0,
//     owners: 0,
//     rawEmployeeSubmissions: 0
//   };

//   const getStatusClass = ('status') => {
//     switch (status.toLowerCase()) {
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'in progress':
//         return 'bg-blue-100 text-blue-800';
//       case 'pending':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-yellow-100 text-yellow-800';
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-8">
//       {/* Current batch */}
//       <div className="bg-white rounded-lg shadow p-4">
//         <h2 className="text-xl font-bold mb-4">Current batch</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div>
//             <p className="text-sm text-gray-500">Batch ID</p>
//             <p className="font-medium">{batchInfo.batchId}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Date Started</p>
//             <p className="font-medium">{batchInfo.dateStarted}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">User</p>
//             <p className="font-medium">{batchInfo.user}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Status</p>
//             <span
//               className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(
//                 batchInfo.status
//               )}`}
//             >
//               {batchInfo.status}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Dashboard */}
//       <div className="bg-white rounded-lg shadow p-4">
//         <h2 className="text-xl font-bold mb-4">Dashboard:</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500">Raw submissions</p>
//             <p className="text-2xl font-bold">{metrics.rawSubmissions}</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500">Client Shell - # of Unique Client ID</p>
//             <p className="text-2xl font-bold">{metrics.clientShellUniqueIds}</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500">Product Assignment - # of Unique Client ID</p>
//             <p className="text-2xl font-bold">{metrics.productAssignmentUniqueIds}</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500"># of Owners</p>
//             <p className="text-2xl font-bold">{metrics.owners}</p>
//           </div>
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <p className="text-sm text-gray-500"># of Raw Employee Submissions</p>
//             <p className="text-2xl font-bold">{metrics.rawEmployeeSubmissions}</p>
//           </div>
//         </div>
//       </div>

//       {/* Execution with Process Tracker */}
//       <div className="bg-white rounded-lg shadow p-4">
//         <h2 className="text-xl font-bold mb-4">Execution</h2>
//         {/* Render the ProcessTracker component */}
//         <ProcessTracker />
//       </div>
      
//       {/* ToastContainer for Notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default BatchTrackingDashboard;
