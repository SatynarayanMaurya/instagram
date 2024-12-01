import React, { useEffect, useState } from 'react'
import circle from "../../Assests/Profiles/1.png"

import { toast } from 'react-toastify'
import { setLoading, setToken } from '../../Redux toolkit/Slices/authSlice'
import { apiConnector } from '../../Services/apiConnector'
import { postEndpoints, profileEndpoints, reelEndpoints } from '../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../Components/Spinner'
import {useNavigate} from "react-router-dom"
import NoInternet from './NoInternet'



function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const token = useSelector((state)=>state.auth.token)
  const loading = useSelector((state)=>state.auth.loading)
  const [allposts, setAllPosts] = useState([])
  const [allReels, setAllReels] = useState([])
  const [userDetail,setUserDetail] = useState({})
  const [postActive, setPostActive] = useState(true);
  const[reelActive, setReelActive] = useState(false);

  const profileDetails = async ()=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("get", profileEndpoints.PROFILE_DETAILS_API,{},{Authorization:`Bearer ${token}`})
      // console.log("Profile details is : ", response?.data?.userDetails)
      setUserDetail(response?.data?.userDetails)
      dispatch(setLoading(false))
    }
    catch(error){
      toast.error(error?.response?.data?.message);
      dispatch (setLoading(false))
      return;
    }
  }

  const getAllPost = async ()=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("get", postEndpoints.GET_SINGLE_USER_POST_API,{},{Authorization:`Bearer ${token}`}) 
      dispatch(setLoading(false))
      // console.log("Your posts response is : ", response?.data?.allPosts)
      setAllPosts( response?.data?.allPosts.reverse())
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return ;
    }
  }

  const getAllReels = async()=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("get",reelEndpoints.GET_SINGLE_USER_REEL_API,{},{Authorization:`Bearer ${token}`})
      dispatch(setLoading(false))
      // console.log("All Reel response is : ", response?.data?.allReels)
      setAllReels( response?.data?.allReels);
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return ;
    }
  }


  useEffect(()=>{
    profileDetails();
    getAllReels();
    getAllPost();
  },[token])

  const handlePostActive = ()=>{
    setPostActive(true)
    setReelActive(false)
  }

  const handleReelActive = ()=>{
    setPostActive(false)
    setReelActive(true)
  }

  const logoutHandler = ()=>{
    try{
      dispatch(setToken(null))
      localStorage.setItem("token",null)
      navigate("/login")
    }
    catch(error){
      toast.error("Error in logout");
      return ;
    }
  }

  return (
    
    <div>
      {
        navigator.onLine ? 
          <div className=' mb-10 lg:ml-[250px]'>
          {loading && <Spinner/>}
        
        
            <div className='flex flex-col items-center  gap-4  lg:mt-12 '>

                {/* first div for profile details */}
                <div className='flex lg:gap-12 gap-2 items-center lg:ml-64 '>
                  
                  {/* profile image  */}
                  <div className='flex flex-col justify-center gap-1'>

                    <div className='relative lg:mt-0 -mt-40 lg:w-[140px] w-[100px] h-[100px] lg:h-[140px] cursor-pointer'>
                      <img src={circle} alt="" className='lg:w-[135px] lg:h-[135px] w-[78px] h-[78px] ' />
                      <img src={`${userDetail?.profilePicture ==="null" ?  "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" : userDetail.profilePicture}`} alt="" className='lg:w-[122px] w-[65px] h-[65px] lg:h-[122px] object-cover rounded-full absolute top-[7px] left-[7px] overflow-hidden' />
                    </div>

                  </div>

                  {/* user details */}
                  <div className='flex flex-col gap-4'>

                      <div className='flex lg:mt-0 mt-8 lg:flex-col flex-col-reverse lg:gap-4 gap-2'>

                        {/* username, edit, view archive , setting */}
                        <div className='flex lg:flex-row flex-col gap-4 lg:items-center'>
                            <p className='lg:text-lg lg:mr-8'>{userDetail?.userName}</p>
                            <div className='flex gap-4 items-center lg:ml-0 lg:mt-0 -ml-[105px] mt-4'>
                              <button onClick={()=>navigate("/edit-profile")} className='lg:px-2 px-10 py-1 rounded-lg  bg-[#383a3e]'>Edit Profile</button>
                              <button className='px-2 py-1 rounded-lg bg-[#383a3e] hide_block_element'>View archive</button>
                              <button onClick={logoutHandler} className='lg:px-2 px-10 py-1 rounded-lg bg-red-700 hover:bg-red-800 text-white'>Logout</button>
                            </div>
                        </div>

                        {/* Total post in number  */}
                        <div className='flex lg:gap-8 gap-6'>

                            <div className='flex lg:flex-row flex-col lg:gap-2 items-center'>
                                <p className='font-semibold'>{userDetail?.posts?.length}</p>
                                <p>posts</p>
                            </div>

                            <div className='flex lg:flex-row flex-col lg:gap-2 items-center'>
                                <p className='font-semibold'>{userDetail?.followers?.length}</p>
                                <p>followers</p>
                            </div>

                            <div className='flex lg:flex-row flex-col lg:gap-2 items-center'>
                                <p className='font-semibold'>{userDetail?.following?.length}</p>
                                <p>following</p>
                            </div>

                        </div>

                      </div>

                      {/* real name  */}
                      <div className='hide_block_element'>
                          <p>{userDetail.userName}</p>
                      </div>

                      {/* bio  */}
                      <div className='lg:w-[70%] w-[50%] lg:h-[80px] h-[120px] lg:ml-0 -ml-24 text-[15px]'>
                          <p >{userDetail.bio}</p>
                      </div>

                  </div>

                </div>

                {/* all the post of the user  */}
                <div className='w-full lg:ml-20 mx-auto  border-t border-[#262626] lg:mt-10 mt-6 flex flex-col gap-6 items-center'>

                    {/* post, reels, saved, tagged button  */}
                    <div className='flex gap-6 text-[14px]'>

                        <div>
                          {postActive && <div className=' border w-full'></div> }
                          <button className='mt-4' onClick={handlePostActive}>POSTS</button>
                        </div>

                        <div>
                          {reelActive && <div className=' border w-full'></div>}
                          <button className='mt-4' onClick={handleReelActive}>REELS</button>
                        </div>

                        <div>
                          <button className='mt-4'>SAVED</button>
                        </div>

                        <div>
                          <button className='mt-4'>TAGGED</button>
                        </div>

                    </div>
                    
                    {/*all posts  */}
                    {
                      postActive && 
                      <div className='flex flex-wrap gap-6'>

                        {
                          allposts.length === 0 ? <p className='text-2xl font-semibold mt-6'>No Post here</p>:
                          allposts.map((post)=>{
                            return <div key={post?._id} className='cursor-pointer'>
                                      { 
                                        post?.media.split(".").pop() === "mp4" ? 
                                        <video src={post?.media} className='w-[330px] h-[330px] object-cover'></video>:
                                        <img src={post?.media} alt="posts" className='lg:w-[330px] w-[155px] h-[155px] lg:h-[330px] object-cover' />
                                      }
                                      
                                    </div>
                          })
                        }

                      </div>
                    }
                    
                    {/*all Reels  */}
                    {
                      reelActive && 
                      <div className='flex flex-wrap gap-6'>

                        {
                          allReels.length === 0 ? <p className='text-2xl font-semibold mt-6'>No Reels here</p> :
                          allReels.map((reel)=>{
                            return <div key={reel?._id} className='cursor-pointer'>
                                      { 
                                        reel?.media.split(".").pop() === "mp4" ? 
                                        <video src={reel?.media} className='lg:w-[330px] w-[155px] h-[155px] lg:h-[330px] object-cover'></video>:
                                        <img src={reel?.media} alt="posts" className='w-[330px] h-[330px] object-cover' />
                                      }
                                      
                                    </div>
                          })
                        }

                      </div>
                      
                    }


                </div>
            </div>

          </div> :

          <NoInternet/>
      }
    </div>
  )
}

export default Profile
