// import React, { useState } from 'react';
// import { Check, Clock, ChevronRight, Upload, AlertCircle, Download, Settings, User } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const ProcessTracker = () => {
//   const [expandedSections, setExpandedSections] = useState({
//     dataProcessing: true,
//     clientShell: false,
//     clientAssignment: false,
//     productAssignment: false,
//     census: false,
//     completed: false
//   });

//   const [completedSteps, setCompletedSteps] = useState({});

//   const sections = {
//     dataProcessing: {
//       id: 'dataProcessing',
//       label: 'Data Processing',
//       subSteps: [
//         { id: 'uploadMemberData', label: 'Upload Member Data report to Maestro (.xlsx)', type: 'MANUAL', hasFileUpload: true },
//         { id: 'addSpreadsheet', label: 'Add to spreadsheet', type: 'AUTOMATION' },
//         { id: 'generateBatchId', label: 'Generating Batch ID', type: 'AUTOMATION' },
//         { id: 'importEmpSub', label: 'Import EMP Submissions', type: 'AUTOMATION' },
//         { id: 'importBusinessSub', label: 'Import Business submissions', type: 'AUTOMATION' },
//         { id: 'parseEmpSub', label: 'Parsing EMP submissions', type: 'AUTOMATION' },
//         { id: 'parseBusinessSub', label: 'Parsing Business submissions', type: 'AUTOMATION' },
//         { id: 'empDupCheck', label: 'EMP - Duplication Checks', type: 'AUTOMATION' },
//         { id: 'empOwnerInfo', label: 'EMP - Emp Populated with Owner Info', type: 'AUTOMATION' },
//         { id: 'empCleanup', label: 'EMP - Records Cleanup', type: 'AUTOMATION' },
//         { id: 'businessDupCheck', label: 'Business - Duplication Checks', type: 'AUTOMATION' },
//         { id: 'consolidation', label: 'Consolidation - EMP & Business', type: 'AUTOMATION' },
//         { id: 'assignBatchEmp', label: 'Assign Batch ID to EMP Submissions', type: 'AUTOMATION' },
//         { id: 'assignBatchBusiness', label: 'Assign Batch ID to Business Submissions', type: 'AUTOMATION' },
//         { id: 'removeEmpty', label: 'Remove empty rows and columns', type: 'AUTOMATION' },
//         { id: 'formatting', label: 'Formatting', type: 'AUTOMATION' }
//       ]
//     },
//     clientShell: {
//       id: 'clientShell',
//       label: 'Client Shell',
//       subSteps: [
//         { id: 'pooling', label: 'Client Shell Pooling', type: 'AUTOMATION' },
//         { id: 'buildExport', label: 'Building Client Shell export file', type: 'AUTOMATION' },
//         { id: 'removeEmpty', label: 'Remove empty rows and columns', type: 'AUTOMATION' },
//         { id: 'updateDashboard', label: 'Updating Dashboard', type: 'AUTOMATION' },
//         { id: 'autoDownload', label: 'Auto-Download export file', type: 'AUTOMATION', hasDownload: true },
//         { id: 'uploadFile', label: 'Upload Client Shell file to platform', type: 'MANUAL', hasFileUpload: true },
//         { id: 'confirmUpload', label: 'Confirm Upload / Duplicated record wizard', type: 'MANUAL', hasConfirm: true },
//         { id: 'exportClientList', label: 'Export Client List file from platform and upload to Maestro', type: 'MANUAL', hasFileUpload: true },
//         { id: 'populateIds', label: 'Populate client IDs', type: 'AUTOMATION' }
//       ]
//     },
//     clientAssignment: {
//       id: 'clientAssignment',
//       label: 'Client Assignment To Users',
//       subSteps: [
//         { id: 'pooling', label: 'Client Assignment Pooling', type: 'AUTOMATION' },
//         { id: 'buildExport', label: 'Building Client Assignment export file', type: 'AUTOMATION' },
//         { id: 'removeEmpty', label: 'Remove empty rows and columns', type: 'AUTOMATION' },
//         { id: 'updateDashboard', label: 'Updating Dashboard', type: 'AUTOMATION' },
//         { id: 'autoDownload', label: 'Auto-Download export file', type: 'AUTOMATION', hasDownload: true },
//         { id: 'uploadFile', label: 'Upload Client Assignment file to platform', type: 'MANUAL', hasFileUpload: true },
//         { id: 'confirmUpload', label: 'Confirm Upload', type: 'MANUAL', hasConfirm: true }
//       ]
//     },
//     productAssignment: {
//       id: 'productAssignment',
//       label: 'Product Assignment',
//       subSteps: [
//         { id: 'pooling', label: 'Product Assignment Pooling', type: 'AUTOMATION' },
//         { id: 'buildExport', label: 'Building Product Assignment export file', type: 'AUTOMATION' },
//         { id: 'removeEmpty', label: 'Remove empty rows and columns', type: 'AUTOMATION' },
//         { id: 'updateDashboard', label: 'Updating Dashboard', type: 'AUTOMATION' },
//         { id: 'autoDownload', label: 'Auto-Download export file', type: 'AUTOMATION', hasDownload: true },
//         { id: 'uploadFile', label: 'Upload Product Assignment file to platform', type: 'MANUAL', hasFileUpload: true },
//         { id: 'confirmUpload', label: 'Confirm Upload', type: 'MANUAL', hasConfirm: true }
//       ]
//     },
//     census: {
//       id: 'census',
//       label: 'Census',
//       subSteps: [
//         { id: 'pooling', label: 'Census Pooling', type: 'AUTOMATION' },
//         { id: 'removeEmpty', label: 'Remove empty rows and columns', type: 'AUTOMATION' },
//         { id: 'buildExport', label: 'Building Census export file', type: 'AUTOMATION' },
//         { id: 'updateDashboard', label: 'Updating Dashboard', type: 'AUTOMATION' },
//         { id: 'autoDownload', label: 'Auto-Download export file', type: 'AUTOMATION', hasDownload: true },
//         { id: 'uploadFile', label: 'Upload Census file to platform', type: 'MANUAL', hasFileUpload: true },
//         { id: 'confirmUpload', label: 'Confirm Upload', type: 'MANUAL', hasConfirm: true },
//         { id: 'updateTemplate', label: 'Go to platform and update Report Template', type: 'MANUAL', hasConfirm: true },
//         { id: 'confirmUpdate', label: 'Confirm update', type: 'MANUAL', hasConfirm: true }
//       ]
//     },
//     completed: {
//       id: 'completed',
//       label: 'Completed',
//       subSteps: []
//     }
//   };

