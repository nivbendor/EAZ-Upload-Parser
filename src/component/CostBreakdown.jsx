import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Input } from './ui/input';
import { Check, X, Pencil } from 'lucide-react';


const initialData = [
    {
        month: "January 2026",
        payroll: 34000,
        tools: 447,
        infrastructure: 2250,
        headcount: 2,
        details: "Lead Engineer, Product Manager"
    },
    {
        month: "February 2026",
        payroll: 34000,
        tools: 447,
        infrastructure: 2250,
        headcount: 2,
        details: "Same as January"
    },
    {
        month: "March 2026",
        payroll: 34000,
        tools: 447,
        infrastructure: 2250,
        headcount: 2,
        details: "Same as February"
    },
    {
        month: "April 2026",
        payroll: 51000,
        tools: 615,
        infrastructure: 2600,
        headcount: 3,
        details: "+Frontend Engineer"
    },
    {
        month: "May 2026",
        payroll: 58000,
        tools: 830,
        infrastructure: 2885,
        headcount: 4,
        details: "+UX Designer"
    },
    {
        month: "June 2026",
        payroll: 58000,
        tools: 830,
        infrastructure: 2885,
        headcount: 4,
        details: "Same as May"
    },
    {
        month: "July 2026",
        payroll: 74000,
        tools: 830,
        infrastructure: 4500,
        headcount: 5,
        details: "+Second Product Manager"
    },
    {
        month: "August 2026",
        payroll: 74000,
        tools: 830,
        infrastructure: 4500,
        headcount: 5,
        details: "Same as July"
    },
    {
        month: "September 2026",
        payroll: 74000,
        tools: 830,
        infrastructure: 4500,
        headcount: 5,
        details: "Same as August"
    },
    {
        month: "October 2026",
        payroll: 74000,
        tools: 830,
        infrastructure: 4500,
        headcount: 5,
        details: "Same as September"
    },
    {
        month: "November 2026",
        payroll: 74000,
        tools: 830,
        infrastructure: 4500,
        headcount: 5,
        details: "Same as October"
    },
    {
        month: "December 2026",
        payroll: 74000,
        tools: 830,
        infrastructure: 4500,
        headcount: 5,
        details: "Same as November"
    }
];



const CostBreakdown = () => {
    const [data, setData] = useState(initialData);
    const [viewMode, setViewMode] = useState('monthly');
    const [editingIndex, setEditingIndex] = useState(null);
    const handleEdit = (index) => {
        const newData = [...data];
        newData[index].isEditing = true;
        setData(newData);
    };
    
    const handleSave = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = Number(value);
        newData[index].isEditing = false;
        setData(newData);
    };
    
    const handleCancel = (index) => {
        const newData = [...data];
        newData[index].isEditing = false;
        setData(newData);
    };
    const aggregateByQuarter = () => {
        return Array.from({ length: 4 }, (_, i) => {
            const quarterMonths = data.slice(i * 3, (i + 1) * 3);
            return {
                period: `Q${i + 1} 2026`,
                payroll: quarterMonths.reduce((sum, m) => sum + m.payroll, 0) / 3,
                tools: quarterMonths.reduce((sum, m) => sum + m.tools, 0) / 3,
                infrastructure: quarterMonths.reduce((sum, m) => sum + m.infrastructure, 0) / 3,
                headcount: quarterMonths[2].headcount
            };
    
        });
    };

    const getAnnualData = () => [{
        period: '2026',
        payroll: data.reduce((sum, m) => sum + m.payroll, 0) / 12,
        tools: data.reduce((sum, m) => sum + m.tools, 0) / 12,
        infrastructure: data.reduce((sum, m) => sum + m.infrastructure, 0) / 12,
        headcount: data[11].headcount
    }];

    const getDisplayData = () => {
        switch (viewMode) {
            case 'quarterly':
                return aggregateByQuarter();
            case 'annual':
                return getAnnualData();
            default:
                return data;
        }
    };


    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
        <Card className="mb-8">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Cost Breakdown</CardTitle>
                    <div className="space-x-2">
                        {['monthly', 'quarterly', 'annual'].map(mode => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-4 py-2 rounded ${viewMode === mode
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-96 mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getDisplayData()}>
                            <XAxis dataKey={viewMode === 'monthly' ? 'month' : 'period'} />
                            <YAxis />
                            <Tooltip formatter={(value) => formatCurrency(value)} />
                            <Legend />
                            <Bar dataKey="payroll" stackId="a" fill="#4f46e5" name="Payroll" />
                            <Bar dataKey="tools" stackId="a" fill="#10b981" name="Tools" />
                            <Bar dataKey="infrastructure" stackId="a" fill="#f59e0b" name="Infrastructure" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {viewMode === 'monthly' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Headcount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payroll</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tools</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Infrastructure</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((month, index) => (
                                    <tr key={month.month}>
                                        <td className="px-6 py-4 whitespace-nowrap">{month.month}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{month.headcount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {month.isEditing ? (
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="number"
                                                        defaultValue={month.payroll}
                                                        className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleSave(index, 'payroll', e.target.value);
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => handleSave(index, 'payroll', document.querySelector(`input[type="number"]`).value)}
                                                        className="p-1 text-green-600 hover:text-green-700"
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancel(index)}
                                                        className="p-1 text-red-600 hover:text-red-700"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-gray-800">{formatCurrency(month.payroll)}</span>
                                                    <button
                                                        onClick={() => handleEdit(index)}
                                                        className="p-1 text-blue-600 hover:text-blue-700"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {month.isEditing ? (
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="number"
                                                        defaultValue={month.tools}
                                                        className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleSave(index, 'tools', e.target.value);
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => handleSave(index, 'tools', document.querySelector(`input[type="number"]`).value)}
                                                        className="p-1 text-green-600 hover:text-green-700"
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancel(index)}
                                                        className="p-1 text-red-600 hover:text-red-700"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-gray-800">{formatCurrency(month.tools)}</span>
                                                    <button
                                                        onClick={() => handleEdit(index)}
                                                        className="p-1 text-blue-600 hover:text-blue-700"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {month.isEditing ? (
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="number"
                                                        defaultValue={month.infrastructure}
                                                        className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleSave(index, 'infrastructure', e.target.value);
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => handleSave(index, 'infrastructure', document.querySelector(`input[type="number"]`).value)}
                                                        className="p-1 text-green-600 hover:text-green-700"
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancel(index)}
                                                        className="p-1 text-red-600 hover:text-red-700"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-gray-800">{formatCurrency(month.infrastructure)}</span>
                                                    <button
                                                        onClick={() => handleEdit(index)}
                                                        className="p-1 text-blue-600 hover:text-blue-700"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                                            {formatCurrency(month.payroll + month.tools + month.infrastructure)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CostBreakdown;