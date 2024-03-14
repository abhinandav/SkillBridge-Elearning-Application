import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserHeader from "../User/UserHeader";
import UserHome from "../../Pages/User/UserHome";
import UserLogin from "../../Pages/User/Credentials/UserLogin";
import UserFooter from "./UserFooter";
import UserSignUp from '../../Pages/User/Credentials/UserSignUp'
import UserOTP from "../../Pages/User/Credentials/UserOTP";
import UserProfile from "../../Pages/User/UserProfile";
import CourseList from "../../Pages/User/CourseList";
import FPEmails from '../../Pages/User/Credentials/FPEmail'
import FPreset from "../../Pages/User/Credentials/FPreset";



import { useDispatch, useSelector } from "react-redux";
import isAuthUser from "../../Utils/isAuthUser";
import { set_authentication } from "../../Redux/autehnticationSlice"; 


function UserWrapper() {

  const dispatch = useDispatch();

  const authentication_user = useSelector(state => state.authentication_user)

  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();

    console.log('bb-------',isAuthenticated);

    dispatch(
      set_authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        isAdmin: isAuthenticated.isAdmin,
        isTeacher:isAuthenticated.isTeacher
      })
    );
  };

  console.log('isAdmin---?',authentication_user.isAdmin);
  console.log('isteacher-----?',authentication_user.isTeacher);



  useEffect(() => {
    if(!authentication_user.name)
    {
      checkAuth();  
    }

    // if(authentication_user.isAdmin)
    // {
    //   localStorage.clear()
    // }
  }, [])




  return (
    <>
   
    <UserHeader/>
      <Routes>
          <Route  path="/" element={<UserHome/>}></Route>
          <Route  path="login" element={<UserLogin/>}></Route>
          <Route  path="signup" element={<UserSignUp/>}></Route>
          <Route  path="userotp" element={<UserOTP/>}></Route>
          <Route  path="profile" element={<UserProfile/>}></Route>
          <Route  path="course_list" element={<CourseList/>}></Route>
          <Route  path="fpemail" element={<FPEmails/>}></Route>
          <Route  path="change_password/:id" element={<FPreset/>}></Route>
      </Routes>    
    <UserFooter/>
    </>
  );
}

export default UserWrapper;
