import React, { useEffect, useState } from 'react'
import { NavLink} from "react-router-dom"
import logoInsta from "../../Assests/Basic/instaWhiteLogo.png"
import { CgProfile } from "react-icons/cg";
import { FaThreads } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { toast } from 'react-toastify';
import { apiConnector } from '../../Services/apiConnector';
import { profileEndpoints } from '../../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux toolkit/Slices/authSlice';
import Spinner from '../../Components/Spinner';



function LeftSidebar() {

      const [profileDetails , setProfileDetails] = useState({})
      const token = useSelector((state)=>state.auth.token)
      const loading = useSelector((state)=>state.auth.loading)
      const dispatch = useDispatch()

      const getProfileDetails = async ()=>{
            try{
                  dispatch(setLoading(true))
                  const response = await apiConnector("get", profileEndpoints.PROFILE_DETAILS_API,{},{Authorization:`Bearer ${token}`})
                  // console.log("Your left side bar profile details response is : ", response?.data?.userDetails)
                  dispatch(setLoading(false))
                  setProfileDetails(response?.data?.userDetails)
            }
            catch(error){
                  dispatch(setLoading(false))
                  toast.error(error?.response?.data?.message)
                  return;
            }
      }

      useEffect(()=>{
            getProfileDetails()
      },[token])

  return (
    <div>
      <div className='mt-10'>
            {loading && <Spinner/>}

            <div className='ml-6 flex flex-col gap-10' >
                  <img src={logoInsta} alt="" className='w-[100px]' />


             <div className='flex flex-col gap-8'>

                {/* Home  */}
                <NavLink to={"/"} className={({ isActive }) => isActive ? "flex items-center font-bold gap-4 " : "flex items-center gap-4 " }>
                        <svg aria-label="Home"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="22" role="img" viewBox="0 0 24 24" width="24"><title>Home</title><path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                      <p className=' '>Home</p>
                </NavLink>

                {/* search  */}
                <div className='flex items-center  gap-4'>
                      <svg aria-label="Search"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="22" role="img" viewBox="0 0 24 24" width="24"><title>Search</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
                      <p className=' '>Search</p>
                </div>


                {/* explore  */}
                <NavLink to={"/explore"}  className={({ isActive }) => isActive ? "flex items-center font-bold gap-4 " : "flex items-center gap-4 " }>
                      <svg aria-label="Explore"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Explore</title><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon><polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
                      <p className=' '>Explore</p>
                </NavLink>

                  {/* Reels  */}
                <NavLink to={"/reels"}  className={({ isActive }) => isActive ? "flex items-center font-bold gap-4 " : "flex items-center gap-4 " }>
                      <svg aria-label="Reels"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>
                      <p className=' '>Reels</p>
                </NavLink>


                {/* Messenger  */}
                <div className='flex items-center  gap-4'>
                      <svg aria-label="Messenger"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Messenger</title><path d="M12.003 1.131a10.487 10.487 0 0 0-10.87 10.57 10.194 10.194 0 0 0 3.412 7.771l.054 1.78a1.67 1.67 0 0 0 2.342 1.476l1.935-.872a11.767 11.767 0 0 0 3.127.416 10.488 10.488 0 0 0 10.87-10.57 10.487 10.487 0 0 0-10.87-10.57Zm5.786 9.001-2.566 3.983a1.577 1.577 0 0 1-2.278.42l-2.452-1.84a.63.63 0 0 0-.759.002l-2.556 2.049a.659.659 0 0 1-.96-.874L8.783 9.89a1.576 1.576 0 0 1 2.277-.42l2.453 1.84a.63.63 0 0 0 .758-.003l2.556-2.05a.659.659 0 0 1 .961.874Z"></path></svg>
                      <p className=' '>Message</p>
                </div>


                {/* Notifications */}
                  <div className='flex items-center  gap-4'>
                      <svg aria-label="Notifications"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Notifications</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                      <p className=' '>Notification</p>
                </div>


                {/* create  */}
                <NavLink to={"/createPost"}  className={({ isActive }) => isActive ? "flex items-center font-bold gap-4 " : "flex items-center gap-4 " }>
                      <svg aria-label="New post"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New post</title><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                      <p className=' '>Create</p>
                </NavLink>

                {/* profile  */}
                <NavLink to={"/profile"}  className={({ isActive }) => isActive ? "flex items-center font-bold gap-3 " : "flex items-center gap-3 " }>
                        {
                              profileDetails?.profilePicture === "null" ? <p className='text-2xl'><CgProfile/></p> :
                              <img src={profileDetails?.profilePicture} alt="" className='w-[30px] h-[30px] object-cover rounded-full  overflow-hidden' />
                        }
                      <p className=' '>Profile</p>
                </NavLink>

             </div>


              {/* Lower part  */}
             <div className='flex flex-col gap-8 mt-10'>

                {/* Thread  */}
                <div className='flex items-center  gap-4 '>
                      <p className='text-2xl'><FaThreads/></p>
                      <p className=' '>Threads</p>
                </div>

                {/* menu  */}
                <div className='flex items-center  gap-4 '>
                      <p className='text-2xl'><AiOutlineMenu/></p>
                      <p className=' '>Menu</p>
                </div>

             </div>


            </div>
      </div>
    </div>
  )
}

export default LeftSidebar