//   const handleFileUpload = (stepId, subStepId) => {
//     console.log(`Handling file upload for ${stepId} - ${subStepId}`);
//     handleConfirm(stepId, subStepId);
//   };

//   const handleDownload = (stepId, subStepId) => {
//     console.log(`Handling file download for ${stepId} - ${subStepId}`);
//     handleConfirm(stepId, subStepId);
//   };

//   const handleConfirm = (stepId, subStepId) => {
//     setCompletedSteps(prev => ({
//       ...prev,
//       [`${stepId}-${subStepId}`]: true
//     }));
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const renderStepIcon = (completed, type) => {
//     if (completed) {
//       return <Check className="w-5 h-5 text-green-500" />;
//     }
//     if (type === 'AUTOMATION') {
//       return <Settings className="w-5 h-5 text-blue-500" />;
//     }
//     if (type === 'MANUAL') {
//       return <User className="w-5 h-5 text-purple-500" />;
//     }
//     return <Clock className="w-5 h-5 text-gray-400" />;
//   };

//   const renderSubStep = (section, subStep) => {
//     const isCompleted = completedSteps[`${section.id}-${subStep.id}`];

//     return (
//       <div key={subStep.id} className="flex items-center space-x-3 py-2">
//         {renderStepIcon(isCompleted, subStep.type)}
//         <span className="text-sm text-gray-700">{subStep.label}</span>

//         <div className="ml-auto flex items-center space-x-2">
//           {subStep.hasFileUpload && (
//             <label className="cursor-pointer">
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={() => handleFileUpload(section.id, subStep.id)}
//               />
//               <Upload size={16} className="text-blue-500 hover:text-blue-600" />
//             </label>
//           )}

//           {subStep.hasDownload && (
//             <button
//               onClick={() => handleDownload(section.id, subStep.id)}
//               className="cursor-pointer"
//             >
//               <Download size={16} className="text-blue-500 hover:text-blue-600" />
//             </button>
//           )}

//           {subStep.hasConfirm && (
//             <button
//               onClick={() => handleConfirm(section.id, subStep.id)}
//               className="px-2 py-1 text-xs text-blue-500 hover:text-blue-600 font-medium"
//             >
//               Confirm
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
//       <div className="space-y-4">
//         {Object.values(sections).map((section) => (
//           <div key={section.id} className="border rounded-lg p-4">
//             <div
//               className="flex items-center space-x-2 cursor-pointer"
//               onClick={() => toggleSection(section.id)}
//             >
//               <ChevronRight
//                 size={20}
//                 className={`text-blue-500 transform transition-transform ${expandedSections[section.id] ? 'rotate-90' : ''
//                   }`}
//               />
//               <span className="font-medium text-gray-700">{section.label}</span>
//             </div>

//             {expandedSections[section.id] && (
//               <div className="ml-6 space-y-1 mt-2">
//                 {section.subSteps.map((subStep) => renderSubStep(section, subStep))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <Alert className="mt-6">
//         <AlertCircle className="h-4 w-4" />
//         <AlertDescription>
//           Click Confirm after completing each manual step to track your progress.
//         </AlertDescription>
//       </Alert>
//     </div>
//   );
// };

// export default ProcessTracker;