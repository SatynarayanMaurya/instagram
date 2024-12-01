import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaThreads } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../Redux toolkit/Slices/authSlice';
import { apiConnector } from '../../../Services/apiConnector';
import { profileEndpoints } from '../../../Services/apis';
import { toast } from 'react-toastify';
import { CgProfile } from "react-icons/cg";
function BottomTabs() {

    const loading  = useSelector((state)=>state.auth.loading)
    const token = useSelector((state)=>state.auth.token)
    const dispatch = useDispatch() 
    const [profileDetails , setProfileDetails] = useState({})
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
    <div className='  ' >


             <div className='flex justify-between px-6 pt-3 my-auto '>

                {/* Home  */}
                <NavLink to={"/"} className={({ isActive }) => isActive ? "flex items-center font-bold gap-4 " : "flex items-center gap-4 " }>
                        <svg aria-label="Home"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="22" role="img" viewBox="0 0 24 24" width="24"><title>Home</title><path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg> 
                </NavLink>


                {/* explore  */}
                <NavLink to={"/explore"}  className={({ isActive }) => isActive ? "flex items-center font-bold gap-4 " : "flex items-center gap-4 " }>
                      <svg aria-label="Explore"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Explore</title><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon><polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
                </NavLink>

                {/* create  */}
                <NavLink to={"/createPost"}  className={({ isActive }) => isActive ? "flex items-center font-bold gap-4 " : "flex items-center gap-4 " }>
                      <svg aria-label="New post"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New post</title><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                </NavLink>

                
                {/* Reels  */}
                <NavLink to={"/reels"}  className={({ isActive }) => isActive ? "flex items-center font-bold gap-4 " : "flex items-center gap-4 " }>
                      <svg aria-label="Reels"  className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Reels</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>
                </NavLink>


                {/* profile  */}
                <NavLink to={"/profile"}  className={({ isActive }) => isActive ? "flex items-center font-bold gap-3 " : "flex items-center gap-3 " }>
                        {
                              profileDetails?.profilePicture === "null" ? <p className='text-2xl'><CgProfile/></p> :
                              <img src={profileDetails?.profilePicture} alt="" className='w-[30px] h-[30px] object-cover rounded-full  overflow-hidden' />
                        }
                </NavLink>

             </div>




            </div>
  )
}

export default BottomTabs
