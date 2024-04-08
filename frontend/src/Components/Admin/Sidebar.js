import React from 'react';
import { RiHome2Line, RiArrowRightSLine } from 'react-icons/ri';
import { BsFillPersonFill,BsBagCheckFill } from 'react-icons/bs';
import { GiTeacher } from "react-icons/gi";
import { IoIosSchool,IoMdDocument   } from 'react-icons/io';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';


const Sidebar = () => {
  
  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform">
      <span className="flex items-center pb-4 border-b border-b-gray-800">
        <h2 className="font-bold text-2xl">
          Skill <span className="bg-[#f97316] text-white px-3 rounded-md py-1">Bridge</span>
        </h2>
      </span>
      <ul className="mt-4">
        <span className="text-gray-400 font-bold">ADMIN</span>



        <Link to='/admin'>
        <li className="mb-1 group">
          <span className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <RiHome2Line className="mr-3 text-lg" />
            <span className="text-sm">Dashboard</span>
            <RiArrowRightSLine className="ml-auto group-[.selected]:rotate-90" />

          </span>
        </li>
        </Link>


        <Link to='/admin/user_list'>
          <li className="mb-1 group">
            <span className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
            <BsFillPersonFill className='mr-3 text-lg' />
              <span className="text-sm">Users</span>
              <RiArrowRightSLine className="ml-auto group-[.selected]:rotate-90" />
            </span>
          </li>
        </Link>


        <Link to='/admin/teacher_list'>
        <li className="mb-1 group">
          <span className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <IoIosSchool  className='mr-3 text-lg' />
            <span className="text-sm">Tecaher</span>
            <RiArrowRightSLine className="ml-auto group-[.selected]:rotate-90" />
          </span>
        </li>
        </Link>


        <Link to='/admin/course_list'>
        <li className="mb-1 group">
          <span className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <GiTeacher   className='mr-3 text-lg' />
            <span className="text-sm">Courses</span>
            <RiArrowRightSLine className="ml-auto group-[.selected]:rotate-90" />
          </span>
        </li>
        </Link>

        <Link to='/admin/order_list'>
        <li className="mb-1 group">
          <span className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <BsBagCheckFill    className='mr-3 text-lg' />
            <span className="text-sm">Orders</span>
            <RiArrowRightSLine className="ml-auto group-[.selected]:rotate-90" />
          </span>
        </li>
        </Link>

        <Link to='/admin/sales_report'>
        <li className="mb-1 group">
          <span className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <IoMdDocument      className='mr-3 text-lg' />
            <span className="text-sm">Sales Report</span>
            <RiArrowRightSLine className="ml-auto group-[.selected]:rotate-90" />
          </span>
        </li>
        </Link>





      </ul>
    </div>
  );
};

export default Sidebar;
