import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddVideos() {
  const baseURL='http://127.0.0.1:8000';
  const { id } = useParams();
  const navigate = useNavigate();
  const [nameError,setNameError]=useState('')
    const [descError,setDescError]=useState('')
    const [videoError,setVideoError]=useState('')
    const [uploadProgress, setUploadProgress] = useState(0);


  const [videoData, setVideoData] = useState({
    video_name: '',
    description: '',
    video: null,
    course: id || '',
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

  const handleSubmit = async (e, redirect) => {
    e.preventDefault();
    setNameError('')
    setDescError('')
    setVideoError('')


    if (!videoData.video_name.trim()) {
      setNameError('name is required')
  }

  if (!videoData.description.trim()) {
      setDescError('Description  is required');
  }

  if (!videoData.video) {
    setVideoError(' video is not selected');
    return
}

    const formData = new FormData();
    formData.append('video_name', videoData.video_name);
    formData.append('description', videoData.description);
    formData.append('video', videoData.video);
    formData.append('course', parseInt(videoData.course));

    try {
      const response = await axios.post(baseURL+'/teacher/add_video/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          // Update your progress bar state here
          setUploadProgress(progress);
        }
      });
      console.log('Video uploaded successfully:', response.data);
      if (redirect === 'add_course') {
        setUploadProgress(false)
        navigate('/teacher/my_courses');
      } else {
        setUploadProgress(false)
        setVideoData({
          video_name: '',
          description: '',
          video: null,
          course: id || '',
        });
        toast.success('New Video Added');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };
  return (
    <div>
      <div className="p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-x mx-auto my-10">
          <div>
            <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-orange-500 text-lg">Add Videos</p>
                    <p>Please fill out all the fields.</p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
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
                     {nameError && <span className="text-md text-red-800 mt-1 mb-5">{nameError}</span>}

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
                        {descError && <span className="text-md text-red-800 mt-1 mb-5">{descError}</span>}

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
                        {videoError && <span className="text-md text-red-800 mt-1 mb-5">{videoError}</span>}
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
                            <button onClick={(e) => handleSubmit(e, 'add_another')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save & Add Another</button>
                            <button onClick={(e) => handleSubmit(e, 'add_course')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
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

export default AddVideos;
