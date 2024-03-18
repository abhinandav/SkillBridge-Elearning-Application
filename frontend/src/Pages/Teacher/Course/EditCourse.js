import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import {  Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit } from 'react-icons/fa';

function EditCourse() {
    const baseURL='http://127.0.0.1:8000'
    const token = localStorage.getItem('access');
    const navigate=useNavigate()
    const { id } = useParams();
    const [course, setCourse] = useState({
        course_name:'',
        user:'',
        description:'',
        category:'',
        level:'',
        benefit1:'',
        benefit2:'',
        benefit3:'',
        original_price:'',
        offer_price:'',
        demo_video:null,

    });
    
    const handleChange = (e) => {
        if (e.target.name === 'demo') {
            console.log("File input changed:", e.target.files);
            if (e.target.files.length > 0) 
            {
                console.log("File selected. Setting demo_video to:", e.target.files[0]);
                setCourse({
                    ...course,
                    demo_video: e.target.files[0]
                });
            } else {
                console.log("No file selected. Keeping previous demo_video:", course.demo_video);
                setCourse({
                    ...course,
                    demo_video: course.demo_video
                });
            }
        } else {
            setCourse({
                ...course,
                [e.target.name]: e.target.value
            });
        }
    };
    
    
      console.log(course.demo_video);

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${baseURL}/student/course_view/${id}/`);
        const Data=response.data


        let demoVideo = null;
        if (Data.course.demo_video instanceof File) {
            demoVideo = Data.course.demo_video;
        } else {
            demoVideo = Data.course.demo_video ? Data.course.demo_video : null;
        }
        setCourse({
            course_name:Data.course.course_name,
            user:Data.course.user,
            description:Data.course.description,
            category:Data.course.category,
            benefit1:Data.course.benefit1,
            level:Data.course.level,
            benefit2:Data.course.benefit2,
            benefit3:Data.course.benefit3,
            demo_video:demoVideo,
            original_price:Data.course.original_price,
            offer_price:Data.course.offer_price,
            videos: Data.videos
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
      
  useEffect(() => {
    fetchCourse();
  }, [id]);




    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          let formData = new FormData();
          formData.append('course_name', course.course_name);
          formData.append('description', course.description);
          formData.append('level', course.level);
          formData.append('category',course.category)
          formData.append('benefit1', course.benefit1);
          formData.append('benefit2', course.benefit2);
          formData.append('benefit3', course.benefit3);
          formData.append('original_price', course.original_price);
          formData.append('offer_price', course.offer_price);
  
          
          if (course.demo_video instanceof File) {
              formData.append('demo_video', course.demo_video);
          } 

          const response = await axios.post(`${baseURL}/teacher/edit_course/${id}/`, formData, {
              headers: {
                  'content-type': 'multipart/form-data',
                  'authorization': `Bearer ${token}`,  
              }
          });
  
          if (response.status === 201) {
              navigate(`/teacher/view_course/${id}`);
              toast.success(' Edit Successful');
              console.log('Course updated successfully:', response.data);
          }
      } catch (error) {
          console.error('Error updating course:', error);
      }
  };

      console.log(course);

  return (
    <div>
      <div className=" p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-x mx-auto my-10">
        <div>
        <form method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">


            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-orange-500 text-lg">Edit Common Details</p>
                <p>Please fill out all the fields.</p>
              </div>
       
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-6">
                    <label htmlFor="username">Course  Name</label>
                    <input type="text" name="course_name" value={course.course_name} onChange={handleChange} placeholder='enter course name' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                  </div>

                  <div className="md:col-span-6 mt-3">
                    <label htmlFor="address">Description</label>
                    <textarea name="description" value={course.description} onChange={handleChange} className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 resize-none" placeholder="Enter description"></textarea>
                </div>


                  <div className="md:col-span-2">
                    <label htmlFor="number">Category</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='text' name="category" value={course.category} onChange={handleChange} placeholder='category' className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="age">Course Level</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='text' name="level" value={course.level} onChange={handleChange} placeholder="course level " className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                  </div>

             
                  <div className="md:col-span-4 mt-3">
                    <label htmlFor="demo">Add Demo Video</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='file' name="demo"  onChange={handleChange}  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                    {course.demo_video && (
                      <p className="mt-2 text-sm text-gray-500">
                       <Link to={course.demo_video}> Current Demo Video </Link>
                      </p>
                    )}
                  </div>
    

    

                  


                <h3 className=' md:col-span-6 mt-5'>Benefits</h3>
                  <div className="md:col-span-6">
                    <input type="text" name="benefit1" value={course.benefit1} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder='enter benefits'/>
                  </div>

                  <div className="md:col-span-6">
                    <input type="text" name="benefit2" value={course.benefit2} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='enter benefits' />
                  </div>

                  <div className="md:col-span-6">
                    <input type="text" name="benefit3" value={course.benefit3} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='enter benefits' />
                  </div>
                  <div className="md:col-span-5 text-right h-5"></div>
                  <div className="md:col-span-5 text-right h-5"></div>
                </div>
              </div>
            </div>



            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-orange-500 text-lg">Add Pricing</p>
                <p>Please fill out all the fields.</p>
              </div>
       
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-3">
                    <label htmlFor="original_price">Original Price</label>
                    <input type="text" name="original_price" value={course.original_price} onChange={handleChange} placeholder='enter  original price' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                  </div>
                </div>

                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 mt-5">
                  <div className="md:col-span-3">
                    <label htmlFor="offer_price">Offer Price</label>
                    <input type="text" name="offer_price" value={course.offer_price} onChange={handleChange} placeholder='enter  offer3 price' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                  </div>


                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Save </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EditCourse