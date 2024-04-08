import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  Sidebar from '../../Components/Admin/Sidebar'
import AdminHeader from '../../Components/Admin/AdminHeader'
import AdminChart from './AdminChart'
import AdminHomeCards from './AdminHomeCards';

function AdminHome() {


  return (
   
   <div>
     <Sidebar/>
      <AdminHeader/>
     <div class="w-full md:w-[calc(100%-286px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
      <div  className='p-6'>


<AdminHomeCards/>


<AdminChart/>


      </div>
    </div>
   </div>
  )
}

export default AdminHome