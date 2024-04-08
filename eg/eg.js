// import React from 'react';

// function YourComponent() {
//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//             <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
//                 <div className="flex justify-between mb-4 items-start">
//                     <div className="font-medium">Order Statistics</div>
//                      <div className="dropdown">
//                         <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
//                         <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
//                             <li>
//                                 <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
//                             </li>
//                             <li>
//                                 <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
//                             </li>
//                             <li>
//                                 <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
//                             </li>
//                         </ul>
//                     </div> 
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//                     <div className="rounded-md border border-dashed border-gray-200 p-4">
//                         <div className="flex items-center mb-0.5">
//                             <div className="text-xl font-semibold">10</div>
//                             <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">$80</span>
//                         </div>
//                         <span className="text-gray-400 text-sm">Active</span>
//                     </div>
//                     <div className="rounded-md border border-dashed border-gray-200 p-4">
//                         <div className="flex items-center mb-0.5">
//                             <div className="text-xl font-semibold">50</div>
//                             <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">+$469</span>
//                         </div>
//                         <span className="text-gray-400 text-sm">Completed</span>
//                     </div>
//                     <div className="rounded-md border border-dashed border-gray-200 p-4">
//                         <div className="flex items-center mb-0.5">
//                             <div className="text-xl font-semibold">4</div>
//                             <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">-$130</span>
//                         </div>
//                         <span className="text-gray-400 text-sm">Canceled</span>
//                     </div>
//                 </div>
//                 <div>
//                     <canvas id="order-chart"></canvas>
//                 </div>
//             </div>
//             <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
//                 <div className="flex justify-between mb-4 items-start">
//                     <div className="font-medium">Earnings</div>
//                     <div className="dropdown">
//                         <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
//                         <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
//                             <li>
//                                 <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
//                             </li>
//                             <li>
//                                 <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
//                             </li>
//                             <li>
//                                 <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full min-w-[460px]">
//                         <thead>
//                             <tr>
//                                 <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
//                                 <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Earning</th>
//                                 <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td className="py-2 px-4 border-b border-b-gray-50">
//                                     <div className="flex items-center">
//                                         <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
//                                         <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
//                                     </div>
//                                 </td>
//                                 <td className="py-2 px-4 border-b border-b-gray-50">
//                                     <span className="text-[13px] font-medium text-emerald-500">+$235</span>
//                                 </td>
//                                 <td className="py-2 px-4 border-b border-b-gray-50">
//                                     <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
//                                 </td>
//                             </tr>
//                             {/* Add more table rows here */}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default YourComponent;
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function AdminChart() {
    const chartRef = useRef(null);
    const baseURL = "http://127.0.0.1:8000";
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Orders per Month',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    });

    useEffect(() => {
        fetchData(`${baseURL}/adminapp/order_graph/`);
    }, []);

    const fetchData = (url) => {
        axios.get(url)
            .then(response => {
                const orders = response.data;
                console.log(orders);
            
                const monthlyOrders = groupOrdersByMonth(orders);
                const { labels, data } = constructChartData(monthlyOrders);
                setChartData({
                    labels,
                    datasets: [{
                        label: 'Orders per Month',
                        data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching order data:', error);
            });
    };

    const groupOrdersByMonth = (orders) => {
        const monthlyOrders = {};
        orders.forEach(order => {
            const [year, month] = order.year_month.split('-');
            const key = `${year}-${month}`;
            monthlyOrders[key] = (monthlyOrders[key] || 0) + order.total_orders;
        });
        return monthlyOrders;
    };

    const constructChartData = (monthlyOrders) => {
        const labels = [];
        const data = [];
        
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1

        for (let i = 5; i >= 0; i--) {
            let year = currentYear;
            let month = currentMonth - i;
            if (month <= 0) {
                year--;
                month += 12;
            }
    
            // Add the month/year label to the labels array
            labels.push(`${getMonthName(month)}/${String(year).slice(2)}`);
    
            // Construct the key in the format 'YYYY-MM'
            const key = `${year}-${String(month).padStart(2, '0')}`;
    
            data.push(monthlyOrders[key] || 0);
        }
    
        return { labels, data };
    };
    
    const getMonthName = (month) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month - 1]; // Months are zero-based, so we subtract 1
    };

    const updateChartDataByYear = () => {
        fetchData(`${baseURL}/adminapp/order_graph_year/`);
    };

    useEffect(() => {
        if (chartRef.current && chartData.labels.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: chartData.datasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            return () => {
                myChart.destroy();
            };
        }
    }, [chartData]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                <div className="flex justify-between mb-4 items-start">
                    <div className="font-medium">Order Statistics</div>
                    <button onClick={updateChartDataByYear} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-md">
                        View by Year
                    </button>
                </div>
                <div className="font-medium">Orders per Month</div>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default AdminChart;


