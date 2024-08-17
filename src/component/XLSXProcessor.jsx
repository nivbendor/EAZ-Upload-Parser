import React, { useState, useEffect } from 'react';
import { parse } from 'papaparse';
import * as XLSX from 'xlsx';
import { startLogging, stopLogging, downloadLogs } from '../consoleLogger';

const CSVProcessor = () => {
  const [file, setFile] = useState(null);
  const [processedData, setProcessedData] = useState([]);
  const [showConsoleButton, setShowConsoleButton] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setShowConsoleButton(urlParams.get('console') === '1');
  }, []);

  const safelyAccessData = (data, key) => {
    console.log('Attempting to access:', key);
    console.log('Data:', JSON.stringify(data, null, 2));
    const value = data && data[key] !== undefined ? data[key] : null;
    console.log('Accessed value:', value);
    return value;
  };

  const processCSV = (rawData) => {
    console.log('Raw CSV data:', JSON.stringify(rawData, null, 2));
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const data = rawData[0]; // Always use the first object in the array
    console.log('Processing data:', JSON.stringify(data, null, 2));
    
    const processed = [];
    
    // Process owner
    const ownerData = {
      'Relation Type': 'Owner',
      'First Name': safelyAccessData(data, 'BO First Name') || '',
      'Last Name': safelyAccessData(data, 'BO Last Name') || '',
      'Date of Birth': '01/01/1999',
      'Gender': 'M',
      'Email': safelyAccessData(data, 'BO Email') || '',
      'Mobile Phone': safelyAccessData(data, 'BO Phone Number') || '',
      'Original Date of Hire': tenDaysAgo,
      'Position/Title': 'Employee',
      'Annual Salary': 50000,
      'Employee Type': 'Fulltime'
    };
    console.log('Processed owner data:', ownerData);
    processed.push(ownerData);
    // Process employees
    for (let i = 1; i <= 10; i++) {
      const firstName = safelyAccessData(data, `e${i} First Name`);
      const lastName = safelyAccessData(data, `e${i} Last Name`);
      const email = safelyAccessData(data, `e${i} Email`);
      
      if (firstName || lastName || email) {
        processed.push({
          'Relation Type': 'Employee',
          'First Name': firstName || '',
          'Last Name': lastName || '',
          'Date of Birth': '01/01/1999',
          'Gender': 'M',
          'Email': email || '',
          'Mobile Phone': '',
          'Original Date of Hire': tenDaysAgo,
          'Position/Title': 'Employee',
          'Annual Salary': 50000,
          'Employee Type': 'Fulltime'
        });
      }
    }

    console.log('Final processed data:', processed);
    return processed;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) setFile(file);
  };

  const handleProcessFile = () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    if (showConsoleButton) {
      startLogging();
    }

    parse(file, {
      complete: (results) => {
        console.log('Parse complete. Results:', results);
        try {
          const processed = processCSV(results.data);
          setProcessedData(processed);
          setError(null);
        } catch (err) {
          console.error('Error processing CSV:', err);
          setError('Error processing file. Please check the console for details.');
        }
        
        if (showConsoleButton) {
          stopLogging();
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setError('Error parsing file. Please check the file format.');
      },
      header: true
    });
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Processed Data');
    XLSX.writeFile(workbook, 'processed_data.xlsx');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            CSV/XLSX Processor
          </h1>
          <div className="mb-6">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload CSV File
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              accept=".csv"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <button
            onClick={handleProcessFile}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Process File
          </button>
          
          {error && <p className="mt-4 text-red-500">{error}</p>}
          
                  
          {processedData.length > 0 && (
            <div className="mt-8">
              <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                {Object.keys(processedData[0]).map(key => (
                  <th key={key} className="border border-gray-400 px-4 py-2">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processedData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="border border-gray-400 px-4 py-2">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Download Processed XLSX
                </button>
                {showConsoleButton && (
                  <button
                    onClick={downloadLogs}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Download Console Logs
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVProcessor;