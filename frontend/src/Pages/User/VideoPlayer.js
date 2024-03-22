import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Lin, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


function VideoPlayer() {
    const baseURL = "http://127.0.0.1:8000";
    const token = localStorage.getItem('access');
    const authentication_user=useSelector(state=>(state.authentication_user))
    console.log('aaaa',authentication_user.userid);

    const { id, vid } = useParams();

    const [videoUrl, setVideoUrl] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState('');
    const [comments, setComments] = useState([]);
    const [showReplyField, setShowReplyField] = useState(false);
    const [replyComment, setReplyComment] = useState('');



    const [course, setCourse] = useState({
        videos: []
    });
    
    const fetchCourse = async () => {
        try {
        const response = await axios.get(`${baseURL}/student/course_view/${id}/`);
        const data=response.data
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
            is_accepted:data.course.is_accepted,
        });
        console.log('data',response.data);

        } catch (error) {
        console.error("Error fetching course:", error);
        }
    };
        

    const fetchVideoDetails = async () => {
        try {
            const response = await axios.get(`${baseURL}/student/courses/${id}/videos/${vid}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setVideoUrl(response.data.video); 
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching video details:', error);

        }
    };

    const handleVideoLinkClick = (newVideoId) => {
        setVideoUrl(''); 
        setLoading(true); // Set loading state to true when fetching video details
        window.history.pushState(null, null, `/videoplayer/${id}/${newVideoId}`);
        fetchVideoDetails();
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/student/courses/${id}/videos/${vid}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setVideoUrl(response.data.video); 
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching video details:', error);
                setLoading(false); 
            }
        };

        fetchData();
    }, [id, vid, token]);


    
    useEffect(() => {
        fetchVideoDetails();
    }, [id, vid, token]);

    useEffect(() => {
        fetchCourse();
    }, [id]);




    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            if (!authentication_user.isAuthenticated) {
                console.error('User is not authenticated.');
                return;
            }
    
            const response = await axios.post(baseURL+'/student/add_comment/', {
                user: authentication_user.userid,
                course: id,
                video: vid,
                comment: comment
            },{headers: {
                'authorization': `Bearer ${token}`,  
              }});
    
            console.log('Comment added successfully:', response.data);
            setComment('');
            fetchVideoComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    

    const fetchVideoComments = async () => {

        try {
            const response = await axios.get(baseURL+`/student/video_comments/${vid}/`);
            const comments = response.data;
            setComments(response.data);
            console.log('Comments:', comments);

        } catch (error) {
            console.error('Error fetching video comments:', error);
        }
    };
    

    
    useEffect(() => {
        fetchVideoComments();
    },[vid]);
        



    const handleReplySubmit = (event) => {
        event.preventDefault();
        console.log('Reply submitted:', replyComment);
        setShowReplyField(false);
        setReplyComment('');
    };

    const [replyFields, setReplyFields] = useState({});

    const handleReplyClick = (commentId) => {
    setReplyFields((prevFields) => ({
        ...prevFields,
        [commentId]: !prevFields[commentId] // Toggle the state for the specific comment
    }));
};
    



  return (

        <div>
        <div className="  bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-x mx-auto my-8">
            <div className="  bg-white rounded shadow-lg  md:p-8 mb-6">

            
                <nav className="flex" aria-label="Breadcrumb">
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
                </nav>
                

                <div className=" my-10 mx-10 grid gap-5 gap-y-2 text-sm grid-cols-1 lg:grid-cols-6">


                    {videoUrl && (
                    <div className="lg:col-span-4 w-200">
                        <div>
                        <video className="" autoplay controls >
                        <source src={baseURL+videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                        </div>

                        <div className=''>
                            <h1 className="mb-5 text-2xl font-bold text-gray-600 text-center mt-10 ">Comments</h1>

                            <div className="flex mx-auto items-center justify-center  mt-5 mr-80 mb-4 ">
                            <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                                    <div className="w-full md:w-full px-3 mb-2 mt-2">
                                        <textarea
                                            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                            name="body"
                                            placeholder="Type Your Comment"
                                            value={comment}
                                            onChange={(event) => setComment(event.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="w-full md:w-full flex items-start md:w-full px-3">
                                        <div className="flex items-start  text-gray-700 px-2 mr-auto">
                                            <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Only verified people around here
                                        </div>
                                        <div className="-mr-1">
                                            <input
                                                type="submit"
                                                className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                                value="Post Comment"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>

                            </div>


  
                                {/* {comments.map((comment) => (
                                    <div  key={comment.id} className="my-7 max-w-2xl"> 
                                        <div className="flex justify-between items-center">
                                        <div className=" flex items-center space-x-4 ">
                                            <div className="">
                                            <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80" alt="" />
                                            </div>
                                            <div>

                                                <div className='flex'>
                                                    <div className="text-md font-bold w-30">{comment.username}  </div> 
                                                    <span onClick={handleReplyClick} className='ml-5'>replay</span>
                                                </div>
                                                <div className="text-sm"> • {comment.date_added}</div>
                                            </div>
                                        </div>
                                        </div>


                                        <p className="mt-2 mx-20 text-md text-gray-600 w-30">{comment.comment}</p>
                                        {showReplyField && (
                                            <form onSubmit={handleReplySubmit} className='mx-20 my-5 w-full max-w-xl'>
                                                <textarea
                                                    value={replyComment}
                                                    onChange={(e) => setReplyComment(e.target.value)}
                                                    placeholder="Enter your reply"
                                                    className="w-full h-15 resize-none border rounded-md p-2"
                                                />
                                                <button type="submit">Submit</button>
                                            </form>
                                        )}
                                    </div>
                                     ))} */}


                            {comments.map((comment) => (
                                <div key={comment.id} className="my-7 max-w-2xl">
                                    <div className="flex justify-between items-center">
                                        <div className=" flex items-center space-x-4 ">
                                        <div className="">
                                            <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80" alt="" />
                                            </div>
                                            <div>

                                                <div className='flex'>
                                                    <div className="text-md font-bold w-30">{comment.username}  </div>
                                                        <span onClick={() => handleReplyClick(comment.id)} className='ml-5'>Reply</span>
                                                    </div>
                                                <div className="text-sm"> • {comment.date_added}</div>
                                            </div>
                                        </div>
                                        </div>
                                    {replyFields[comment.id] && (
                                        <form onSubmit={handleReplySubmit} className='mx-20 my-5 w-full max-w-xl'>
                                            <textarea
                                                value={replyComment}
                                                onChange={(e) => setReplyComment(e.target.value)}
                                                placeholder="Enter your reply"
                                                className="w-full h-15 resize-none border rounded-md p-2"
                                            />
                                            <button type="submit">Submit</button>
                                        </form>
                                    )}
                                </div>
                            ))}





                        </div>
                    </div>
                    )}
                    
                    <div className="lg:col-span-2 bg-gray-50 py-5">
                        <h1 className="mb-5 text-2xl font-bold text-gray-600 text-center ">Course Content</h1>
                        <div className="mt-10">
                            <div className="bg--200">
                                <ul className="border border-gray-100 rounded overflow-hidden flex">
                                    <div className="flex-1">
                                        {course.videos.map((video) => (

                                            <Link to={`/videoplayer/${id}/${video.id}`}
                                             key={video.id} 
                                             onClick={() => handleVideoLinkClick(video.id)}>
                                                
                                                <li className="text-lg my-2 p-5 px-4 py-2 bg-gray-50 hover:bg-sky-50 hover:text-sky-900 border-b last:border-none border-gray-100 transition-all duration-300 ease-in-out">
                                                    {video.video_name}
                                                </li>
                                            </Link>
                                        ))}
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
            
                </div>




            </div>
            </div>
        </div>
        </div>
  );
}

export default VideoPlayer;
