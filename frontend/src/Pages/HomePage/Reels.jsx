import React, { useEffect, useRef, useState } from 'react'
import { useInView } from "react-intersection-observer";
import { toast } from 'react-toastify';
import { apiConnector } from '../../Services/apiConnector';
import { connectionsEndpoints, postEndpoints, profileEndpoints, reelEndpoints } from '../../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux toolkit/Slices/authSlice';
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import circle from "../../Assests/Profiles/1.png"
import Spinner from "../../Components/Spinner"
import { useNavigate } from 'react-router-dom';
import { GiSkullCrossedBones } from "react-icons/gi";
const Reels = () => {

    const token = useSelector((state)=>state.auth.token)
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()
    const [allReels, setAllReels ] = useState([])
    const [isMuted, setIsMuted] = useState(true);
    const [userDetails, setUserDetails] = useState({})
    const [currentVideo, setCurrentVideo] = useState(null);
    const [commentBody, setCommentBody] = useState("")
    const [reelDetails, setReelDetails] = useState({})
    const navigate = useNavigate()

    const handleCommentBody = (e)=>{
        setCommentBody(e.target.value)
    }

    const [activeVideoId, setActiveVideoId] = useState(null);

    const toggleComments = async(videoId) => {
      setActiveVideoId((prevId) => (prevId === videoId ? null : videoId));

      try{
        dispatch(setLoading(true))
        const response = await apiConnector("get", reelEndpoints.GET_SINGLE_REEL_API, {}, {Authorization:`Bearer ${token}`,"reelId":videoId})
        // console.log("Response is : ",response?.data?.reelDetails)
        dispatch(setLoading(false))
        setReelDetails(response?.data?.reelDetails)
      }
      catch(error){
        dispatch(setLoading(false))
        toast.error(error?.response?.data?.message)
        return ;
      }
    };

    const submitComment = async(reelId)=>{
        try{
            if(commentBody === ""){
                toast.error("Give some Comment")
                return ;
            }
            dispatch(setLoading(true))
            const response = await apiConnector("post", reelEndpoints.CREATE_COMMENT_ON_REEL_API,{reelId,commentBody},{Authorization:`Bearer ${token}`})
            // console.log("Your comment response is : ", response)
            dispatch(setLoading(false))
            toggleComments(reelId)
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message)
            return ;
        }
    }

    const getProfileDetails = async ()=>{
        try{
            dispatch(setLoading(true))
            const response = await apiConnector("get",profileEndpoints.PROFILE_DETAILS_API,{},{Authorization:`Bearer ${token}`})
            // console.log("Profile details is : ",response?.data?.userDetails)
            dispatch(setLoading(false))
            setUserDetails(response?.data?.userDetails)
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message)
            return;
        }
    }

    const getAllReels = async ()=>{
        try{
            dispatch(setLoading(true))
            const response = await apiConnector("get", postEndpoints.GET_ALL_REELS_API, {},{Authorization:`Bearer ${token}`})
            // console.log("Your all reels are : ", response?.data?.allReels)
            dispatch(setLoading(false))
            setAllReels(response?.data?.allReels.sort(() => 0.5 - Math.random()))
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message)
            return ;

        }
    }

    const likeHandler = async(reelId)=>{
        try{
            dispatch(setLoading(true))
            const response = await apiConnector("put", reelEndpoints.LIKE_REEL_API,{reelId},{Authorization:`Bearer ${token}`})
            // console.log("Your like response is : ", response)
            
            dispatch(setLoading(false))
            setAllReels((prevReels) =>
                prevReels.map((reel) =>
                  reel._id === reelId ? { ...reel, liked: !reel.liked } : reel
                )
            );

            setUserDetails((prevDetails) => {
                const isLiked = prevDetails.liked.includes(reelId);
                const updatedLiked = isLiked
                    ? prevDetails.liked.filter((id) => id !== reelId)
                    : [...prevDetails.liked, reelId];
                return { ...prevDetails, liked: updatedLiked };
            });
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message)
            return ;
        }
    }


    const handleUnmuteAll = () => {
        setIsMuted(!isMuted); 
      };

    useEffect(()=>{
        getAllReels()
        getProfileDetails()
    },[token])


      
    const handleInView = (index, inView) => {
        if (inView) {
        setCurrentVideo(index);
        }
        if(index === allReels?.length){
            setCurrentVideo(0)
        }
    };

    const followHandler = async(followingUserId)=>{
        try{
            dispatch(setLoading(true))
            const response = await apiConnector("put", connectionsEndpoints.FOLLOW_THE_USER_API, {followingUserId}, {Authorization:`Bearer ${token}`})
            // console.log("YOur following response is : ", response)
            
            dispatch(setLoading(false))
            // toast.success(response?.data?.message)
            setUserDetails((prevDetails) => {
                const isLiked = prevDetails.following.includes(followingUserId);
                const updatedLiked = isLiked
                ? prevDetails.following.filter((id) => id !== followingUserId)
                : [...prevDetails.following, followingUserId];
                return { ...prevDetails, following: updatedLiked };
            });
            
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message)
            return ;
        }
    }

    const profileIdClicked = (profileId)=>{
        navigate(`/account/${profileId}`)
    }


  
   
      
    return (
        <div className="flex flex-col gap-6 space-y-4 lg:ml-[300px] mt-4 mb-10 ">
            {loading && <Spinner/>}
        {
            allReels?.map((videoUrl, index) => (
                <div key={index} className='relative '>
                    <VideoPlayer
                        videoUrl={videoUrl.media}
                        isPlaying={currentVideo === index} // Only play the video if it's the current one
                        onInViewChange={(inView) => handleInView(index, inView)} // Pass visibility change handler
                        onUnmute={handleUnmuteAll}
                        isMuted={isMuted}
                    />
                    {/* Profile details  */}
                    <div className='absolute lg:left-[220px] left-4 top-[580px]'>
                        <div className='flex gap-3 items-center'>
                            <div className='relative'>
                                <img src={circle} alt=""  className='w-[42px] h-[42px] '/>
                                <img src={videoUrl?.userId?.profilePicture !== "null" ? videoUrl?.userId?.profilePicture : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"} alt="" className='w-[35px] h-[35px] object-cover rounded-full absolute top-[4px] left-[3px]' />
                            </div>
                            <p  onClick={()=>profileIdClicked(videoUrl?.userId?._id)} className='cursor-pointer'>{videoUrl?.userName}</p>
                                <button className='border px-2 py-1 rounded-lg cursor-pointer' onClick={()=>followHandler(videoUrl?.userId?._id)}>{userDetails?.following?.includes(videoUrl?.userId?._id) ? <p>Following</p> : <p>Follow</p>}</button>
                        </div>
                        <div className='mt-2 w-[300px]'>
                            <p>{videoUrl?.caption.length > 78 ? videoUrl?.caption.slice(0,78) : videoUrl?.caption}<span className='cursor-pointer hover:text-gray-800'>...more</span></p>
                        </div>
                    </div>

                    {/* Like comment and share  */}
                    <div className='absolute lg:left-[630px] left-[290px] lg:top-[400px] top-[350px] flex flex-col gap-5'>

                        {/* Like  */}
                        <div className='flex flex-col items-center gap-[2px]'>
                            {
                                userDetails?.liked?.includes(videoUrl?._id) ?

                                <svg  onClick={()=>likeHandler(videoUrl?._id)}  aria-label="Unlike" className="x1lliihq x1n2onr6 xxk16z8 cursor-pointer" fill="#ff3040" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg> : 

                                <svg onClick={()=>likeHandler(videoUrl?._id)} aria-label="Like" className="x1lliihq x1n2onr6 xyb1xck hover:cursor-pointer" fill="currentColor" height="28" role="img" viewBox="0 0 24 24" width="28"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                            }
                            
                            <p>{videoUrl?.likes.length}</p>
                        </div>
                        
                        {/* comment  */}
                        <div className='flex flex-col items-center gap-[2px]'>
                            <svg onClick={()=>toggleComments(videoUrl?._id)} aria-label="Comment" className="x1lliihq x1n2onr6 x5n08af hover:cursor-pointer" fill="currentColor" height="28" role="img" viewBox="0 0 24 24" width="28"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            <p>{videoUrl?.comments.length}</p>
                        </div>
                        
                        {/* share  */}
                        <div className='flex flex-col justify-center gap-[2px]'>
                            <svg aria-label="Share" className="x1lliihq x1n2onr6 xyb1xck hover:cursor-pointer" fill="currentColor" height="28" role="img" viewBox="0 0 24 24" width="28"><title>Share</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                        </div>
                        
                        {/* save  */}
                        <div className='flex flex-col justify-center gap-[2px]'>
                            <svg aria-label="Save" className="x1lliihq x1n2onr6 x5n08af hover:cursor-pointer" fill="currentColor" height="28" role="img" viewBox="0 0 24 24" width="28"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                        </div>

                        {/* menu  */}
                        <div>
                            <p className='text-3xl ml-[2px]  hover:cursor-pointer'><HiOutlineDotsHorizontal/></p>
                        </div>
                    </div>

                    {/* Comment section  */}

                    {
                        activeVideoId === videoUrl?._id &&
                        <div  className='absolute lg:left-[710px] bg-black lg:h-[500px] h-[420px]  w-[350px] lg:top-[100px] top-[290px] flex flex-col gap-5 border-[1px] rounded-lg'>

                            <div className='lg:py-4 py-2'>
                                <div className='flex gap-3 items-center px-6 '>
                                    <div className='relative'>
                                        <img src={circle} alt=""  className='w-[42px] h-[42px] '/>
                                        <img src={videoUrl?.userId?.profilePicture !== "null" ? videoUrl?.userId?.profilePicture : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"} alt="" className='w-[35px] h-[35px] object-cover rounded-full absolute top-[4px] left-[3px]' />
                                    </div>
                                    <p>{videoUrl?.userName}</p>
                                    <button className='border px-2 py-1 rounded-lg cursor-pointer'>Follow</button>
                                    <p className='block_hide_element pl-10 text-2xl' onClick={()=>toggleComments(videoUrl?._id)}><GiSkullCrossedBones/></p>
                                </div> 

                                <div className=' border-t-[1px] mt-3 border-[#484848]'></div>

                                {/* all comments  */}
                                <div className='flex flex-col overflow-y-scroll lg:h-[350px] h-[270px]'>
                                    {
                                        reelDetails?.comments?.length === 0 ? <p className='ml-16 text-2xl font-semibold mt-4'>No comments here</p> : 
                                        reelDetails?.comments?.slice()?.reverse()?.map((singleComment)=>{
                                            return <div key={singleComment?._id} className='flex gap-3 items-center px-6 py-2'>
                                                        <div className='relative'>
                                                            <img src={circle} alt=""  className='w-[42px] h-[42px]'/>
                                                            <img src={singleComment?.userId?.profilePicture !== "null" ? singleComment?.userId?.profilePicture : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"} alt="" className='w-[35px] h-[35px] object-cover rounded-full absolute top-[4px] left-[3px]' />
                                                        </div>
                                                        <div className='flex flex-col gap-1 w-[250px] '>
                                                                <div className='flex gap-1 items-center'>
                                                                    <p>{singleComment?.userId?.userName}</p>
                                                                    <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg>
                                                                </div>
                                                                <p className='text-sm'>{singleComment?.comment} </p>
                                                            </div>
                                                    </div> 
                                        })
                                    }



                                </div>

                                    {/* write a comment  */}
                                <div className='flex justify-center'>
                                    <div className='relative'>
                                        <input type="text" placeholder='Enter comment' className='mt-4 w-[330px] py-3 px-4 rounded-2xl bg-transparent border pr-16 border-[#484848]' onChange={handleCommentBody} />
                                        <button className='text-blue-500 absolute right-4 top-[27px]' onClick={()=>submitComment(videoUrl?._id)}>Post</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            ))
        }
        
        </div>
    );
};



// VideoPlayer Component: Handles individual video playback behavior
const VideoPlayer = ({ videoUrl, isPlaying,isMuted, onUnmute, onInViewChange }) => {

    const videoRef = useRef(null); 
    const { ref } = useInView({
        threshold: 0.5, 
        onChange: onInViewChange,
        }
    );


    React.useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                // videoRef.current.play(); 
                videoRef.current.muted = isMuted;
                videoRef.current.play().catch((error) => {
                    console.warn("Autoplay failed:", error);
                });
            } else {
                videoRef.current.pause(); 
            }
        }
    }, [isPlaying,isMuted]); 

    const handleFirstUnmute = () => {
        if (isMuted) {
          videoRef.current.muted = false; // Unmute the current video
          onUnmute(); // Unmute all videos
        }
        else{
            onUnmute(); 
        }
      };
      const [played, setPlayed ] = useState(true)

      const pauseVideo = ()=>{
        if(isPlaying){
            if(played){
                videoRef.current.pause();
                setPlayed(false)
            }
            else{
                videoRef.current.play();
                setPlayed(true)
            }
            
        }
      }

    return (
        <div ref={ref} className="video-container">
          <video
            ref={videoRef} 
            src={videoUrl} 
            className="lg:w-[500px] lg:h-[700px] w-[350px] h-[690px] lg:object-contain object-cover lg:ml-40"
            loop 
            autoPlay
            muted={isMuted}
            onClick={pauseVideo}
          />
          <button onClick={handleFirstUnmute} className='text-3xl absolute  lg:left-[555px] left-[290px] top-2 hover:bg-gray-200 hover:text-black px-1 py-1 rounded-full'>{!isMuted ? <HiOutlineSpeakerWave/> : <HiOutlineSpeakerXMark/>}</button>
        </div>
    );
}



export default Reels
