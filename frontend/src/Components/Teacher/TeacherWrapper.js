import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import TeacherHeader from './TeacherHeader'
import TeacherHome from "../../Pages/Teacher/TeacherHome";
import TeacherSignup from "../../Pages/Teacher/Credentials/TeacherSignup";
import TeacherLogin from "../../Pages/Teacher/Credentials/TeacherLogin";



import { useDispatch, useSelector } from "react-redux";
import isAuthTeacher from "../../Utils/isAuthTeacher";
import { set_authentication } from "../../Redux/autehnticationSlice"; 


function UserWrapper() {
  const dispatch = useDispatch();

  const authentication_user = useSelector(state => state.authentication_user)

  const checkAuth = async () => {
    const isAuthenticated = await isAuthTeacher();
    dispatch(
      set_authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        isTeacher:isAuthenticated.isTeacher,
        isAdmin:isAuthenticated.isAdmin
      })
    );
  };

  console.log('isAdmin?',authentication_user.isAdmin);
  console.log('isStaff?',authentication_user.isTeacher);

  useEffect(() => {
    if(!authentication_user.name)
    {
      checkAuth();  
    }
  }, [])




  return (
    <>
   
    <TeacherHeader/>
      <Routes>
          <Route  path="/" element={<TeacherHome/>}></Route>
          <Route  path="/signup" element={<TeacherSignup/>}></Route>
          <Route  path="/login" element={<TeacherLogin/>}></Route>
      </Routes>    
    
    </>
  );
}

export default UserWrapper;
