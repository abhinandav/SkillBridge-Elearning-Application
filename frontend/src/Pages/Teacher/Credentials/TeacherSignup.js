import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TeacherSignup = () => {
  const baseURL = 'http://127.0.0.1:8000';
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [cpasswordError, setCPasswordError] = useState('')
  const [numberError, setNumberError] = useState('')
  const [ageError, setAgeError] = useState('')
  const [experienceError, setExperienceError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [fileError, setFileError] = useState('');
  const [loginError, setLoginError] = useState('')
  const authentication_user=useSelector(state=>(state.authentication_user))

    useEffect(() => {
      if ((authentication_user.isAuthenticated &&!authentication_user.isAdmin)) {
        console.log('User is already authenticated. Redirecting...');
        navigate('/teacher');
      }
    }, [authentication_user.isAuthenticated,authentication_user.isAdmin,authentication_user.isAdmin, navigate]);



 // -----------------------------------------------------
//  const handleAddDocumentField = () => {
//   setDocumentFields(prevFields => prevFields + 1);
// };
 // -----------------------------------------------------

 const validateEmail = (email) => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    setEmailError('')
      setPasswordError('')
      setUsernameError('')
      setCPasswordError('')
      setAddressError('')
      setAgeError('')
      setExperienceError('')
      setNumberError('')
      setFileError('')
      setLoginError('')

      const username = event.target.username.value;
      const email = event.target.email.value;
      const password = event.target.password.value;
      const cpassword = event.target.cpassword.value;
      const address = event.target.address.value;
      const age = event.target.age.value;
      const experience = event.target.experience.value;
      const number = event.target.number.value;
      const experienceprpoof=event.target.experience_proof.value
      const idproof=event.target.id_proof.value
      const photoproof=event.target.photo_proof.value
      const tenthproof=event.target.tenth_proof.value
      const plustwoproof=event.target.plustwo_proof.value
      const graduationproof=event.target.graduation_proof.value
      
      const alphabeticRegex = /^[A-Za-z]+$/;

      if (!username.trim()) {
        setUsernameError('Username is required *')
     
      }

      if (!alphabeticRegex.test(username)) {
        setUsernameError('Username must contain only alphabetic characters');
        return;
      }

      if (username.length > 0 && username.length < 4) {
        setUsernameError('length must be atleast 4 characters *')
        return
      }

      if (!email.trim()) {
        setEmailError('Email is required *')
      }

      if (!validateEmail(email)) {
        setEmailError('Invalid email *')
      }
  
      if (!password.trim()) {
        setPasswordError('Password is required *');
      }

      if (password.length > 0 && password.length < 8) {
        setPasswordError('Password must be at least 8 characters *');
      }


      if (!cpassword.trim()) {
        setCPasswordError('Confirm Password is required *');
        
      }

      if (cpassword.length > 0 && cpassword.length < 8) {
        setCPasswordError('Confirm Password must be at least 8 characters *');
        
      }

      if  (String(cpassword) !== String(password)){
        setCPasswordError('Passwords are not matching!!');
        setPasswordError('Passwords are not matching!!');
        return
      }

      if (!address.trim()) {
        setAddressError('Address is required *');
        
      }
      
      if (!age.trim()) {
        setAgeError('Age is required *');
      }

      if ( age.length > 2) {
        setAgeError('Invalid age *');
        return
      }
      
      if (!experience.trim()) {
        setExperienceError('Experience is required *');
      }
      
      if (!number.trim()) {
        setNumberError('Number is required *');
      }

      if (!(number.length ===10)){
        setNumberError('Invalid number *');
        return
      }

      if(!experienceprpoof||!idproof||!photoproof||!tenthproof||!plustwoproof||!graduationproof){
        setFileError('All documents must upload')
        // return
      }
      


  
    const userFormData = new FormData();
    userFormData.append('username', event.target.username.value);
    userFormData.append('email', event.target.email.value);
    userFormData.append('password', event.target.password.value);


    // details
  
    const teacherDetailsFormData = new FormData();
    teacherDetailsFormData.append('number', event.target.number.value);
    teacherDetailsFormData.append('age', event.target.age.value);
    teacherDetailsFormData.append('experience', event.target.experience.value);
    teacherDetailsFormData.append('address', event.target.address.value);



    // documents
    const teacherDocumentsFormData = new FormData();

    const id_proof = event.target.id_proof.files[0];
    teacherDocumentsFormData.append('id_proof', id_proof);

    const photo_proof = event.target.photo_proof.files[0];
    teacherDocumentsFormData.append('photo_proof', photo_proof);



    const tenth_proof = event.target.tenth_proof.files[0];
    teacherDocumentsFormData.append('tenth_proof', tenth_proof);

    const plustwo_proof = event.target.plustwo_proof.files[0];
    teacherDocumentsFormData.append('plustwo_proof', plustwo_proof);

    const graduation_proof = event.target.graduation_proof.files[0];
    teacherDocumentsFormData.append('graduation_proof', graduation_proof);

    const experience_proof = event.target.experience_proof.files[0];
    teacherDocumentsFormData.append('experience_proof', experience_proof);

    console.log('teacherDetailsFormData:', teacherDetailsFormData);




    
    
    const userRegistrationEndpoint = baseURL + '/api/accounts/teacher/teacher_signup/';
    const teacherDetailsEndpoint = baseURL + '/api/accounts/teacher/teacher_details/';
    const teacherDocumentsEndpoint = baseURL + '/api/accounts/teacher/teacher_documents/';



    try {
      const userResponse = await axios.post(userRegistrationEndpoint, userFormData);

      const userId = userResponse.data.user_id;
      console.log('iddddddddd',userId);


      teacherDetailsFormData.append('user', userId);
      console.log(teacherDetailsFormData);

      const teacherDetailsResponse = await axios.post(teacherDetailsEndpoint, teacherDetailsFormData);
      console.log('User detail  Registration Response:', teacherDetailsResponse.data);

      
      teacherDocumentsFormData.append('user', userId);
      const teacherDocumentsResponse = await axios.post(teacherDocumentsEndpoint, teacherDocumentsFormData);
      console.log('Teacher documents Uploaded:', teacherDocumentsResponse.data);

      

      



      if (teacherDetailsResponse.status === 200) {
        console.log('Teacher Details Response:', teacherDetailsResponse.data);
        const  registeredEmail=teacherDetailsResponse.data.email
        localStorage.setItem('registeredEmail', registeredEmail);
        navigate('/teacher/teacher_otp');
        return teacherDetailsResponse;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('Error:', error.response.data);
        const errorData = error.response.data.errors;
      
        if (errorData && errorData.email && errorData.email.length > 0) {
          setEmailError(errorData.email[0]);
        } else {
          setLoginError('An error occurred during teacher signup.');
        }
       
        
      } else {
        console.log('Error:', error.message);
        console.log(teacherDetailsFormData);
      }
    }
  }

  return (
    <div className=" p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto my-10">
        <div>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-orange-500 text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>
       
              <div className="lg:col-span-2">
              <form method='post' onSubmit={handleFormSubmit} encType='multipart/form-data'>
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-6">
                    <label htmlFor="username">Full Name</label>
                    <input type="text" name="username" id="username" placeholder='enter your name' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                    {usernameError && <span className="text-red-800 text-sm">{usernameError}</span>}
                  </div>

                  <div className="md:col-span-6">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="enetr your email" />
                    {emailError && <span className="text-red-800 text-sm">{emailError}</span>}

                  </div>

                  

                  <div className="md:col-span-2">
                    <label htmlFor="number">Phone Number</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='text' name="number" id="number"  placeholder='phone number' className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                    {numberError && <span className="text-red-800 text-sm">{numberError}</span>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="age">Age</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='text' name="age" id="age" placeholder="age " className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                    {ageError && <span className="text-red-800 text-sm">{ageError}</span>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="experiance">Year of experiance</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='text' name="experience" id="experiance" placeholder="experiance" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                    {experienceError && <span className="text-red-800 text-sm">{experienceError}</span>}
                  </div>


                  <div className="md:col-span-6">
                    <label htmlFor="address">Address</label>
                    <textarea name="address" id="address" className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 resize-none" placeholder="Enter your address"></textarea>
                    {addressError && <span className="text-red-800 text-sm">{addressError}</span>}
                </div>



                  <div className="md:col-span-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="enter password" />
                    {passwordError && <span className="text-red-800 text-sm">{passwordError}</span>}
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" name="cpassword" id="cpassword" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="confirm password" />
                    {cpasswordError && <span className="text-red-800 text-sm">{cpasswordError}</span>}
                  </div>




                  <div className="md:col-span-6 mt-5 flex">
                    <h1 className='text-lg text-indigo-800'>Upload Documents</h1><span className='mt-1 ml-3 text-red-900'>(All fields are required)</span>
                  </div>

                  <div className="md:col-span-6 mb-3 ">
                    <label htmlFor="soda" className='mr-10 mt-2'>Id Proof (voter id or driving license adhar)</label>
                    <div className="h-10 mt-3 w-150 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='file' name="id_proof"  className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                  </div>

                  <div className="md:col-span-6 mb-3 ">
                    <label htmlFor="soda" className='mr-10 mt-2'>Photo (paport size photo of user)</label>
                    <div className="h-10 mt-3 w-150 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='file' name="photo_proof" className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                  </div>

                  <div className="md:col-span-6 mb-3 ">
                    <label htmlFor="soda" className='mr-10 mt-2'>10 th Certificate (sslc or cbsce)</label>
                    <div className="h-10 mt-3 w-150 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='file' name="tenth_proof" id="10th-proof" className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                  </div>


                  <div className="md:col-span-6 mb-3 ">
                    <label htmlFor="soda" className='mr-10 mt-2'>Plus Two Certificate (front side)</label>
                    <div className="h-10 mt-3 w-150 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='file' name="plustwo_proof"  className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                  </div>


                  <div className="md:col-span-6 mb-3 ">
                    <label htmlFor="soda" className='mr-10 mt-2'>Graduuation (any higher study certificate)</label>
                    <div className="h-10 mt-3 w-150 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='file' name="graduation_proof"  className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                  </div>

                  <div className="md:col-span-6 mb-3 ">
                    <label htmlFor="soda" className='mr-10 mt-2'>Experience Document (teaching or working  experience  in this field)</label>
                    <div className="h-10 mt-3 w-150 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='file' name="experience_proof"  className="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                    {fileError && <span className="text-red-800 text-sm">{fileError}</span>}
                  </div>


              

           
                  

                  <div className="md:col-span-5 text-right">
                  {loginError && <span className="text-red-800 text-sm">{loginError}</span>}
                    <div className="inline-flex items-end">
                      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </div>
                  </div>
                </div>
                </form>
              </div>
          


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSignup;
