import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaEdit  } from 'react-icons/fa'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";


function TeacherCourseView() {
    const baseURL = "http://127.0.0.1:8000";
    const navigate=useNavigate()
    const [course, setCourse] = useState({
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
        is_blocked:'',
        is_rejected:'',
        reject_reason:'',
        videos: []

    });
    const { id } = useParams();

    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }



    const fetchCourse = async () => {
        try {
          const response = await axios.get(`${baseURL}/student/course_view/${id}/`);
          const data=response.data
          console.log('data',data);
          setCourse({
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
              is_blocked:data.course.is_blocked,
              is_accepted:data.course.is_accepted,
              is_rejected:data.course.is_rejected,
              reject_reason:data.course.reject_reason


          });
          console.log(response.data);
          console.log('ss',data.course.is_accepted);
            if (data.course.is_accepted===false){
                toast.error(' Your Course is Not yet Verified');
            }
        } catch (error) {
          console.error("Error fetching course:", error);
        }
      };

    useEffect(() => {
        fetchCourse();
      }, [id]);



    const blockCourse = (id) => {
        const confirmBlock = window.confirm('Are you sure you want to block this course?');
        if (confirmBlock) {
            axios.patch(`${baseURL}/teacher/course_status/${id}/`, { is_blocked: true })
            .then((response) => {
                console.log('User blocked successfully', response);
                fetchCourse();
            })
            .catch((error) => {
                console.error('Error blocking course:', error);
            });
        }
    };


    const unblockCourse = (userId) => {
        const confirmUnblock = window.confirm('Are you sure you want to unblock this course?');
        if (confirmUnblock) {
            axios.patch(`${baseURL}/teacher/course_status/${id}/`, { is_blocked: false })
            .then((response) => {
              console.log('User unblocked successfully', response);
              fetchCourse();
            })
            .catch((error) => {
              console.error('Error unblocking user:', error);
            });
        }
      };


      console.log('reject_reason',course.reject_reason)
      
      
    const handleStartLesson = (id, firstVideoId) => {
    navigate(`/teacher/tvideoplayer/${id}/${firstVideoId}`);
    };


  return (

<div>
  <div className="  px-10 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-x mx-auto my-5">
      <div className=" mt-5 bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">

    
        <nav className="  flex justify-between" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
        <Link to='/'>
            <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-orange-600 dark:text-black-400 dark:hover:text-orange">
                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                Home
            </span>
        </Link>
            </li>
            <li>
            <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <Link to='course_list'> 
                <span className="ms-1 text-sm font-medium text-gray-700 hover:text-orange-600 md:ms-2 dark:text-black-400 dark:hover:text-orange">Courses</span>
                </Link>
            </div>
            </li>
            <li aria-current="page">
            <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="ms-1 text-sm font-medium text-black-500 md:ms-2 dark:text-black-400">View course</span>
            </div>
            </li>
        </ol>
        <div className='flex'>

            {course.is_rejected &&(
                <span className='text-red-500 font-semibold mt-2'>course rejected</span>
            )}


            <div className="relative mx-10">
            <button
                id="dropdownDelayButton"
                data-dropdown-toggle="dropdownDelay"
                data-dropdown-delay="500"
                data-dropdown-trigger="hover"
                className=" font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
                type="button"
                onClick={toggleDropdown}
            >
                Options
                <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
                >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                />
                </svg>
            </button>


        {isOpen && (
            <div
            id="dropdownDelay"
            className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                <li>
                    <Link to={`/teacher/edit_course/${id}`}>
                        <span aria-describedby="tier-startup" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit Course</span>
                    </Link>
                </li>
                <li>
                    {course.is_blocked ? (
                        <button onClick={() => unblockCourse(id)} aria-describedby="tier-startup"  className="block px-4 py-2  text-green-500  dark:hover:text-green-500">
                            Unblock
                        </button>
                        ) : (
                        <button onClick={() => blockCourse(id)} className="block px-4 py-2 text-red-500   dark:hover:text-red-500">
                            Block
                        </button>
                    )}
                </li>
                
            </ul>
            </div>
        )}
            </div>

        </div>
        </nav>



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

                {course.is_rejected &&(
                    <span className='flex text-red-500 font-semibold text-md'><CiCircleInfo  className='mr-3 mt-1 font-semibold'/>{course.reject_reason}</span>
                )}

               <Link to={`/teacher/tvideoplayer/${id}/${course.videos[0]?.id}`}>
                    <h1 className='text-indigo-800'   style={{ width: '100%', display: 'block', fontSize: '2.5rem', lineHeight: 1 }}>
                        {course.course_name}
                    </h1>
                </Link>

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
            {/* <span aria-describedby="tier-startup" className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-600 text-white shadow-sm hover:bg-green-800 focus-visible:outline-red-600">Buy plan</span> */}

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



        <div className="grid gap-5 gap-y-2 text-sm grid-cols-1 lg:grid-cols-5 bg-orange-00">
            <div className="lg:col-span-3" >
                <h1 className="mb-5 text-2xl font-bold text-indigo-900 ">Course Content</h1>
                <div className="mt-20">
                {course.videos.map((video) => (

                    <div  key={video.id} className="px-4 sm:px-8  m-auto">
                        <ul className="border border-gray-200 rounded overflow-hidden flex">
                            <div className="flex-1">
                                <li className="text-lg px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-100 transition-all duration-300 ease-in-out">{video.video_name}</li>
                            </div>


                            <Link to={`/teacher/edit_video/${video.id}`}>
                            <div className="flex">
                                <div className='-mt-2'>

                                {(video.is_accepted | video.is_rejected) ? ( 
                                    video.is_accepted ? (
                                        <button disabled className="bg-green-600 px-1 py-1 rounded-md mt-4 ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                            Accepted
                                        </button>
                                    ) : ( 
                                        <button className="bg-red-600 px-1 py-1 rounded-md mt-4 ml-3 text-white font-semibold tracking-wide cursor-pointer">
                                            Rejected
                                        </button>
                                    )
                                ) : ( 
                                   <di className='mt-2 flex text-center '> 
                                     <span className='mt-3 text-blue-500 '>pending....</span>
                                   </di>
                                )}




                                </div>
                                <FaEdit  className='mt-3 mx-10' />
                            </div>
                            </Link>
                        </ul>
                    </div>
                ))}
                </div>

                <div className='flex justify-between'>
                    <div></div>
                    <Link to={`/teacher/add_video/${id}`} className='mr-5'>
                        <span   span aria-describedby="tier-startup" className=" flex mt-6 w-40 mr-5 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-600 text-white shadow-sm hover:bg-green-800 focus-visible:outline-red-600">Add new Video <span className='ml-3 mt-2 font-semibold'><FaPlus /></span> </span>
                    </Link>
                </div>

                
            </div>

        </div>



      </div>
    </div>
  </div>
</div>
  );
}

export default TeacherCourseView;
