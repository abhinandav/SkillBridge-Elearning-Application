import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function AdminChart({props}) {
    const chartRef = useRef(null);
    const [orderdata, setOrderdata] = useState({orders:[]});
    const token = localStorage.getItem('access');
    const baseURL = "http://127.0.0.1:8000";

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Orders per Month',
            data: [],
            fill :true,
            borderWidth: 1,
            pointBackgroundColor: 'rgb(16, 185, 129)',
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            tension: .2,
        }]
    });
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(baseURL + '/teacher/teacher_graph_month/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
    
                if (res.status === 200) {
                    const data = res.data; 
                    console.log('data', data);
                    const { labels, data: chartData } = constructChartData(data);
                    setChartData({
                        labels,
                        datasets: [{
                            label: 'monthly',
                            data: chartData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill:true
                        }]
                    });
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };
        fetchData();
    }, []);
    

    const getMonthName = (month) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month - 1]; 
    };

    const constructChartData = (data) => {
        const labels = [];
        const chartData = [];


            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1; 

            for (let i = 5; i >= 0; i--) {
                let year = currentYear;
                let month = currentMonth - i;
                if (month <= 0) {
                    year--;
                    month += 12;
                }
                labels.push(`${getMonthName(month)}/${String(year).slice(2)}`); // Add the month/year label to the labels array
                const key = `${year}-${String(month).padStart(2, '0')}`;  // Construct the key in the format 'YYYY-MM'
                const monthData = data.find(item => item.year_month === key); // Find the corresponding month data in the 'data' array
                chartData.push(monthData ? monthData.total_orders : 0); // If month data exists, push its total_orders to chartData, otherwise, push 0
 
        } 
        
        return { labels,  data:chartData };
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
                    },
                    backgroundColor: 'rgb(16 185 129 / .05)',
                    tension: .2,
                }
            });
            return () => {
                myChart.destroy();
            };
        }
    }, [chartData]);


    

    useEffect(()=>{
        const fetchOrderdata=async()=>{
          const res =await axios.get(baseURL+'/teacher/tprofile_orderdata/',{
            headers: {
              'authorization': `Bearer ${token}`,
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
          }
          });
            setOrderdata(res.data)
            console.log('orderdata',res.data);
        }
        fetchOrderdata()
    },[])



    


    

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                <div className="flex justify-between mb-4 items-start">
                    <div className="font-medium">Order Statistics</div>

                   

                </div>
                <div className="font-medium flex justify-between items-center mb-4"></div>
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="font-medium">Orders per Month</div>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>


            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                <div className="flex justify-between mb-4 items-start">
                    <div className="font-medium">New Orders</div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Username</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Earning</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Course</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Author</th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderdata.orders.length === 0 && <tr><td className='m-5'>No Order Found</td></tr>}
                            {orderdata.orders.slice(0, 6).map(order => (
                                <tr key={order.id}>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                                            <span  className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">{order.username}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-emerald-500">{order.price}</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-emerald-500">{order.course_name}</span>
                                    </td>

                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-emerald-500">{order.author}</span>
                                    </td>

                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-emerald-500">{order.date_purchased}</span>
                                    </td>

                                    
                                   
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default AdminChart;