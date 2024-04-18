import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Lin, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { formatDistanceToNow, longFormatters } from 'date-fns';
import { FaCrown } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FaReply } from "react-icons/fa";
import placeholderprofile from '../../../Images/default/placeholderprofile.webp'


function TeacherVideoPlayer() {
    const baseURL = "http://127.0.0.1:8000";
    const token = localStorage.getItem('access');
    const userid = localStorage.getItem('userid');
    const authentication_user=useSelector(state=>(state.authentication_user))
    // console.log('authentication_user',authentication_user);
    const [editedComment, setEditedComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedReply, setEditedReply] = useState('');
    const [editingReplyId, setEditingReplyId] = useState(null);

    const { id, vid } = useParams();

    const [videoUrl, setVideoUrl] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState('');
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState({});
    const [replyComment, setReplyComment] = useState('');
    const [orderId,setOrderId]=useState()
    const [replyFields, setReplyFields] = useState({});
    const [newReply, setNewReply] = useState(null);
    const [course, setCourse] = useState({ videos: []});

    const [videoId, setVideoId] = useState();

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
            const response = await axios.get(baseURL+`/teacher/tvideoplayer/${id}/${vid}`, {
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
        setLoading(true); 
        window.history.pushState(null, null, `/teacher/tvideoplayer/${id}/${newVideoId}`);
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
    }, [id, vid, videoUrl]);


    
    useEffect(() => {
        fetchVideoDetails();
    }, [id, vid, videoUrl]);


    useEffect(() => {
        fetchCourse();
    }, [id,vid]);




    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            if (!authentication_user.isAuthenticated) {
                console.error('User is not authenticated.');
                return;
            }
    
            const response = await axios.post(baseURL+'/student/add_comment/', {
                user: userid,
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
    



      const checkCoursePurchase = async () => {
        try {
            const response = await axios.get(`${baseURL}/student/purchased/${id}/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('sssssssss',response.data);
            setOrderId(response.data.order_id)
            
            
        } catch (error) {
            console.error("Error checking course purchase:", error);
        }
    };
    



    useEffect(() => {
        fetchVideoComments();
        checkCoursePurchase()
    },[vid]);


    



const handleReplyClick = (commentId) => {
    setReplyFields((prevFields) => ({
        ...prevFields,
        [commentId]: !prevFields[commentId] 
    }));
};




const handleReplySubmit = async (event,commentId, replyContent) => {
    event.preventDefault(); 
    try {
        console.log('Comment ID:', commentId);
        console.log('Reply Content:', replyContent);

        const response = await axios.post(baseURL+`/student/comments/${commentId}/add_reply/`,{
            user:userid,
            comment: commentId,
            reply_text:replyComment
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
            }
        );

        setNewReply(response.data);
        setReplyFields(prevFields => ({
            ...prevFields,
            [commentId]: false
        }));
        setReplyComment('')
    } catch (error) {
        console.error('Error adding reply:', error);
        throw error; 
    }
};


const fetchReplies = async (commentId) => {
    try {
        const response = await axios.get(`${baseURL}/student/comments/${commentId}/replies/`);
        setReplies(prevReplies => ({
            ...prevReplies,
            [commentId]: response.data
        }));
    } catch (error) {
        console.error('Error fetching replies:', error);
    }
};

useEffect(() => {
    comments.forEach(comment => {
        fetchReplies(comment.id);
    });

    if (newReply) {
        setReplies((prevReplies) => ({
            ...prevReplies,
            [newReply.comment_id]: [...(prevReplies[newReply.comment_id] || []), newReply]
        }))}
    
}, [comments,newReply]);

console.log('replies',replies);





const handleEditButtonClick = (event, commentId, commentContent) => {
    event.preventDefault();
    setEditingCommentId(commentId);
    setEditedComment(commentContent);
};

const handleReplyEditButtonClick = (event, replyId, replyContent) => {
    event.preventDefault();
    setEditingReplyId(replyId);
    setEditedReply(replyContent);
};


const handleEditCommentSubmit = async (event, commentId) => {
    event.preventDefault();
    try {
        const response = await axios.put(
            `${baseURL}/student/edit_comment/${commentId}/`,
            {
                comment_text: editedComment,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
            }
        );
        console.log('Comment edited successfully:', response.data);
        setEditingCommentId(null);
        setEditedComment('');
        fetchVideoComments(); 
    } catch (error) {
        console.error('Error editing comment:', error);
    }
};


const handleEditReplySubmit = async (event, replyId) => {
    console.log('replyId',replyId);
    event.preventDefault();
    try {
        const response = await axios.put(
            `${baseURL}/student/edit_reply/${replyId}/`,
            {
                reply_text: editedReply,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                },
            }
        );
        console.log('Reply edited successfully:', response.data);
        setEditingReplyId(null);
        setEditedReply('');
        fetchVideoComments(); 
    } catch (error) {
        console.error('Error editing comment:', error);
    }
};


console.log('videoUrl',videoUrl)

  return (

        <div className=''>
        <div className="  bg-gray-100 flex items-center justify-center ">
            <div className="container max-w-screen-x mx-auto my-8 px-20">
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
                        <Link to={`/teacher/view_course/${id}`}> 
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

                                      
                            {comments.map((comment) => (
                                <div key={comment.id} className="my-7 max-w-2xl">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <div className="">
                                            <img className="w-10 h-10 rounded-full" src={baseURL + (comment.user_profile?.profile_pic || placeholderprofile)} alt="" />

                                                {/* <img className="w-10 h-10 rounded-full" src={baseURL+comment.user_profile.profile_pic} alt="" /> */}
                                            </div>
                                            <div>
                                                <div className='flex'>
                                                    <div className="text-md font-bold w-30">{comment.is_teacher ? ( <span className='flex '><span>{comment.username} </span><span className='text-yellow-500'><FaCrown /></span></span> ):( <span>{comment.username} </span>)}</div>
                                            
                                                    <span onClick={() => handleReplyClick(comment.id)} className='ml-5  cursor-pointer text-blue-500'><FaReply className='mt-1'/></span>
                                                    {parseInt(comment.user) === parseInt(userid) &&
                                                    <span onClick={(e) => handleEditButtonClick(e,comment.id, comment.comment)} className='ml-5 mt-1 cursor-pointer text-blue-500'><CiEdit /></span>
                                                    }
                                                </div>
                                                <div className="text-xs"> • 
                                                {formatDistanceToNow(new Date(comment.date_added), { addSuffix: false , addPrefix: false })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {editingCommentId === comment.id ? (
                                                    <form onSubmit={(e) => handleEditCommentSubmit(e, comment.id)}>
                                                        <input
                                                            type="text"
                                                            value={editedComment}
                                                            onChange={(e) => setEditedComment(e.target.value)}
                                                            className="mt-2 mx-20 text-lg  text-gray-600 w-30"
                                                        />
                                                        <button type="submit">Save</button>
                                                    </form>
                                                ) : (
                                                    <>
                                                    <p className="mt-2 mx-20 text-lg  text-gray-600 w-30">{comment.comment}</p>
                                                </>
                                            )}
                                    

                                    {replies[comment.id] && replies[comment.id].map(reply => (
                                                    <div key={reply.id}>
                                    
                                                        <div className=" ml-10 mt-5 flex justify-between items-center">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="flex">
                                                        
                                                                    {/* <img className="w-8 h-8 rounded-full" src={baseURL+reply.user_profile.profile_pic} alt="" /> */}
                                                                    <img className="w-10 h-10 rounded-full" src={baseURL + (reply.user_profile?.profile_pic || placeholderprofile)} alt="" />

                                                                </div>
                                                                <div>
                                                                    <div className='flex'>
                                                             
                                                                        <div className="text-md font-bold w-30">{reply.is_teacher ? ( <span className='flex '><span>{reply.username} </span><span className='text-yellow-500'><FaCrown /></span></span> ):( <span>{reply.username} </span>)}</div>

                                                                        {parseInt(reply.user) === parseInt(userid) &&
                                                                            <span onClick={(e) => handleReplyEditButtonClick(e,reply.id, reply.reply_text)} className='ml-5 mt-1 cursor-pointer text-blue-500'><CiEdit /></span>
                                                                        }

                                                                    </div>
                                                                    <div className="text-xs"> •  
                                                                    {formatDistanceToNow(new Date(reply.date_added), { addSuffix: false , addPrefix: false })}
                                                
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {editingReplyId === reply.id ? (
                                                            <form onSubmit={(e) => handleEditReplySubmit(e, reply.id)}>
                                                                <input
                                                                    type="text"
                                                                    value={editedReply}
                                                                    onChange={(e) => setEditedReply(e.target.value)}
                                                                    className="mt-2 mx-20  text-gray-600 w-30"
                                                                />
                                                                
                                                            </form>
                                                        ) : (
                                                            <>
                                                            <p className="mt-2 mx-20 text-md text-gray-600 w-30">{reply.reply_text}</p>
                                                        </>
                                                        )}
                                                        


                                                    </div>
                                                ))}


                                        


                                    {replyFields[comment.id] && (
                                        <form onSubmit={(e) => handleReplySubmit(e,comment.id,replyComment)} className='mx-20 my-5 w-full max-w-xl'>
                                            <textarea
                                                value={replyComment}
                                                onChange={(e) => setReplyComment(e.target.value)}
                                                placeholder="Enter your reply"
                                                className="w-full h-15 resize-none border rounded-md p-2"
                                            />
                                            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
                                        </form>
                                    )}
                                </div>
                            ))}



                        </div>
                    </div>
                    )}

                    
                    
                    <div className="lg:col-span-2 bg-gray-50 py-5 ">
                      
                        
                        <h1 className="mb-5 text-2xl font-bold text-gray-600 text-center ">Course Content</h1>
                        <div className="mt-10">
                            <div className="bg--200">
                                <ul className="border border-gray-100 rounded overflow-hidden flex">
                                    <div className="flex-1">
                                        {course.videos.map((video) => (

                                            <span key={video.id}  onClick={() => handleVideoLinkClick(video.id)} >
                                                <Link to={`/teacher/tvideoplayer/${id}/${video.id}`}>

                                                <li className={` flex justify-between text-lg my-2 p-5 px-4 py-2 ${parseInt(vid) === parseInt(video.id) ? 'bg-gray-300 rounded-xl' : ''} hover:bg-sky-50 hover:text-sky-900 border-b last:border-none border-gray-100 transition-all duration-300 ease-in-out`}>
                                                    <span>{video.video_name}</span>
                                                    <span>{video.duration}</span>
                                                </li>

                                                </Link>
                                            </span>
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

export default TeacherVideoPlayer;
