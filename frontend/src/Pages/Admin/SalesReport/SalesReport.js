import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../../Components/Admin/Sidebar';
import AdminHeader from '../../../Components/Admin/AdminHeader';
import html2pdf from 'html2pdf.js';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

function SalesReport() {
  const [ordersData, setOrdersData] = useState({ orders_today_count: 0,course_count:0,users_count:0,total_earnings:0, order_list: [] });
  const baseURL = "http://127.0.0.1:8000";
  const [processing, setProcessing] = useState(false);

  const handleReportData = (data) => {
    console.log('Received report data:', data);
    setOrdersData(data);
    setTimeout(() => {
      setProcessing(false);
  }, 1000);
  };

  const fetchOrders = () => {
    setProcessing(true);
    axios.get(`${baseURL}/adminapp/todays_report/`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    }})
      .then(response => {
        if (response.data &&  response.data.order_list) {     
            handleReportData( response.data);
        } else {
          console.error("Error fetching orders: Data is not an array or undefined", response);
        }
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);


console.log(ordersData);


const handleDownload = () => {
    const element = document.getElementById('salesReportDiv');
    const today = new Date().toISOString().slice(0, 10); 
    html2pdf()
      .from(element)
      .save(`sales_report_${today}.pdf`);
};

  const today = new Date().toLocaleDateString();


  const handleDownloadExcel = () => {
    if (!ordersData.order_list || ordersData.order_list.length === 0) {
      console.error("No data available to download.");
      return;
    }
  
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(ordersData.order_list);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
    XLSX.writeFile(workbook, "sales_report.xlsx");
  };




  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
}


  return (
    <div>
      <Sidebar />
      <AdminHeader />
      <div className="w-full md:w-[calc(100%-286px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
        <div className='p-6'>
          <div className="bg-white p-8 rounded-md w-full">
            


            <div>
            <div className="space-y-5 mt-5 mb-10">
                <div className="border-b border-b-gray-200">
                    <ul className="-mb-px flex items-center gap-4 text-sm font-medium">

                    <Link to='/admin/sales_report/'  className="flex-1">
                    <li className="flex-1">
                        <span className="relative flex items-center justify-center gap-2 px-1 py-3 text-blue-700 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-blue-700 hover:text-blue-700">
                        Today
                        </span>
                    </li>
                    </Link>

                    <Link to='/admin/sales_report_week/'  className="flex-1">
                    <li className="flex-1">
                    <span className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700">
                        Week
                        </span>
                    </li>
                    </Link>

                    <Link to='/admin/sales_report_month/'  className="flex-1">
                    <li className="flex-1">
                        <span className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700">
                        Month
                        </span>
                    </li>
                    </Link>


                    <Link to='/admin/sales_report_year/'  className="flex-1">
                    <li className="flex-1">
                        <span className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700">
                        Year
                        </span>
                    </li>
                    </Link>

                    <Link to='/admin/sales_report_custom/'  className="flex-1">
                    <li className="flex-1">
                        <span className="flex items-center justify-center gap-2 px-1 py-3 text-gray-500 hover:text-blue-700">
                        Custom
                        </span>
                    </li>
                    </Link>
                   
                    </ul>
                </div>
                </div>


                <div className="flex items-center justify-between pb-6 ">
                    <div></div>
                    {!processing && (
                        <div className='flex'>
                        <div className="relative mx-10">
                        <button
                            id="dropdownDelayButton"
                            data-dropdown-toggle="dropdownDelay"
                            data-dropdown-delay="500"
                            data-dropdown-trigger="hover"
                            className=" font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
                            type="button"
                            onClick={toggleDropdown}
                        >
                            Download Report
                            <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                            >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                            </svg>
                        </button>


                        {isOpen && (
                        <div
                        id="dropdownDelay"
                        className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                            <li>
                            <button onClick={handleDownload} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">As pdf</button>
                            </li>

                            <li>
                            <button onClick={handleDownloadExcel} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">As excel Excell</button>
                            </li>
                            
                            
                        </ul>
                        </div>
                        )}
                        </div>
                        </div>
                  )}

                </div>

                {processing && (
                <div className='flex items-center justify-center h-96'>
                  <span className="bg-indigo-400 h-max w-max rounded-lg text-white font-bold hover:bg-indigo-300 hover:cursor-not-allowed duration-[500ms,800ms]" disabled>
                    <div className="flex items-center justify-center m-[10px]">
                      <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                      <div className="ml-2"> Processing monthly report... </div>
                    </div>
                  </span>
                </div>
              )}




            <div id="salesReportDiv">
                <div className='p-10 pt-20'>
                    <div className="flex items-center justify-center pb-6">
                        <div>
                            <h1 className="text-gray-600 text-xl font-semibold">Todays Sales Report {today}</h1>
                        </div>
                    </div>

                    <div className="py-5 mx-30">
                        <main className="h-full overflow-y-auto">
                            <div className="container mx-auto grid">
                            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                


                                <div className="flex items-center justify-cente p-4 bg-white rounded-lg shadow-xs ">
                                    <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full ">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-medium text-gray-600 ">
                                        Total Purchases
                                        </p>
                                        <p className="text-lg font-semibold text-gray-700 ">
                                        {ordersData.orders_today_count} 
                                        </p>
                                    </div>
                                </div>


                        
                                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs ">
                                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full  ">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600 ">
                                    Users
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700 ">
                                    {ordersData.users_count}
                                    </p>
                                </div>
                                </div>
                            


                                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs bg-gray-800">
                                <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full ">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600 ">
                                    Total Course
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700 ">
                                {ordersData.course_count} 
                                    </p>
                                </div>
                                </div>



                                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs bg-gray-800">
                                <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full ">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600 ">
                                    Total Earnings Rs
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700 ">
                                    ₹ {ordersData.total_earnings} 
                                    </p>
                                </div>
                                </div>
                    


                                
                                
                            </div>
                            </div>
                        </main>
                    </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Customer
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Course
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Author
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Price
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date Bought
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {ordersData.order_list.length === 0 && <tr><td className='m-5'>No Order Found</td></tr>}
                        {ordersData.order_list.map(order => (
                            <tr key={order.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">{order.username}</p>
                                </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{order.course_name}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{order.author}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{order.price}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{order.date_purchased}</p>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
              </div>

            </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesReport;


