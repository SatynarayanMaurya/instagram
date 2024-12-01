import React, { useEffect, useState } from 'react'
import RightSidebar from "./RightSidebar"
import circle from "../../Assests/Profiles/1.png"
import { RxDotsHorizontal } from "react-icons/rx";
import { toast } from 'react-toastify'
import { apiConnector } from '../../Services/apiConnector'
import { postEndpoints, profileEndpoints } from '../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
// import { all } from 'axios'
import { setLoading, setPostId } from '../../Redux toolkit/Slices/authSlice'
import Spinner from '../../Components/Spinner'
import { useNavigate } from 'react-router-dom'
import MoreComments from './MorePages/MoreComments';

// import { CgProfile } from "react-icons/cg";




function Mainbar() {

  const token = useSelector((state)=>state.auth.token)
  const [allPosts, setAllPosts] = useState([])
  const [profileDetails,setProfileDetails] = useState({})
  const [followingUser, setFollowingUser] = useState([])
  const loading = useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [commentBody, setCommentBody] = useState("")
  const [moreComment, setMoreComment] = useState(false)

  const closeMoreComment = ()=>{
    setMoreComment(false)
    dispatch(setPostId(""))
  }

  const changingComment = (e)=>{
    setCommentBody(e.target.value)
  }


  const getAllPost =async ()=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("get", postEndpoints.GET_ALL_POST,{}, {Authorization:`Bearer ${token}`})
      // console.log("Your all post is : ", response.data.allPost)
      dispatch(setLoading(false))
      setAllPosts(response?.data?.allPost.sort(() => Math.random() - 0.5))
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
      dispatch(setLoading(false))
      // console.log("PRofile detail s is : ", response.data.userDetails)
      setProfileDetails(response.data.userDetails)
    }
    catch(error){
      dispatch(setLoading(false))
      if(error?.response?.data?.message === "Invalid Token"){
        navigate("/login")
      }
      toast.error(error?.response?.data?.message)
      return 
    }
  }

  const getFollowingUserDetails = async ()=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("get", profileEndpoints.SUGGESTED_ACCOUNT_API,{},{Authorization:`Bearer ${token}`})
      dispatch(setLoading(false))
      // console.log("Your following details : ", response)
      const result = response?.data?.suggestedAccounts.sort(() => 0.5 - Math.random());
      setFollowingUser(result)
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return;

    }
  }

  const likeButtonHandler = async (postId)=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("post", postEndpoints.LIKE_POST_API,{postId},{Authorization: `Bearer ${token}`})
      dispatch(setLoading(false))

      setProfileDetails((prevDetails)=>{
        const isLiked = prevDetails?.liked?.includes(postId)
        const updateLiked = isLiked ? prevDetails?.liked.filter((id)=>id !== postId) : [...prevDetails.liked , postId]
        return {...prevDetails,liked:updateLiked}
      })
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message);
      return ;
    }
  }

  const createCommentHandler = async (postId)=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("post", postEndpoints.CREATE_COMMENT_API,{postId,commentBody},{Authorization:`Bearer ${token}`})
      dispatch(setLoading(false))
      // toast.success(response?.data?.message)
      setCommentBody("")
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return ;
    }
  }

  const getComment = async (postId)=>{
    try{
      // console.log("You want to find all the comment of the post : ",postId)
      dispatch(setPostId(postId))
      setMoreComment(true)

    }
    catch(error){
      toast.error(error?.response?.data?.message)
      return ;
    }
  }

  const postClicked = (userId)=>{
    navigate(`/account/${userId}`)
  }
  

  useEffect(()=>{
    getAllPost();
    getProfileDetails()
    getFollowingUserDetails()
  },[token])

  return (
    <div className='flex justify-between mb-10 lg:ml-52'>

        <div className='lg:mt-10 mt-6 lg:w-[62%]  lg:ml-4 w-full  flex justify-center items-center '>

            {loading && <Spinner/>}

              <div className='lg:w-[75%] w-[350px]  lg:px-0 px-1  mx-auto flex flex-col lg:gap-10 gap-6'>

                    {/* All stories  */}
                    <div className='flex gap-3 lg:w-[680px]   scroll_story hide_scrollbar lg:pl-0 pl-1'>
                        
                        {/* Stories  */}
                        <div className='flex flex-col gap-1'>

                          <div className='relative w-[70px] h-[70px] cursor-pointer'>
                            <img src={circle} alt="" />
                            <img src={profileDetails?.profilePicture !== "null" ? profileDetails?.profilePicture : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" } alt="" className='w-[62px] h-[62px] object-cover rounded-full absolute top-1 left-1 overflow-hidden' />
                          </div>
                          <p className='text-[13px]'>{profileDetails?.userName?.length > 9 ? `${profileDetails?.userName.substring(0,9)}..` : profileDetails?.userName}</p>

                        </div>


                        {
                          followingUser.map((post)=>{
                            return (post?.userName !== profileDetails?.userName &&<div key={post._id} className='flex flex-col gap-1'>
                                      <div className='relative w-[70px] h-[70px] cursor-pointer'>
                                        <img src={circle} alt="" />
                                        <img src={post?.profilePicture !== "null" ? post?.profilePicture : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" } alt="" className='w-[62px] h-[62px] object-cover rounded-full absolute top-1 left-1 overflow-hidden' />
                                      </div>
                                      <p className='text-[13px]'>{post?.userName?.length > 9 ? `${post?.userName.substring(0,9)}..` : post?.userName}</p>
                                    </div>)
                          })
                        }
                        
                        
                    </div>

                    {/* Post content  */}
                    <div className='lg:w-[80%] lg:ml-32  mx-auto  flex flex-col lg:gap-10 gap-6'>
                        
                      {
                        allPosts?.map((post)=>{
                          return (post?.media.split(".").pop() !== "mp4" && 
                                  <div key={post._id} className='flex flex-col gap-4 border-b border-[#262626]  pb-6'>
                                      
                                      {/* about ids  */}
                                      <div className='flex gap-4 items-center' onClick={()=>postClicked(post?.userId?._id)}>

                                        {/* User profile  */}
                                        <div className='relative w-[55px] h-[55px] cursor-pointer'>
                                          <img src={circle} alt="" />
                                          <img src={post?.userId?.profilePicture !== "null" ? post?.userId?.profilePicture : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"} alt="" className='w-[48px] h-[48px] object-cover rounded-full absolute top-1 left-1 overflow-hidden' />
                                        </div>

                                        {/* user Id  */}
                                        <div className='flex justify-between items-center w-[80%] cursor-pointer'>

                                          <div>
                                              <div className='flex gap-1 items-center'>
                                                <p>{post?.userId?.userName}</p>
                                                <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg>
                                                <p>•</p>

                                                <p className='text-[#a8a8a8]'>
                                                  {
                                                    (Math.floor((new Date() - new Date(post.createdAt ) ) / (1000 * 60 * 60 * 24))) > 1 ? 
                                                    (`${(Math.floor((new Date() - new Date(post.createdAt ) ) / (1000 * 60 * 60 * 24)))}d`)
                                                    :
                                                    ((Math.floor((new Date() - new Date(post.createdAt ) ) / (1000 * 60 * 60 ))) > 1 ? 
                                                    (`${(Math.floor((new Date() - new Date(post.createdAt ) ) / (1000 * 60 * 60 )))}h`)
                                                    :
                                                    ((Math.floor((new Date() - new Date(post.createdAt ) ) / (1000 * 60 ))) > 1 ? 
                                                    (`${(Math.floor((new Date() - new Date(post.createdAt ) ) / (1000 * 60 )))}mins`)
                                                    :
                                                    ("few second ago")))
                                                  }
                                                </p>
                                              </div>


                                              <p className='text-[14px] text-[#a8a8a8]'>Original audio</p>

                                          </div>


                                          <p className='text-2xl'><RxDotsHorizontal/></p>

                                        </div>
                                      </div>

                                      {/* content  */}
                                      <div className='border border-[#262626] '>
                                        <div className=''>
                                          <img src={post?.media} alt="" className='max-h-[520px] object-contain w-full' />
                                        </div>
                                      </div>

                                      {/* likes and comments  */}
                                      <div className='flex flex-col gap-2 px-1'>

                                          {/* All like comment share logo  */}
                                          <div className='flex justify-between items-center '>

                                              <div className='flex gap-4 '>

                                                <div className='hover:text-[#a8a8a8] cursor-pointer' onClick={()=>likeButtonHandler(post._id)}>
                                                  {
                                                    profileDetails?.liked?.includes(post?._id)  ?
                                                    <svg aria-label="Unlike" className="x1lliihq x1n2onr6 xxk16z8" fill="#ff3040" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg> :
                                                    <svg aria-label="Like" className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                                                  }
                                                  
                                                </div>

                                                <div className='hover:text-[#a8a8a8] cursor-pointer' onClick={()=>getComment(post?._id)}>
                                                  <svg aria-label="Comment" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                                                </div>
                                                  {moreComment && <MoreComments closeMoreComment={closeMoreComment} />}
                                                <div className='hover:text-[#a8a8a8] cursor-pointer'>
                                                  <svg aria-label="Share" className="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                                                </div>

                                              </div>

                                              <div className='hover:text-[#a8a8a8] cursor-pointer'>
                                                <svg aria-label="Save" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                                              </div>
                                              
                                          </div>

                                          {/* Likes  */}
                                          <div>
                                              <p className='font-semibold'>{post?.likes?.length} likes</p>
                                          </div>

                                          {/* description  */}
                                          <div className='flex gap-1  text-[15px]'>

                                              {/* user id  */}
                                              <div>
                                                <div className='flex gap-1 items-center'>
                                                <span>{post?.userId?.userName}</span>
                                                <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg>
                                                
                                              </div>

                                              <div className='flex'>

                                                <p className='text-[13px]'>{post?.caption}<span className='hover:text-[#a8a8a8] text-[15px] cursor-pointer'>...more</span> </p>

                                              </div>
                                              
                                              </div>

                                              <div className='text-[13px]'>
                                                
                                            </div>

                                          </div>

                                          <div className='flex justify-between'>
                                              <input type="text" placeholder='Add a comment..' className='px-4 py-1 bg-transparent outline-none text-[15px] rounded-full'  onChange={changingComment}/>
                                              <button onClick={()=>createCommentHandler(post?._id)} className='text-blue-400 hover:text-blue-600 cursor-pointer'>post</button>
                                          </div>

                                      </div>

                                  </div>)
                        })
                      }

                        
                    </div>
              </div>

        </div>

        <div className='hide_block_element w-[33%]'>
          <RightSidebar/>
        </div>
    </div>
  )
}

export default Mainbar

