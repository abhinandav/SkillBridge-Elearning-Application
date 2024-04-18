import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditVideo() {
  const baseURL='http://127.0.0.1:8000';
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);

  const [videoData, setVideoData] = useState({
    video_name: '',
    description: '',
    video: null,
    course: id || '',
    is_rejected:false,
    rejected_reason:'',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoData({ ...videoData, video: file });
  };

  console.log(videoData);



  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${baseURL}/teacher/edit_video/${id}/`);
        const Data=response.data

        let Video = null;
            if (Data.video instanceof File) {
                Video = Data.video;
            } else {
                Video = Data.video ? baseURL + Data.video : null;
            }

        setVideoData({
          video_name: Data.video_name,
          description: Data.description,
          video: Video,
          course: Data.course,
          is_rejected:Data.is_rejected,
          rejected_reason:Data.rejected_reason
        });
        
        console.log('data',response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    
    fetchVideo();
  }, [id]);





  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video_name', videoData.video_name);
    formData.append('description', videoData.description);
    formData.append('course', parseInt(videoData.course));

    if (videoData.video instanceof File) {
      formData.append('video', videoData.video);
  }


    try {
      const response = await axios.put(`${baseURL}/teacher/edit_video/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      });
      if (response.status===201){
        console.log('Video uploaded successfully:', response.data);
        navigate(`/teacher/view_course/${parseInt(videoData.course)}`);
        toast.success(' Video Edited SuccessFully..');
      }
      
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };


  
  


console.log('videoData',videoData);



  return (
    <div>
      <div className="p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-x mx-auto my-10">
          <div>
            <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-orange-500 text-lg">Edit Videos</p>
                    <p>Please fill out all the fields.</p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">

                    <div className='flex flex-col md:col-span-6'>
                      {videoData.is_rejected && (
                        <span className='text-red-500'>Reason : {videoData.rejected_reason}</span>
                      )}
                    </div>

                      <div className="md:col-span-6">
                        <label htmlFor="username">Video name</label>
                        <input
                          type="text"
                          name="video_name"
                          value={videoData.video_name}
                          onChange={handleInputChange}
                          placeholder="Enter video name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-6 mt-3">
                        <label htmlFor="address">Description</label>
                        <textarea
                          name="description"
                          value={videoData.description}
                          onChange={handleInputChange}
                          className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 resize-none"
                          placeholder="Enter description"
                        ></textarea>
                      </div>
                      <div className="md:col-span-4 mt-3">
                        <label htmlFor="demo">Add Video</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            type="file"
                            name="video"
                            onChange={handleFileChange}
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          />
                        </div>

                        {videoData.video && ( 
                          <p className="mt-2 text-sm text-gray-500">
                            <Link to={videoData.video}>Current Video</Link>
                          </p>
                        )}

                      </div>

                      <div className="md:col-span-6 mt-3">
                        {uploadProgress > 0 && (
                          <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                  {uploadProgress}%
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                              <div
                                style={{
                                  width: `${uploadProgress}%`,
                                  transition: 'width 1s ease', // Adjusted duration to 1 second
                                }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                        <div className="flex justify-between">
                          <button  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                          <Link className='mt-2 ml-3' to={`/teacher/view_course/${parseInt(videoData.course)}`}>
                            <span className="bg-white mt-4 hover:bg-gray-500 text-blue-500 font-bold py-2 px-4 rounded">cancel</span>
                          </Link>
                        </div>

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
  );
}

export default EditVideo;
