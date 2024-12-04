import React, { useState } from 'react';
import { Check, Clock, X, ChevronRight, Upload } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Example Data
const exampleData = {
  clientShell: [
    { ClientName: 'Hershey & Associates LLC', UniqueIdentifier: 'Cakewalk' },
    { ClientName: 'Tim Kampsen Agency Inc', UniqueIdentifier: 'Cakewalk' },
    { ClientName: 'Brian Jorgensen agency llc', UniqueIdentifier: 'Cakewalk' },
  ],
  clientAssignment: [
    { UserId: 1, ClientId: 1 },
    { UserId: 1, ClientId: 2 },
    { UserId: 1, ClientId: 3 },
  ],
  productAssociation: [
    { ClientId: 1234, ObjectName: 'Accident_46', DisplaySequence: 1 },
    { ClientId: 1234, ObjectName: 'BasicLifeADD_186', DisplaySequence: 2 },
  ],
  census: [
    {
      FirstName: 'Kayla',
      LastName: 'Small',
      WorkEmail: 'ksmall@amfam.com',
      ClientName: 'Kayla Small Agency & Associates LLC',
      ClientId: 3878,
    },
  ],
};

// Main Content Area Component
const MainContentArea = ({ selectedDataSource }) => {
  const renderData = () => {
    const data = exampleData[selectedDataSource] || [];
    if (data.length === 0) {
      return <p className="text-gray-500">No data available for {selectedDataSource}.</p>;
    }

    return (
      <table className="table-auto w-full text-sm border-collapse border border-gray-200">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="border border-gray-200 px-2 py-1 text-left text-gray-700">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {Object.values(row).map((value, i) => (
                <td key={i} className="border border-gray-200 px-2 py-1">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-lg font-bold">Main Content Area</h2>
      {selectedDataSource ? (
        renderData()
      ) : (
        <p className="text-gray-500">Select a data source to view the records.</p>
      )}
    </div>
  );
};

// Right Sidebar Component
const RightSidebar = ({ setSelectedDataSource }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const handleSourceClick = (source) => {
    setSelectedDataSource(source);
    toast.info(`Viewing data for: ${source}`);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-bold">Right Sidebar</h2>
      <button
        onClick={toggleExpanded}
        className="flex items-center justify-between px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Data Sources
        <ChevronRight className={`transform ${expanded ? 'rotate-90' : ''}`} />
      </button>

      {expanded && (
        <ul className="space-y-2 pl-4">
          {Object.keys(exampleData).map((source) => (
            <li
              key={source}
              className="cursor-pointer text-blue-500 hover:underline"
              onClick={() => handleSourceClick(source)}
            >
              {source}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Main Dashboard
const BatchTrackingDashboard = () => {
  const [selectedDataSource, setSelectedDataSource] = useState(null);

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-4 gap-6">
      {/* Main Content Area */}
      <div className="col-span-3">
        <MainContentArea selectedDataSource={selectedDataSource} />
      </div>

      {/* Right Sidebar */}
      <div className="col-span-1">
        <RightSidebar setSelectedDataSource={setSelectedDataSource} />
      </div>
    </div>
  );
};

export default BatchTrackingDashboard;


