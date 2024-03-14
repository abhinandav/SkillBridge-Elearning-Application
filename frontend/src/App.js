import UserWrapper from "./Components/User/UserWrapper";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import TeacherWrapper from "./Components/Teacher/TeacherWrapper"
import AdminWrapper from './Components/Admin/AdminWrapper'



function App() {

  return (
 
    <BrowserRouter>
      <Provider store={Store}>
        <Routes>
          <Route path="/*" element={<UserWrapper/>}></Route> 
          <Route path="teacher/*" element={<TeacherWrapper />}></Route>
          <Route path="admin/*" element={<AdminWrapper />}></Route>

        </Routes>
      </Provider>
    </BrowserRouter>
      );
}

export default App;
