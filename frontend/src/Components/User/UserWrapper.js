import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserHeader from "../User/UserHeader";
import UserHome from "../../Pages/User/UserHome";
import UserLogin from "../../Pages/User/Credentials/UserLogin";
import UserFooter from "./UserFooter";
import UserSignUp from '../../Pages/User/Credentials/UserSignUp'
import UserOTP from "../../Pages/User/Credentials/UserOTP";
import UserProfile from "../../Pages/User/Profile/UserProfile";
import CourseList from "../../Pages/User/CourseList";
import FPEmails from '../../Pages/User/Credentials/FPEmail'
import FPreset from "../../Pages/User/Credentials/FPreset";
import ProfileEdit from "../../Pages/User/Profile/ProfileEdit";
import CourseView from "../../Pages/User/CourseView";
import EnrolledCourses from "../../Pages/User/Profile/EnrolledCourses";
import ForgotOtp from "../../Pages/User/Credentials/ForgotOtp";
import VideoPlayer from "../../Pages/User/VideoPlayer";
import Messages from "../../Pages/Message/messages";
import Invoice from "../../Pages/User/Invoice";
// import Chat from "../../Chat";



import { useDispatch, useSelector } from "react-redux";
import isAuthUser from "../../Utils/isAuthUser";
import { set_authentication } from "../../Redux/autehnticationSlice"; 
import UserPrivateRoute from '../PrivateRoutes/UserPrivateRoute'


function UserWrapper() {

  const dispatch = useDispatch();

  const authentication_user = useSelector(state => state.authentication_user)

  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();

    dispatch(
      set_authentication({
        userid:isAuthenticated.userid,
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        isAdmin: isAuthenticated.isAdmin,
        isTeacher:isAuthenticated.isTeacher
      })
    );
  };




  useEffect(() => {
    if(!authentication_user.name)
    {
      checkAuth();  
    }

  }, [])

  


  return (
    <>
   
    <UserHeader/>
      <Routes>
          <Route  path="/" element={<UserHome/>}></Route>
          <Route  path="login" element={<UserLogin/>}></Route>
          <Route  path="signup" element={<UserSignUp/>}></Route>
          <Route  path="userotp" element={<UserOTP/>}></Route>
          <Route  path="forgot_otp" element={<ForgotOtp/>}></Route>

          <Route  path="course_list" element={<CourseList/>}></Route>
          <Route  path="fpemail" element={<FPEmails/>}></Route>
          <Route  path="change_password/:id" element={<FPreset/>}></Route>
          <Route  path="course_view/:id" element={<CourseView/>}></Route>
          <Route path='videoplayer/:id/:vid' element={<VideoPlayer/>}></Route>
         

          


          <Route  path="profile" element={<UserPrivateRoute> <UserProfile/> </UserPrivateRoute>}> </Route>
          <Route  path="profile_edit" element={<UserPrivateRoute><ProfileEdit/></UserPrivateRoute>}></Route>
          <Route  path="enrolled_courses" element={<UserPrivateRoute><EnrolledCourses/></UserPrivateRoute>}></Route>
          <Route  path="/inbox/:orderId" element={<UserPrivateRoute><Messages/></UserPrivateRoute>}></Route>
          <Route  path="/invoice/:id/" element={<UserPrivateRoute><Invoice/></UserPrivateRoute>}></Route>
          {/* <Route  path="inbox" element={<UserPrivateRoute><Chat/></UserPrivateRoute>}></Route> */}

      </Routes>    
    {/* <UserFooter/> */}
    </>
  );
}

export default UserWrapper;
