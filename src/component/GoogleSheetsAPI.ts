import axios from 'axios';

const API_KEY = 'AIzaSyDuJRo488RvLKJ9NeyVJ7T9d41d4Gct5ng'; // Replace with your actual API key
const SPREADSHEET_ID = '527963258'; // Replace with your actual spreadsheet ID
const SHEET_NAME = 'Sheet1'; // Replace with your actual sheet name

interface GoogleSheetsResponse {
  range: string;
  majorDimension: string;
  values: any[][];
}

export async function fetchSheetData(): Promise<any[][]> {
  try {
    console.log(`Attempting to fetch data from spreadsheet: ${SPREADSHEET_ID}, sheet: ${SHEET_NAME}`);
    const response = await axios.get<GoogleSheetsResponse>(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}`,
      {
        params: {
          key: API_KEY,
        },
      }
    );

    console.log('Response received:', response.status, response.statusText);
    return response.data.values;
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    throw error;
  }
}

export async function fetchDataDaily(): Promise<any[][]> {
  try {
    const data = await fetchSheetData();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error in daily data fetch:', error);
    throw error;
  }
}