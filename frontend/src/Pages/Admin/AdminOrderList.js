import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Sidebar from '../../Components/Admin/Sidebar';
import AdminHeader from '../../Components/Admin/AdminHeader';

function AdminOrderList() {
  const authentication_user = useSelector(state => state.authentication_user);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const baseURL = "http://127.0.0.1:8000";

  const fetchOrders = () => {
    axios.get(`${baseURL}/adminapp/orders/`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {     
          setOrders(response.data);
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

  const handleInputChange = event => {
    setSearch(event.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.username.toLowerCase().includes(search.toLowerCase()) ||
    order.course_name.toLowerCase().includes(search.toLowerCase()) ||
    order.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Sidebar />
      <AdminHeader />
      <div className="w-full md:w-[calc(100%-286px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
        <div className='p-6'>
          <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="text-gray-600 font-semibold">Order List</h2>
                <span className="text-xs">Visit all Orders</span>
              </div>
              <div className='flex items-center justify-center  '>
                <div className="flex items-center border border-gray-500  bg-white rounded-lg">
                  <form onSubmit={e => e.preventDefault()} className="w-full flex items-center">
                    <input 
                      type="search" 
                      value={search} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-1   text-gray-800 rounded-full focus:outline-none"
                      placeholder="Search" 
                    />
                  </form>
                </div>
              </div>
            </div>
            <div>
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
                      {filteredOrders.length === 0 && <tr><td className='m-5'>No Order Found</td></tr>}
                      {filteredOrders.map(order => (
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
  );
}

export default AdminOrderList;


