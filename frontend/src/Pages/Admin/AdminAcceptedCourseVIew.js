import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../Components/Admin/Sidebar';
import AdminHeader from '../../Components/Admin/AdminHeader';

function AdminAcceptedCourseView() {
    const baseURL = "http://127.0.0.1:8000";
    const token = localStorage.getItem('access');
    const [selectedVideo, setSelectedVideo] = useState(null);
    
    const [course, setCourse] = useState({
        course_id:'',
        course_name:'',
        user:'',
        description:'',
        level:'',
        benefit1:'',
        benefit2:'',
        benefit3:'',
        original_price:'',
        offer_price:'',
        demo_video:null,
        videos: [],
        purchased:false,
        allVideosAccepted: false,
        course_accepted:false
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${baseURL}/student/course_view/${id}/`);
                const data = response.data;
                const allVideosAccepted = data.videos.every(video => video.is_accepted);
                setCourse({
                    course_id:data.course.id,
                    course_name:data.course.course_name,
                    user:data.course.user,
                    description:data.course.description,
                    benefit1:data.course.benefit1,
                    level:data.course.level,
                    benefit2:data.course.benefit2,
                    benefit3:data.course.benefit3,
                    demo_video:data.course.demo_video,
                    original_price:data.course.original_price,
                    offer_price:data.course.offer_price,
                    videos: data.videos,
                    allVideosAccepted: allVideosAccepted,
                    course_accepted: data.course.is_accepted
                });
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };
        
        fetchCourse();
    }, [id]);

    const acceptVideo = (id) => {
        const confirmAccept = window.confirm('Are you sure you want to accept this video?');
      
        if (confirmAccept) {
            axios.patch(`${baseURL}/adminapp/video_status/${id}/`, { is_accepted: true })
            .then((response) => {
                console.log('course accepted successfully', response);
                setCourse(prevCourse => {
                    const updatedVideos = prevCourse.videos.map(video => {
                        if (video.id === id) {
                            return { ...video, is_accepted: true };
                        }
                        return video;
                    });
                    const allVideosAccepted = updatedVideos.every(video => video.is_accepted);
                    return { ...prevCourse, videos: updatedVideos, allVideosAccepted: allVideosAccepted };
                });
            })
            .catch((error) => {
                console.error('Error accepting course:', error);
            });
        }
    };
    
    const acceptCourse = () => {
        const confirmAccept = window.confirm('Are you sure you want to accept this course?');
        if (confirmAccept) {
            axios.patch(`${baseURL}/adminapp/course_status/${id}/`, { is_accepted: true })
            .then((response) => {
                console.log('course accepted successfully', response);
                setCourse(prevCourse => ({
                    ...prevCourse,
                    course_accepted: true
                }));
            })
            .catch((error) => {
                console.error('Error accepting course:', error);
            });
        }
    };

    const handleVideoClick = (video) => {
        setSelectedVideo({
            ...video,
            video_url: baseURL + video.video 
        });
    };
    

    console.log('course--',course);
    console.log('vdo--',selectedVideo);
    
  return (

<div>
<Sidebar />
      <AdminHeader />
      <div className="w-full md:w-[calc(100%-286px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
        <div className='p-6'>
        <div className=" mt-5 bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className='flex justify-between'>
                <div>
                    <h1 className="text-gray-600 text-3xl font-semibold">Course View</h1>
                    <Link to="/admin/course_list">
                    <span className="text-md">Go back</span>
                    </Link>
                </div>
                <div>

                {!course.course_accepted && course.allVideosAccepted && (
                                    <button onClick={acceptCourse} className="bg-orange-600 px-4 py-2 rounded-md mt-4 text-white font-semibold tracking-wide cursor-pointer">
                                        Accept Course
                                    </button>
                                )}
                                {course.course_accepted && (
                    <span className="text-green-600 font-semibold">Course Accepted</span>
                )}
                </div>
            </div>
    
     
        <div className=" my-10 mx-10 grid gap-5 gap-y-2 text-sm grid-cols-1 lg:grid-cols-5">
        {course.demo_video && (
            <div className="lg:col-span-2">
                <video className="w-full" controls>
                <source src={course.demo_video} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
            )}

          <div className="lg:col-span-3">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
              <div className="md:col-span-6  mx-10">
                <h1 className='text-indigo-800'
                style={{ width: '100%', display: 'block', fontSize: '2.5rem', lineHeight: 1 }}>
                    {course.course_name}
                </h1>
              </div>


              <div className="md:col-span-6 mt-3  mx-10 flex">
                <p style={{  fontSize: '1rem'}}>by {course.user}</p>

                <svg className="mt-1 ml-2 w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
              </div>


              <div className="md:col-span-6 mt-5 mx-10" >
                <p className='mt-3' style={{  fontSize: '1.2rem'}} >
                {course.description}
                </p>
              </div>
              <div className="md:col-span-6 mt-5  mx-10" >
                <p className='mt-3' style={{  fontSize: '1.2rem'}} >
                  <span className='text-indigo-500' >Course Level </span> :  {course.level}</p>
              </div>
              <div className="md:col-span-6 mt-3  mx-10">
                <p style={{  fontSize: '1.2rem'}}>
                   <span className='text-indigo-500' >Category </span>:  FullStack Development</p>
              </div>
            </div>
          </div>
        </div>




        <div className="grid gap-5 gap-y-2 text-sm grid-cols-1 lg:grid-cols-5 my-20">
        <div className="lg:col-span-2" >
        <div className="rounded-3xl w-30 p-8 ring-1 xl:p-10 ring-gray-700">
            <h3 id="tier-startup" className="text-2xl font-semibold leading-8 text-gray-900">Pricing</h3>
            <p className="mt-6 flex items-baseline gap-x-1">
            <span className="text-2xl font-bold text-gray-700"><strike>₹{course.original_price}</strike></span>

            <span className="text-4xl font-bold tracking-tight text-yellow-700">₹{course.offer_price}</span>
            <span className="text-sm font-semibold leading-6 text-teal-600">RS only</span>
            </p>
            <ul className="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-pink-600">
            <li className="flex gap-x-3">
                <svg className="h-6 w-5 flex-none text-purple-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Access to all Videos
            </li>

            <li className="flex gap-x-3">
                <svg className="h-6 w-5 flex-none text-purple-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
            Connect with Author
            </li>

            <li className="flex gap-x-3">
                <svg className="h-6 w-5 flex-none text-purple-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Become a certified FullStack developer
            </li>
            </ul>

            
            
           

        </div>
        </div>

            <div className="lg:col-span-3">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                    <div className="md:col-span-6  mx-10">

                        <h1 className="mb-5 text-2xl font-semibold text-gray-900 ">What are the benefits You will Get</h1>
                            <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400 mt-2">
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                    </svg>
                                    <span className='text-lg'>{course.benefit1}</span>
                                </li>
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                    </svg>
                                    <span className='text-lg'>{course.benefit2}</span>
                                </li>
                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                    </svg>
                                    <span className='text-lg'>{course.benefit3}<span class="font-semibold text-gray-900 dark:text-white">1 developer</span></span>
                                </li>


                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                    </svg>
                                    <span className='text-lg'>Premium support <span class="font-semibold text-gray-900 dark:text-white">6 months</span></span>
                                </li>


                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                    </svg>
                                    <span className='text-lg'>Free updates <span class="font-semibold text-gray-900 dark:text-white">6 months</span></span>
                                </li>


                                <li class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                    </svg>
                                    <span className='text-lg'>SkillBridge course completion ceritificate <span class="font-semibold text-gray-900 dark:text-white">6 months</span></span>
                                </li>
                            </ul>


                    </div>
                </div>
            </div>
        </div>



        <div className="grid gap-5 gap-y-2 text-sm grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3" >
                <h1 className="mb-5 text-2xl font-bold text-indigo-900 ">Course Content</h1>
                <div className="mt-20">


                {course.videos.map((video) => (
                        <div key={video.id} onClick={() => handleVideoClick(video)} className="px-6 sm:px-8  m-auto">
                            <ul className="border border-gray-200 rounded overflow-hidden flex">
                                <div className="flex-1">
                                    <li className="text-lg px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-100 transition-all duration-300 ease-in-out">{video.video_name}</li>
                                </div>
                                <div className="flex-none">
                                    {video.is_accepted ? (
                                        <button disabled className="bg-green-600 px-1 py-1 rounded-md mt-4 ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                        Accepted
                                        </button>
                                    ) : (
                                        <button onClick={() => acceptVideo(video.id)} className="bg-blue-600 px-1 py-1 rounded-md mt-4 ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                            Accept
                                        </button>
                                    )}
                                </div>
                            </ul>
                        </div>
                    ))}


                

                </div>
            </div>

            <div className="lg:col-span-2">
            {selectedVideo && (
                <div className="lg:col-span-2">
                    <video key={selectedVideo.video_url} className="w-full" controls>
                        <source src={selectedVideo.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            </div>

        </div>



      </div>
    </div>
  </div>
</div>
  );
}

export default AdminAcceptedCourseView;
