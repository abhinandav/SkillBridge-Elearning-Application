import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import TeacherHeader from './TeacherHeader'
import TeacherHome from "../../Pages/Teacher/TeacherHome";
import TeacherSignup from "../../Pages/Teacher/Credentials/TeacherSignup";
import TeacherLogin from "../../Pages/Teacher/Credentials/TeacherLogin";
import TeacherOTP from "../../Pages/Teacher/Credentials/TeacherOTP";
import AddCourse from "../../Pages/Teacher/Course/AddCourse";
import AddVideos from "../../Pages/Teacher/Course/AddVideos";
import AddVideos2 from "../../Pages/Teacher/Course/AddVideos2";
import TeacherVideoPreview from "../../Pages/Teacher/Course/TeacherVideoPreview";
import TeacherCourseList from "../../Pages/Teacher/Course/TeacherCourseList";
import TeacherCourseView from "../../Pages/Teacher/Course/TeacherCourseView";
import EditCourse from "../../Pages/Teacher/Course/EditCourse";
import EditVideo from "../../Pages/Teacher/Course/EditVideo";
import TeacherProfile from "../../Pages/Teacher/Profile/TeacherProfile";
import TeacherProfileEdit from "../../Pages/Teacher/Profile/TeacherProfileEdit";
import TeacherProfileCourseList from "../../Pages/Teacher/Profile/TeacherProfileCourseList";
import Messages from "../../Pages/Teacher/messages";
import TeacherVideoPlayer from "../../Pages/Teacher/Course/TeacherVideoPlayer";


import { useDispatch, useSelector } from "react-redux";
import isAuthTeacher from "../../Utils/isAuthTeacher";
import { set_authentication } from "../../Redux/autehnticationSlice"; 
import TeacherPrivateRoute from "../PrivateRoutes/TecaherPrivateRoute";



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
          <Route  path="/teacher_otp" element={<TeacherOTP/>}></Route>

          <Route  path="/my_courses" element={<TeacherPrivateRoute><TeacherCourseList/></TeacherPrivateRoute>}></Route>
          <Route  path="/view_course/:id" element={<TeacherPrivateRoute><TeacherCourseView/></TeacherPrivateRoute>}></Route>
          <Route  path="/add_course" element={<TeacherPrivateRoute><AddCourse/></TeacherPrivateRoute>}></Route>
          <Route  path="/edit_course/:id" element={<TeacherPrivateRoute><EditCourse/></TeacherPrivateRoute>}></Route>
          <Route  path="/add_videos/:id" element={<TeacherPrivateRoute><AddVideos/></TeacherPrivateRoute>}></Route>
          <Route  path="/add_video/:id" element={<TeacherPrivateRoute><AddVideos2/></TeacherPrivateRoute>}></Route>
          <Route  path="/edit_video/:id" element={<TeacherPrivateRoute><EditVideo/></TeacherPrivateRoute>}></Route>
          <Route path='/video_preview' element={<TeacherPrivateRoute><TeacherVideoPreview/></TeacherPrivateRoute>}></Route>

          <Route path='/teacher_profile' element={<TeacherPrivateRoute><TeacherProfile/></TeacherPrivateRoute>}></Route>
          <Route path='/teacher_profile_edit' element={<TeacherPrivateRoute><TeacherProfileEdit/></TeacherPrivateRoute>}></Route>
          <Route path='/teacher_mycourse_list' element={<TeacherPrivateRoute><TeacherProfileCourseList/></TeacherPrivateRoute>}></Route>
          <Route  path="/inbox/:orderId" element={<TeacherPrivateRoute><Messages/></TeacherPrivateRoute>}></Route>
          <Route  path="/tvideoplayer/:id/:vid" element={<TeacherPrivateRoute><TeacherVideoPlayer/></TeacherPrivateRoute>}></Route>

      </Routes>    
   
    
    </>
  );
}<TeacherPrivateRoute></TeacherPrivateRoute>

export default UserWrapper;
