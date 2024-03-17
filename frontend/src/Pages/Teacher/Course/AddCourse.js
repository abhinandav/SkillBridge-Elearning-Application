import React, {  useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';

function AddCourse() {
    const baseURL='http://127.0.0.1:8000'
    const token = localStorage.getItem('access');
    const navigate=useNavigate()


    const [formData, setFormData] = useState({
        course_name: '',
        description: '',
        category: '',
        level: '',
        demo_video:null,
        benefit1:'',
        benefit2:'',
        benefit3:'',
        original_price:'',
        offer_price:'',
        added_by:null

      });
    
      const handleChange = (e) => {
        if (e.target.name === 'demo') {
          setFormData({
            ...formData,
            demo_video: e.target.files[0] 
          });
        } else {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
        }
      };
      

      console.log(formData);


      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(baseURL+'/teacher/add_course/',  formData,
            {
              headers: {
                'content-type': 'multipart/form-data',
                'authorization': `Bearer ${token}`,  
              }
            }
          )
          if (response.status===201)
          {
            navigate(`/teacher/add_videos/${response.data.id}`);
            console.log('Course added successfully:', response.data);
          }
        } catch (error) {
          console.error('Error adding course:', error);
        }
      };

  return (
    <div>
      <div className=" p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-x mx-auto my-10">
        <div>
        <form method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">


            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-orange-500 text-lg">Add Common Details</p>
                <p>Please fill out all the fields.</p>
              </div>
       
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-6">
                    <label htmlFor="username">Course  Name</label>
                    <input type="text" name="course_name" value={formData.course_name} onChange={handleChange} placeholder='enter course name' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                  </div>

                  <div className="md:col-span-6 mt-3">
                    <label htmlFor="address">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 resize-none" placeholder="Enter description"></textarea>
                </div>


                  <div className="md:col-span-2">
                    <label htmlFor="number">Category</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='text' name="category" value={formData.category} onChange={handleChange} placeholder='category' className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="age">Course Level</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='text' name="level" value={formData.level} onChange={handleChange} placeholder="course level " className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                  </div>

             
                  <div className="md:col-span-4 mt-3">
                    <label htmlFor="demo">Add Demo Video</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input type='file' name="demo"  onChange={handleChange}  className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                    </div>
                  </div>
    

    

                  


                <h3 className=' md:col-span-6 mt-5'>Benefits</h3>
                  <div className="md:col-span-6">
                    <input type="text" name="benefit1" value={formData.benefit1} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder='enter benefits'/>
                  </div>

                  <div className="md:col-span-6">
                    <input type="text" name="benefit2" value={formData.benefit2} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='enter benefits' />
                  </div>

                  <div className="md:col-span-6">
                    <input type="text" name="benefit3" value={formData.benefit3} onChange={handleChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='enter benefits' />
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
                    <input type="text" name="original_price" value={formData.original_price} onChange={handleChange} placeholder='enter  original price' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                  </div>
                </div>

                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 mt-5">
                  <div className="md:col-span-3">
                    <label htmlFor="offer_price">Offer Price</label>
                    <input type="text" name="offer_price" value={formData.offer_price} onChange={handleChange} placeholder='enter  offer3 price' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                  </div>


                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Save and Add Videos</button>
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

export default AddCourse