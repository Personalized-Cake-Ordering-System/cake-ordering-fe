"use client";
import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "./CardTest";
import Navbar from './DashboardNavbar';
import Sidebar from './DashboardSidebar';
import { Button } from './ButtonTest';

// Enhanced mock data with year and week information
const generateData = (period: any) => {
    if (period === 'year') {
        return [
            { period: '2023', visitors: 48000, revenue: 28400 },
            { period: '2024', visitors: 52000, revenue: 31800 },
            { period: '2025', visitors: 55000, revenue: 34900 }
        ];
    } else if (period === 'month') {
        return [
            { period: 'Jan', visitors: 4000, revenue: 2400 },
            { period: 'Feb', visitors: 3000, revenue: 1398 },
            { period: 'Mar', visitors: 5000, revenue: 3800 },
            { period: 'Apr', visitors: 4500, revenue: 3908 },
            { period: 'May', visitors: 6000, revenue: 4800 },
            { period: 'Jun', visitors: 4800, revenue: 3800 },
            { period: 'Jul', visitors: 3500, revenue: 4300 }
        ];
    } else {
        return [
            { period: 'Week 1', visitors: 1200, revenue: 800 },
            { period: 'Week 2', visitors: 1400, revenue: 900 },
            { period: 'Week 3', visitors: 1100, revenue: 750 },
            { period: 'Week 4', visitors: 1300, revenue: 850 }
        ];
    }
};

const orderData = [
    { status: 'Completed', value: 65 },
    { status: 'Pending', value: 25 },
    { status: 'Processing', value: 10 }
];

const COLORS = {
    primary: '#6366f1',
    secondary: '#ec4899',
    tertiary: '#06b6d4',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    pieColors: ['#6366f1', '#ec4899', '#06b6d4', '#22c55e']
};

interface TimeFilterProps {
    selectedPeriod: string;
    onPeriodChange: (period: string) => void;
}

// Enhanced TimeFilter component with professional styling
const TimeFilter: React.FC<TimeFilterProps> = ({ selectedPeriod, onPeriodChange }) => (
    <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg p-2 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        {['week', 'month', 'year'].map((period) => (
            <Button
                key={period}
                onClick={() => onPeriodChange(period)}
                className={`
                    relative min-w-[80px] px-4 py-2 text-sm font-semibold rounded-lg 
                    transition-all duration-300 ease-in-out
                    ${selectedPeriod === period
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                    ${selectedPeriod === period
                        ? 'transform scale-105 hover:scale-105'
                        : 'hover:transform hover:scale-102'
                    }
                    flex items-center justify-center gap-2
                    before:absolute before:inset-0 before:rounded-lg before:transition-opacity
                    ${selectedPeriod === period
                        ? 'before:bg-white/10 before:opacity-100'
                        : 'before:opacity-0'
                    }
                `}
            >
                {period === 'week' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                )}
                {period === 'month' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                )}
                {period === 'year' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                )}
                <span>{period.charAt(0).toUpperCase() + period.slice(1)}</span>
            </Button>
        ))}
    </div>
);

const AdminDashboard = () => {
    const [trendPeriod, setTrendPeriod] = useState('month');
    const [performancePeriod, setPerformancePeriod] = useState('month');
    const [orderPeriod, setOrderPeriod] = useState('month');

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 w-full">
                <Navbar />
                <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
                    <h1 className="text-3xl font-bold mb-6 dark:text-white">Dashboard Overview</h1>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {[
                            { label: 'Revenue', value: '$32,981', change: '+2.4%', trend: 'up' },
                            { label: 'Orders', value: '2,145', change: '+3.5%', trend: 'up' },
                            { label: 'Customers', value: '4,678', change: '+11.5%', trend: 'up' },
                            { label: 'Conversion', value: '2.4%', change: '+0.8%', trend: 'up' }
                        ].map((stat, index) => (
                            <Card key={index} className="dark:border-gray-800">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm text-black-200 font-medium dark:text-gray-200">
                                        {stat.label}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold dark:text-white">{stat.value}</div>
                                    <p className="text-xs text-green-500">{stat.change}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <Card className="dark:border-gray-800">
                            <CardHeader>
                                <div className="flex flex-row justify-between items-start">
                                    <CardTitle className="text-gray-900 dark:text-white">Revenue & Visitors Trend</CardTitle>
                                    <TimeFilter selectedPeriod={trendPeriod} onPeriodChange={setTrendPeriod} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={generateData(trendPeriod)}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="period" stroke="#6B7280" />
                                        <YAxis stroke="#6B7280" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1F2937',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: '#F3F4F6'
                                            }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke={COLORS.primary}
                                            strokeWidth={2}
                                            dot={{ fill: COLORS.primary }}
                                            activeDot={{ r: 8 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="visitors"
                                            stroke={COLORS.secondary}
                                            strokeWidth={2}
                                            dot={{ fill: COLORS.secondary }}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="dark:border-gray-800">
                            <CardHeader>
                                <div className="flex flex-row justify-between items-start">
                                    <CardTitle className="text-gray-900 dark:text-white">Order Distribution</CardTitle>
                                    <TimeFilter selectedPeriod={orderPeriod} onPeriodChange={setOrderPeriod} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={orderData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label
                                        >
                                            {orderData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS.pieColors[index % COLORS.pieColors.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                // backgroundColor: '#1F2937',
                                                border: 'none',
                                                borderRadius: '8px',
                                                color: '#F3F4F6'
                                            }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="dark:border-gray-800">
                        <CardHeader>
                            <div className="flex flex-row justify-between items-start">
                                <CardTitle className="text-gray-900 dark:text-white">Monthly Performance</CardTitle>
                                <TimeFilter selectedPeriod={performancePeriod} onPeriodChange={setPerformancePeriod} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={generateData(performancePeriod)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="period" stroke="#6B7280" />
                                    <YAxis stroke="#6B7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#F3F4F6'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="visitors" fill={COLORS.tertiary} radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="revenue" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;