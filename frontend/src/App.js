import UserWrapper from "./Components/User/UserWrapper";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import TeacherWrapper from "./Components/Teacher/TeacherWrapper"
import AdminWrapper from './Components/Admin/AdminWrapper'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Messages from "./Pages/Message/messages";


function App() {

  return (
 
    <BrowserRouter>
      <Provider store={Store}>
        <Routes>
          <Route path="/*" element={<UserWrapper/>}></Route> 
          <Route path="teacher/*" element={<TeacherWrapper />}></Route>
          <Route path="admin/*" element={<AdminWrapper />}></Route>


          <Route path="/messages" element={<Messages/>}></Route> 

        </Routes>
        <ToastContainer />
      </Provider>
    </BrowserRouter>
      );
}

export default App;
