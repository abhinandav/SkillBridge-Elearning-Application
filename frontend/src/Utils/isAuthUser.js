import axios from "axios";
import {jwtDecode} from 'jwt-decode'

const baseURL = 'http://127.0.0.1:8000';
const updateToken = async () => {
    const refreshToken = localStorage.getItem('refresh');
    console.log('refresh--',refreshToken);
    console.log('updating');

    try {
        const res = await axios.post(baseURL + '/api/accounts/token/refresh/', {
            'refresh': refreshToken
        });

        if (res.status === 200) {
            console.log('200');
            localStorage.setItem('access', res.data.access);
            console.log('new_access',res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            return true;
            // let decoded = jwtDecode(res.data.access_token);
            // return {name: decoded.username, isAuthenticated: true,isTeacher:false, isAdmin:false};
        } else {
            return false
        }
    } catch (error) {
        return false
    }
};


const fetchisAdmin = async () => {
    const token = localStorage.getItem('access');
   
    
    try {
        const res = await axios.get(baseURL + '/api/accounts/user/details/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
  
         console.log('issuperuser-isauthadmin',res.data.is_superuser);
        return res.data.is_superuser;
  
    } catch (error) {
        return false;
    }
  };



  const fetchisTeacher = async () => {
    const token = localStorage.getItem('access');
   
    
    try {
        const res = await axios.get(baseURL + '/api/accounts/user/details/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
  
         console.log('issuperuser-isauthadmin',res.data.is_superuser);
        return res.data.is_staff;
  
    } catch (error) {
        return false;
    }
  };
  


const isAuthUser = async () => {
    const accessToken = localStorage.getItem("access");
    console.log('access----',accessToken);

    if (!accessToken) {
        return { name: null, isAuthenticated: false, isAdmin: false };
    }

    const currentTime = Date.now() / 1000;

    let decoded = jwtDecode(accessToken);
    console.log(decoded.exp - currentTime);


    if (decoded.exp > currentTime) {
            const [checkAdmin, checkTeacher] = await Promise.all([fetchisAdmin(), fetchisTeacher()]);
            console.log('Admin?', checkAdmin);
            console.log('Teacher?', checkTeacher);
            return { name: decoded.username, isAuthenticated: true, isAdmin: checkAdmin, isTeacher: checkTeacher };
        // let checkAdmin = await fetchisAdmin(); 
        // let checkTeacher = await fetchisTeacher(); 
        // console.log('Admin?',checkAdmin);
        // return { name: decoded.username, isAuthenticated: true , isAdmin:checkAdmin, isTeacher:checkTeacher};
    } else {
        const updateSuccess = await updateToken();

        if (updateSuccess) {
            let decoded = jwtDecode(accessToken);

            const [checkAdmin, checkTeacher] = await Promise.all([fetchisAdmin(), fetchisTeacher()]);
            console.log('Admin2?', checkAdmin);
            console.log('Teacher2?', checkTeacher);
            return { name: decoded.username, isAuthenticated: true, isAdmin: checkAdmin, isTeacher: checkTeacher };


            // let checkAdmin = await fetchisAdmin(); 
            // let checkTeacher = await fetchisTeacher(); 
            // console.log('Admin2?',checkAdmin);
            // return { name: decoded.username, isAuthenticated: true,isAdmin:checkAdmin,isTeacher:checkTeacher};
        } else {
            return { name: null, isAuthenticated: false,isAdmin:false };
        }
    }
};





// const isAuthUser= async()=>{
//     const accessToken=localStorage.getItem('access')

//     if(!accessToken){
//         return {
//             name:null,
//             isAuthenticated:false
//         }
//     }

//         const currentTime=Date.now()/1000
//         const decoded=jwtDecode(accessToken)
//         if (decoded.exp>currentTime){
//             console.log('not expired');
//             return{name:decoded.username,isAuthenticated:true
//             }
//         }
//         else{
//             console.log('expired');
//             const updateSuccess=await updateToken()
//             return updateSuccess
//         }
//     }



export default isAuthUser ;