import React, { useEffect } from "react";
import { Routes, Route,Navigate} from "react-router-dom";
import AdminHome from "../../Pages/Admin/AdminHome";
import AdminUserList from "../../Pages/Admin/AdminUserList";
import AdminTeacherList from "../../Pages/Admin/AdminTeacherList";
import TeacherDetailview from "../../Pages/Admin/TeacherDetailview";
import AdminLogin from "../../Pages/Admin/Credentials/AdminLogin";
import { useDispatch, useSelector } from "react-redux";
import isAuthAdmin from "../../Utils/isAuthAdmin";
import { set_authentication } from "../../Redux/autehnticationSlice";

import AdminPrivateRoute from "../PrivateRoutes/AdminPrivateRoute";
import AdminTecaherRequest from "../../Pages/Admin/AdminTecaherRequest";
import VerifyDocuments from '../../Pages/Admin/VerifyDocuments'


 
function AdminWrapper() {
  const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user);



  const checkAuthAndFetchUserData = async () => {
    try {
      const isAuthenticated = await isAuthAdmin();
      dispatch(
        set_authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }
    
    console.log('cc----',authentication_user.isAdmin)

    if (!authentication_user.isAdmin) {
      return <Navigate to="/login" />;  
    }
  }, []);

  return (
    <>
      <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={<AdminPrivateRoute><AdminHome /></AdminPrivateRoute>} />
      <Route path="/user_list" element={<AdminPrivateRoute><AdminUserList /></AdminPrivateRoute>} />
      <Route path="/teacher_list" element={<AdminPrivateRoute><AdminTeacherList /></AdminPrivateRoute>} />
      <Route path="/teacher_request" element={<AdminPrivateRoute><AdminTecaherRequest /></AdminPrivateRoute>} />
      <Route path="/teacher_detail/:id" element={<AdminPrivateRoute><TeacherDetailview /></AdminPrivateRoute>} />
      <Route path="/verify_documents/:id" element={<AdminPrivateRoute><VerifyDocuments /></AdminPrivateRoute>} />

      </Routes>    
    
    </>
  );
}

export default AdminWrapper;
