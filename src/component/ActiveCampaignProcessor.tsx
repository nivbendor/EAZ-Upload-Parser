import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

// Configuration
const API_KEY = '1de595cbdca6aae9edb4b135e5f3aadc12429c1ee1f083c631642d6e95f7e77377fb807e';
const API_URL = 'https://cakewalkbenefits36408.api-us1.com';
const LIST_ID = '2';

interface Contact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  updated_utc_timestamp: string;
  phone: string;
  [key: string]: string;
}

interface ApiResponse {
  contacts: Contact[];
  meta: {
    next?: string;
  };
}

interface CustomField {
  id: string;
  title: string;
}

interface FieldValue {
  field: string;
  value: string;
}

const ActiveCampaignProcessor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getActiveCampaignContacts = async (): Promise<Contact[]> => {
    let allContacts: Contact[] = [];
    let url = `${API_URL}/api/3/contacts?listid=${LIST_ID}&limit=100`;
    const headers = { 'Api-Token': API_KEY };

    while (url) {
      const response = await axios.get<ApiResponse>(url, { headers });
      if (response.status === 200) {
        allContacts = [...allContacts, ...response.data.contacts];
        url = response.data.meta.next || '';
      } else {
        throw new Error(`Failed to fetch data. Status Code: ${response.status}`);
      }
    }

    return allContacts;
  };

  const getCustomFields = async (): Promise<Record<string, string>> => {
    const url = `${API_URL}/api/3/fields`;
    const headers = { 'Api-Token': API_KEY };
    const response = await axios.get<{ fields: CustomField[] }>(url, { headers });

    if (response.status === 200) {
      return response.data.fields.reduce((acc, field) => {
        acc[field.id] = field.title;
        return acc;
      }, {} as Record<string, string>);
    } else {
      throw new Error(`Failed to fetch custom fields. Status Code: ${response.status}`);
    }
  };

  const getContactCustomFieldValues = async (contactId: string): Promise<FieldValue[]> => {
    const url = `${API_URL}/api/3/contacts/${contactId}/fieldValues`;
    const headers = { 'Api-Token': API_KEY };
    const response = await axios.get<{ fieldValues: FieldValue[] }>(url, { headers });

    if (response.status === 200) {
      return response.data.fieldValues || [];
    } else {
      throw new Error(`Failed to fetch custom field values for contact ${contactId}. Status Code: ${response.status}`);
    }
  };

  const processData = async (contacts: Contact[], customFields: Record<string, string>): Promise<[string[], string[][]]> => {
    const headers = ['id', 'email', 'firstName', 'lastName', 'updated_utc_timestamp', 'phone', ...Object.values(customFields)];
    const rows: string[][] = [];

    for (const contact of contacts) {
      const row: string[] = [
        contact.id,
        contact.email,
        contact.firstName,
        contact.lastName,
        contact.updated_utc_timestamp,
        contact.phone
      ];

      const customFieldValues = await getContactCustomFieldValues(contact.id);
      const customFieldMap = customFieldValues.reduce((acc, field) => {
        acc[field.field] = field.value;
        return acc;
      }, {} as Record<string, string>);

      Object.keys(customFields).forEach((fieldId) => {
        row.push(customFieldMap[fieldId] || 'N/A');
      });

      rows.push(row);
    }

    return [headers, rows];
  };

  const filterLast24Hours = (rows: string[][]): string[][] => {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return rows.filter(row => new Date(row[4]) >= last24Hours);
  };

  const generateExcel = (headers: string[], rows: string[][], last24Rows: string[][]) => {
    const wb = XLSX.utils.book_new();
    const allRecordsWs = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const last24HoursWs = XLSX.utils.aoa_to_sheet([headers, ...last24Rows]);
    
    XLSX.utils.book_append_sheet(wb, allRecordsWs, 'All Records');
    XLSX.utils.book_append_sheet(wb, last24HoursWs, 'Last 24 hours submissions');
    
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  };

  const handleProcessData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const contacts = await getActiveCampaignContacts();
      const customFields = await getCustomFields();
      const [headers, rows] = await processData(contacts, customFields);
      
      // Sort rows by updated_utc_timestamp
      rows.sort((a, b) => new Date(b[4]).getTime() - new Date(a[4]).getTime());

      const last24Rows = filterLast24Hours(rows);
      const excelBlob = generateExcel(headers, rows, last24Rows);
      
      // Create a download link and trigger the download
      const url = URL.createObjectURL(excelBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'active_campaign_contacts_with_custom_fields.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Active Campaign Data Processor</h2>
            <button
            onClick={handleProcessData}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {isLoading ? 'Processing...' : 'Process and Download Data'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        </div>
    );
    };

export default ActiveCampaignProcessor;