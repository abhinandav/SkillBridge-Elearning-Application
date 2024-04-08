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
import VerifyDocuments from '../../Pages/Admin/AdminVerifyDocuments'
import AdminCourseList from "../../Pages/Admin/AdminCourseList";
import AdminCourseRequests from "../../Pages/Admin/AdminCourseRequests";
import AdminCourseView from "../../Pages/Admin/AdminCourseView";
import AdminAcceptedCourseVIew from "../../Pages/Admin/AdminAcceptedCourseVIew";
import AdminOrderList from "../../Pages/Admin/AdminOrderList";
import SalesReport from "../../Pages/Admin/SalesReport/SalesReport"
import SalesReportMonth from "../../Pages/Admin/SalesReport/SalesReportMonth"
import SalesReportYear from "../../Pages/Admin/SalesReport/SalesReportYear";
import SalesReportWeek from "../../Pages/Admin/SalesReport/SelesReportWeek";
import CustomSalesReport from "../../Pages/Admin/SalesReport/CustomSalesReport";

 
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

      
      <Route path="/course_list" element={<AdminPrivateRoute><AdminCourseList /></AdminPrivateRoute>} />
      <Route path="/course_request" element={<AdminPrivateRoute><AdminCourseRequests /></AdminPrivateRoute>} />
      <Route path="/view_course/:id" element={<AdminPrivateRoute><AdminCourseView /></AdminPrivateRoute>} />
      <Route path="/course_view/:id" element={<AdminPrivateRoute><AdminAcceptedCourseVIew /></AdminPrivateRoute>} />
      <Route path="/order_list" element={<AdminPrivateRoute><AdminOrderList /></AdminPrivateRoute>} />

      <Route path="/sales_report" element={<AdminPrivateRoute><SalesReport /></AdminPrivateRoute>} />
      <Route path="/sales_report_month" element={<AdminPrivateRoute><SalesReportMonth /></AdminPrivateRoute>} />
      <Route path="/sales_report_week" element={<AdminPrivateRoute><SalesReportWeek /></AdminPrivateRoute>} />
      <Route path="/sales_report_year" element={<AdminPrivateRoute><SalesReportYear /></AdminPrivateRoute>} />
      <Route path="/sales_report_custom" element={<AdminPrivateRoute><CustomSalesReport /></AdminPrivateRoute>} />

      </Routes>    
    
    </>
  );
}

export default AdminWrapper;
