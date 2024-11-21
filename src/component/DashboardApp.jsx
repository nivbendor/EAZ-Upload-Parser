import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Check, X, Pencil } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import CostBreakdown from './CostBreakdown';


const DashboardApp = () => {
    const [payrollData, setPayrollData] = useState([
        { id: 1, role: 'Lead Engineer', monthlySalary: 18000, startMonth: 'Jan', endMonth: 'Dec', isEditing: false },
        { id: 2, role: 'Product Manager 1', monthlySalary: 16000, startMonth: 'Jan', endMonth: 'Dec', isEditing: false },
        { id: 3, role: 'UX Designer - Outsource', monthlySalary: 3000, startMonth: 'Jan', endMonth: 'February', isEditing: false },
        { id: 4, role: 'BI Analyst', monthlySalary: 15000, startMonth: 'Mar', endMonth: 'Dec', isEditing: false },
        { id: 5, role: 'Frontend Engineer', monthlySalary: 17000, startMonth: 'Apr', endMonth: 'Dec', isEditing: false },
        { id: 6, role: 'UX Designer', monthlySalary: 7000, startMonth: 'May', endMonth: 'Dec', isEditing: false },
        { id: 7, role: 'Product Manager 2', monthlySalary: 16000, startMonth: 'Jul', endMonth: 'Dec', isEditing: false }
    ]);

    const [monthlyData, setMonthlyData] = useState([]);
    const [totalAnnualCost, setTotalAnnualCost] = useState(0);
    const [averageMonthlyPayroll, setAverageMonthlyPayroll] = useState(0);
    const [totalAnnualPayroll, setTotalAnnualPayroll] = useState(0);
    const [highestPaidRole, setHighestPaidRole] = useState({ role: '', salary: 0 });

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const calculateAnnualCost = (startMonth, endMonth, monthlySalary) => {
        const monthMap = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };

        const normalizeMonth = (month) => {
            const monthAbbreviations = {
                January: 'Jan', February: 'Feb', March: 'Mar', April: 'Apr',
                May: 'May', June: 'Jun', July: 'Jul', August: 'Aug',
                September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec'
            };
            return monthAbbreviations[month] || month;
        };

        // Normalize start and end months
        const normalizedStart = normalizeMonth(startMonth);
        const normalizedEnd = normalizeMonth(endMonth);

        // Map normalized months to indices
        const startIdx = monthMap[normalizedStart];
        const endIdx = monthMap[normalizedEnd];

        // Validate month indices
        if (startIdx === undefined || endIdx === undefined) {
            console.warn(`Invalid startMonth (${startMonth}) or endMonth (${endMonth}) after normalization. Start: ${normalizedStart}, End: ${normalizedEnd}`);
            return 0;
        }

        // Validate and parse salary
        const salary = parseFloat(monthlySalary);
        if (isNaN(salary) || salary <= 0) {
            console.warn(`Invalid monthly salary for calculation: ${monthlySalary}`);
            return 0;
        }

        // Calculate total months (handle year boundary)
        const totalMonths = startIdx <= endIdx
            ? endIdx - startIdx + 1  // Same year
            : 12 - startIdx + endIdx + 1; // Across years

        // Debugging logs
        console.log(`Calculating Annual Cost: Start (${startMonth} -> ${normalizedStart}, Index: ${startIdx}), End (${endMonth} -> ${normalizedEnd}, Index: ${endIdx}), Total Months: ${totalMonths}, Monthly Salary: ${salary}`);

        // Return total annual cost
        return totalMonths * salary;
    };




    const handleEdit = (id) => {
        setPayrollData(payrollData.map(item =>
            item.id === id ? { ...item, isEditing: true } : item
        ));
    };

    const handleSave = (id, newSalary) => {
        const updatedPayrollData = payrollData.map(item =>
            item.id === id
                ? { ...item, monthlySalary: parseFloat(newSalary), isEditing: false }
                : item
        );

        console.log("Updated Payroll Data:", updatedPayrollData);
        setPayrollData(updatedPayrollData);
    };





    const handleCancel = (id) => {
        setPayrollData(payrollData.map(item =>
            item.id === id ? { ...item, isEditing: false } : item
        ));
    };

    useEffect(() => {
        const cachedCosts = {}; // Cache for already-calculated costs

        const monthlyCalculations = Array(12).fill(0).map((_, monthIndex) => {
            const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex];

            const activeRoles = payrollData.filter(role => {
                const startIdx = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(role.startMonth);
                const endIdx = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(role.endMonth);

                if (startIdx === -1 || endIdx === -1) return false;

                return monthIndex >= startIdx && monthIndex <= endIdx;
            });

            const payroll = activeRoles.reduce((sum, role) => {
                // Use cached value if available
                if (!cachedCosts[role.id]) {
                    cachedCosts[role.id] = calculateAnnualCost(role.startMonth, role.endMonth, role.monthlySalary);
                }
                return sum + role.monthlySalary;
            }, 0);

            const tools = activeRoles.length * 200;
            const infrastructure = activeRoles.length * 900;
            const totalCost = payroll + tools + infrastructure;

            return { month, payroll, tools, infrastructure, headcount: activeRoles.length, totalCost };
        });

        setMonthlyData(monthlyCalculations);

        const totalCost = monthlyCalculations.reduce((sum, month) => sum + month.totalCost, 0);
        setTotalAnnualCost(totalCost);
    }, [payrollData]);




    // Test case
    console.log(calculateAnnualCost('Jan', 'Feb', 3000)); // Expected output: 6000


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="mx-auto min-w-[1024px] max-w-[1440px] px-8">

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Finance Dashboard 2025</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="text-lg font-semibold text-gray-600">Total Annual Cost</div>
                                <div className="text-3xl font-bold text-blue-600">
                                    {formatCurrency(totalAnnualCost)}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="text-lg font-semibold text-gray-600">Team Growth</div>
                                <div className="text-3xl font-bold text-purple-600">
                                    2 → 5 people
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Cost Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyData}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => formatCurrency(value)} />
                                        <Legend />
                                        <Bar dataKey="payroll" stackId="a" fill="#4f46e5" name="Payroll" />
                                        <Bar dataKey="tools" stackId="a" fill="#10b981" name="Tools" />
                                        <Bar dataKey="infrastructure" stackId="a" fill="#f59e0b" name="Infrastructure" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payroll Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="text-sm text-blue-600 font-medium">Average Monthly Payroll</div>
                                    <div className="text-2xl font-bold">{formatCurrency(averageMonthlyPayroll)}</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="text-sm text-green-600 font-medium">Highest Paid Role</div>
                                    <div className="text-2xl font-bold">{highestPaidRole.role}</div>
                                    <div className="text-sm text-green-600">{formatCurrency(highestPaidRole.salary)}/month</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="text-sm text-purple-600 font-medium">Total Annual Payroll</div>
                                    <div className="text-2xl font-bold">{formatCurrency(totalAnnualPayroll)}</div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Salary</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2025 Cost</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {payrollData.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap font-medium">{item.role}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-2">
                                                        {item.isEditing ? (
                                                            <>
                                                                <input
                                                                    type="number"
                                                                    defaultValue={item.monthlySalary}
                                                                    className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') {
                                                                            handleSave(item.id, e.target.value);
                                                                        }
                                                                    }}
                                                                />

                                                                <button
                                                                    onClick={() => handleSave(item.id, document.querySelector(`input[type="number"]`).value)}
                                                                    className="p-1 text-green-600 hover:text-green-700"
                                                                >
                                                                    <Check size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleCancel(item.id)}
                                                                    className="p-1 text-red-600 hover:text-red-700"
                                                                >
                                                                    <X size={16} />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="text-gray-800">{formatCurrency(item.monthlySalary)}</span>
                                                                <button
                                                                    onClick={() => handleEdit(item.id)}
                                                                    className="p-1 text-blue-600 hover:text-blue-700"
                                                                >
                                                                    <Pencil size={16} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.startMonth} 2025</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {formatCurrency(calculateAnnualCost(item.startMonth, item.endMonth, item.monthlySalary))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-md font-semibold mb-4">Team Growth Timeline</h4>
                                <div className="relative">
                                    <div className="absolute h-full w-px bg-gray-200 left-32"></div>
                                    {payrollData.map((item) => (
                                        <div key={item.id} className="relative flex items-center mb-4">
                                            <div className="w-32 font-medium text-gray-600">{item.startMonth} 2025</div>
                                            <div className="w-4 h-4 rounded-full bg-blue-500 -ml-2"></div>
                                            <div className="ml-4 flex-1">
                                                <div className="font-medium">{item.role}</div>
                                                <div className="text-sm text-gray-500">{formatCurrency(item.monthlySalary)}/month</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>


                    </Card>
                    <CostBreakdown />
                </div>
            </div>
        </div>
    );
};

export default DashboardApp;