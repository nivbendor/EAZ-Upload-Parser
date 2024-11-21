import React, { useState } from 'react';
import { Check, Clock, X, ChevronRight, Upload } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProcessTracker = () => {
  const [expandedSections, setExpandedSections] = useState({
    clientShell: true,
    productAssociation: false,
    ownerCensus: false,
    employeeCensus: false
  });

  const [completedSteps, setCompletedSteps] = useState({});

  const sections = {
    clientShell: {
      id: 'clientShell',
      label: 'Client Shell',
      subSteps: [
        { id: 'uploadMembers', label: 'Upload members list', hasFileUpload: true, uploadFunction: 'updateMemberList' },
        { id: 'importSubmissions', label: 'Import new business submissions' },
        { id: 'duplicationValidation', label: 'Duplication Validation' },
        { id: 'poolingSubmissions', label: 'Pooling validated submissions' },
        { id: 'generateBatchId', label: 'Generate Batch ID' },
        { id: 'generateFile', label: 'Generating Client Shell file' },
        { id: 'platformUpload', label: 'Go to platform', hasInstructions: true }
      ]
    },
    productAssociation: {
      id: 'productAssociation',
      label: 'Product Association',
      subSteps: [
        { id: 'uploadClients', label: 'Upload client list', hasFileUpload: true, uploadFunction: 'updateClientList' },
        { id: 'generateFile', label: 'Generating Product Association file' },
        { id: 'platformUpload', label: 'Go to platform', hasInstructions: true }
      ]
    },
    ownerCensus: {
      id: 'ownerCensus',
      label: 'Owner Census',
      subSteps: [
        { id: 'associateIds', label: 'Associating Owners Client ID' },
        { id: 'populateValues', label: 'Populating hardcoded values' },
        { id: 'census', label: 'Censuing it' },
        { id: 'generateFile', label: 'Generating Owner Census file' },
        { id: 'platformUpload', label: 'Go to platform', hasInstructions: true }
      ]
    },
    employeeCensus: {
      id: 'employeeCensus',
      label: 'Employee Census',
      subSteps: [
        { id: 'importRecords', label: 'Import new records' },
        { id: 'duplicationValidation', label: 'Duplication Validation' },
        { id: 'poolingSubmissions', label: 'Pooling validated submissions' },
        { id: 'generateBatchId', label: 'Generate Batch ID' },
        { id: 'generateFile', label: 'Generating Client Shell file' },
        { id: 'platformUpload', label: 'Go to platform', hasInstructions: true }
      ]
    }
  };

  const handleFileUpload = (stepId, subStepId) => {
    console.log(`Handling file upload for ${stepId} - ${subStepId}`);
  };

  const handleConfirm = (stepId, subStepId) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [`${stepId}-${subStepId}`]: true,
    }));
    // Trigger a Toast notification
    toast.success(`Step "${subStepId}" in "${stepId}" marked as completed!`);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderStepIcon = (completed) => {
    if (completed) {
      return <Check className="w-5 h-5 text-green-500" />;
    }
    return <Clock className="w-5 h-5 text-gray-400" />;
  };

  const renderSubStep = (section, subStep) => {
    const isCompleted = completedSteps[`${section.id}-${subStep.id}`];
    
    return (
      <div key={subStep.id} className="flex items-center space-x-3 py-2">
        {renderStepIcon(isCompleted)}
        <span className="text-sm text-gray-700">{subStep.label}</span>
        
        {subStep.hasFileUpload && (
          <div className="ml-auto">
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={() => handleFileUpload(section.id, subStep.id)}
              />
              <Upload size={16} className="text-blue-500 hover:text-blue-600" />
            </label>
          </div>
        )}
        
        {subStep.hasInstructions && (
          <button
          onClick={() => handleConfirm(section.id, subStep.id)}
          className="ml-auto px-2 py-1 text-xs text-blue-500 hover:text-blue-600 font-medium"
        >
          Confirm
        </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="space-y-4">
        {Object.values(sections).map((section) => (
          <div key={section.id} className="space-y-2">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <ChevronRight 
                size={20} 
                className={`text-blue-500 transform transition-transform ${
                  expandedSections[section.id] ? 'rotate-90' : ''
                }`}
              />
              <span className="font-medium text-gray-700">{section.label}</span>
            </div>
            
            {expandedSections[section.id] && (
              <div className="ml-6 space-y-1">
                {section.subSteps.map((subStep) => renderSubStep(section, subStep))}
              </div>
            )}
          </div>
        ))}
      </div>

 
    </div>
  );
};

const BatchTrackingDashboard = () => {
  const batchInfo = {
    batchId: 'XXX_C_EMP_122924_1734',
    dateStarted: '12/29/24 17:34',
    user: 'Niv BD',
    status: 'In Progress'
  };

  const metrics = {
    rawSubmissions: 0,
    clientShellUniqueIds: 0,
    productAssignmentUniqueIds: 0,
    owners: 0,
    rawEmployeeSubmissions: 0
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Current batch */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Current batch</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Batch ID</p>
            <p className="font-medium">{batchInfo.batchId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date Started</p>
            <p className="font-medium">{batchInfo.dateStarted}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User</p>
            <p className="font-medium">{batchInfo.user}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(batchInfo.status)}`}>
              {batchInfo.status}
            </span>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Raw submissions</p>
            <p className="text-2xl font-bold">{metrics.rawSubmissions}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Client Shell - # of Unique Client ID</p>
            <p className="text-2xl font-bold">{metrics.clientShellUniqueIds}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Product Assignment - # of Unique Client ID</p>
            <p className="text-2xl font-bold">{metrics.productAssignmentUniqueIds}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500"># of Owners</p>
            <p className="text-2xl font-bold">{metrics.owners}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500"># of Raw Employee Submissions</p>
            <p className="text-2xl font-bold">{metrics.rawEmployeeSubmissions}</p>
          </div>
        </div>
      </div>

      {/* Execution with Process Tracker */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Execution</h2>
        <ProcessTracker />
      </div>
       {/* ToastContainer for Notifications */}
       <ToastContainer />
    </div>
  );
};

export default BatchTrackingDashboard;