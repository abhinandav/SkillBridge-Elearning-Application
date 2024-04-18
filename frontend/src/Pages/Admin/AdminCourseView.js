
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../Components/Admin/Sidebar';
import AdminHeader from '../../Components/Admin/AdminHeader';

function AdminCourseView() {
    const baseURL = "http://127.0.0.1:8000";
    const token = localStorage.getItem('access');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal0, setShowModal0] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [reason,setReason]=useState('')
    
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
        course_accepted:false,
        course_rejected:false
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${baseURL}/student/course_view/${id}/`,{
                    headers: {
                      'authorization': `Bearer ${token}`,
                      'Accept' : 'application/json',
                      'Content-Type': 'application/json'
                  }
                });
                const data = response.data;
                console.log('dataaa',data);
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
                    course_accepted: data.course.is_accepted,
                    course_rejected: data.course.is_rejected,
                });
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };
        
        fetchCourse();
    }, [id]);

    

    const acceptVideo = (id) => {
            axios.patch(`${baseURL}/adminapp/video_status/${id}/`, { is_accepted: true },{
                headers: {
                  'authorization': `Bearer ${token}`,
                  'Accept' : 'application/json',
                  'Content-Type': 'application/json'
              }
            })
            .then((response) => {
                console.log('course accepted successfully', response);
                setShowModal(false)
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
    };

    const rejectVideo = (id) => {
        axios.patch(`${baseURL}/adminapp/video_status/${id}/`, { is_rejected: true,reason },{
            headers: {
              'authorization': `Bearer ${token}`,
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
          }
        })
        .then((response) => {
            console.log('course rejected successfully', response);
            setIsOpen(false)
            setReason('')
            setCourse(prevCourse => {
                const updatedVideos = prevCourse.videos.map(video => {
                    if (video.id === id) {
                        return { ...video, is_rejected: true };
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
};
    
    const acceptCourse = () => {
            axios.patch(`${baseURL}/adminapp/course_status/${id}/`, { is_accepted: true },{
                headers: {
                  'authorization': `Bearer ${token}`,
                  'Accept' : 'application/json',
                  'Content-Type': 'application/json'
              }
            })
            .then((response) => {
                console.log('course accepted successfully', response);
                setShowModal0(false)
                setCourse(prevCourse => ({
                    ...prevCourse,
                    course_accepted: true
                }));
            })
            .catch((error) => {
                console.error('Error accepting course:', error);
            });

    };



    const rejectCourse = () => {
        axios.patch(`${baseURL}/adminapp/course_status/${id}/`, { is_rejected: true ,reason},{
            headers: {
              'authorization': `Bearer ${token}`,
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
          }
        })
        .then((response) => {
            console.log('course rejected successfully', response);
            setShowModal1(false)
            setCourse(prevCourse => ({
                ...prevCourse,
                course_rejected: true
            }));
        })
        .catch((error) => {
            console.error('Error rejecting course:', error);
        });

};
    const handleVideoClick = (video) => {
        setSelectedVideo({
            ...video,
            video_url: baseURL + video.video 
        });
      
    };
    

    console.log('reject--',reason);
    console.log('vdo--',selectedVideo);
    

    const onchangeRejection=(e)=>{
        setReason(e.target.value)
    }




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
                        {!(course.course_accepted | course.course_rejected ) && course.allVideosAccepted && (
                                <>
                                    <button onClick={()=>setShowModal0(true)} className="bg-orange-600 px-4 py-2 rounded-md mt-4 text-white font-semibold tracking-wide cursor-pointer">
                                        Accept Course
                                    </button>

                                    <button onClick={()=>setShowModal1(true)} className="ml-3 bg-red-600 px-4 py-2 rounded-md mt-4 text-white font-semibold tracking-wide cursor-pointer">
                                    Reject Course
                                    </button>
                                </>
                                        )}

                                {course.course_accepted && (
                                    <span className="text-green-600 font-semibold">Course Accepted</span>
                                )}
                                {course.course_rejected && (
                                    <span className="text-red-600 font-semibold">Course rejected</span>
                                )}
                            </div>
            </div>


                {showModal0 && (
                        <>    
                        <div style={{zIndex:99999}} className="fixed z-9999 inset-0 overflow-y-auto" aria-modal="true" aria-labelledby="modal-headline" >
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Accept This Course
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                        Are you sure you want to Accept ?
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={acceptCourse}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => setShowModal0(false)}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </>
                        )}

                {/* reject course */}

                    {showModal1 && (
                             <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster" style={{ background: 'rgba(0,0,0,.7)' }}>
                             <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                                 <div className="modal-content py-4 text-left px-6">
                                 <div className="flex justify-between items-center pb-3">
                                     <div className='flex flex-col'>
                                     <p className="text-2xl font-bold">Reject This course?</p>
                                     <p className='text-sm text-gray-500 mt-3'>state reason</p>
                                     </div>
                                     <div className="modal-close cursor-pointer z-50" onClick={()=>setIsOpen(false)}>
                                     <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                         <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                     </svg>
                                     </div>
                                 </div>
                                 <div className="my-5">
                                     <textarea onChange={onchangeRejection} className='border border-gray-500 w-96 h-40'></textarea>
                                 </div>
                                 <div className="flex justify-end pt-2">
                                     <button className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300" onClick={()=>setIsOpen(false)}>Cancel</button>
                                     <button onClick={rejectCourse} className="focus:outline-none px-4 bg-red-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Confirm</button>
                                 </div>
                                 </div>
                             </div>
                             </div>
                              )}
    
     
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
                        <div key={video.id}  className="px-6 sm:px-8  m-auto border border-gray-200 rounded overflow-hidden flex">
                     

                                <div onClick={() => handleVideoClick(video)} className="flex-1 mt-2">
                                    <span className="text-lg px-4 mt-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-100 transition-all duration-300 ease-in-out">{video.video_name}</span>
                                </div>

                                <div className="flex-none">
                                    {video.is_accepted ? (
                                        <button disabled className="bg-green-600 px-1 py-1 rounded-md mt-4 ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                        Accepted
                                        </button>
                                    ) : (
                                      (!video.is_rejected) && (
                                        <button onClick={() =>{ setShowModal(true);handleVideoClick(video)}} className="bg-blue-600 px-1 py-1 rounded-md mt-4 ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                            Accept
                                        </button>
                                         )
                                    )} 
                                </div>

                                <div className="flex-none">
                                    {video.is_rejected ? (
                                        <button className="bg-red-600 px-1 py-1 rounded-md mt-4 ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                            Rejected
                                        </button>
                                    ) : (
                                       (!video.is_accepted) && (
                                            <button onClick={() =>{ setIsOpen(true);handleVideoClick(video)}} className="bg-red-600 px-1 py-1 rounded-md mt-4 ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                                Reject
                                            </button>
                                        )
                                    )}
                                </div>


                  
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
                    {showModal && (
                            <div style={{zIndex:99999999}} className="flex flex-col space-y-4 animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
                                    <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <div className="flex flex-col ml-3">
                                                    <div className="font-medium leading-none">Are you sure you want to accept video {selectedVideo.video_name}?</div>
                                                    <p  className="text-sm text-gray-600 leading-none mt-1">By accepting you cant retake action</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setShowModal(false)} className="flex-no-shrink bg-white-500 border border-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-red-500 rounded-full">Cancel</button>
                                            <button onClick={() => acceptVideo(selectedVideo.id)} className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">Accept</button>
                                        </div>
                                    </div>
                                </div>

                            )}

                        <div>
                        {isOpen &&  (
                            <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster" style={{ background: 'rgba(0,0,0,.7)' }}>
                            <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                                <div className="modal-content py-4 text-left px-6">
                                <div className="flex justify-between items-center pb-3">
                                    <div className='flex flex-col'>
                                    <p className="text-2xl font-bold">Reject This  Video?</p>
                                    <p className='text-sm text-gray-500 mt-3'>state reason</p>
                                    </div>
                                    <div className="modal-close cursor-pointer z-50" onClick={()=>setIsOpen(false)}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                    </svg>
                                    </div>
                                </div>
                                <div className="my-5">
                                    <textarea onChange={onchangeRejection} className='border border-gray-500 w-96 h-40'></textarea>
                                </div>
                                <div className="flex justify-end pt-2">
                                    <button className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300" onClick={()=>setIsOpen(false)}>Cancel</button>
                                    <button onClick={() => rejectVideo(selectedVideo.id)} className="focus:outline-none px-4 bg-red-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Confirm</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        )}
                        </div>



  </div>
</div>
  );
}

export default AdminCourseView;
