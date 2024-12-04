import React, { useEffect, useState } from 'react';
import XLSXProcessor from './component/XLSXProcessor';
import { fetchDataDaily } from './component/GoogleSheetsAPI';
import ActiveCampaignProcessor from './component/ActiveCampaignProcessor';
import DashboardApp from './component/DashboardApp';
import ProcessTracker from './CensusMaestro/test';

function App() {
  const [showBudget, setShowBudget] = useState(false);
  const [showCensusTracker, setShowCensusTracker] = useState(false);
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setShowBudget(searchParams.has('budget'));
    setShowCensusTracker(searchParams.has('censustracker'));

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDataDaily();
        setSheetData(data);
        setError(null);
      } catch (err) {
        setError('Error fetching data from Google Sheets');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (showBudget) {
    return <DashboardApp />;
  }

  if (showCensusTracker) {
    return <ProcessTracker />;
  }

  return (
    <div className="App">
      <h1>XLSX Processor with Google Sheets Integration</h1>
      <ActiveCampaignProcessor />
      <div className="google-sheets-data">
        <h2>Google Sheets Data</h2>
        {isLoading && <p>Loading data from Google Sheets...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && sheetData.length > 0 && (
          <table>
            <thead>
              <tr>
                {sheetData[0].map((header: string, index: number) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sheetData.slice(1).map((row: string[], rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.map((cell: string, cellIndex: number) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
