import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { setLoading } from '../../Redux toolkit/Slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../Services/apiConnector'
import { postEndpoints, profileEndpoints } from '../../Services/apis'
import Spinner from '../../Components/Spinner'
// import Spinner from "../../Components/Spinner"
function Create() {

  const [fileChange, setFileChange] = useState({})
  const {register, handleSubmit}= useForm()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.auth.loading)
  const token = useSelector((state)=>state.auth.token)
  const [profileDetails , setProfileDetails] = useState({})

  const fileHandler = (e)=>{
    const file = e.target.files[0]
    if(file){
      setFileChange(file)
    }
  }

  const getProfileDetails = async()=>{
    try{
      const response = await apiConnector("get", profileEndpoints.PROFILE_DETAILS_API, {},{Authorization:`Bearer ${token}`})
      // console.log("profile details is : ", response?.data?.userDetails)
      setProfileDetails(response?.data?.userDetails)
    }
    catch(error){
      toast.error(error?.response?.data?.message)
      return ;
    }
  }

  useEffect(()=>{
    getProfileDetails()
  },[token])

  const onsubmit =async (data)=>{
    try{
      if(profileDetails?.posts?.length >= 6){
        toast.error("You can upload only 6 Post !!");
        navigate("/profile")
        return;

      }
      if(!fileChange.name){
        toast.error("Please Provide a file !")
        return ;
      }
      data.imageFile = fileChange
      console.log("Your data is : ", data)
      dispatch(setLoading(true))
      const response = await apiConnector("post", postEndpoints.CREATE_POST_API,data,{Authorization:`Bearer ${token}`,'Content-Type': 'multipart/form-data'})
      dispatch(setLoading(false))
      toast.success(response.data.message)
      navigate("/profile")
    }
    catch(error){
      toast.error(error?.response?.data?.message)
      console.log("Error in creating the post : ",error)
      dispatch(setLoading(false))
      return ;
    }

  }


  return (
    <div className='lg:ml-[250px]  lg:mt-12 -mt-16'>
        {loading && <Spinner/>}
          <div className=' flex justify-center  h-screen items-center'>

              <div className='lg:w-[500px] lg:h-[550px] lg:-ml-[250px] h-[580px]  w-[340px] lg:-mt-[130px]  border border-[#262626]   bg-[#303338] rounded-lg'>

                    <form action="" onSubmit={handleSubmit(onsubmit)}  className='lg:p-12 px-4 py-12 flex flex-col gap-12'>
                        <div className='flex flex-col items-center gap-6'>
                          
                          

                            <div>
                              
                              <svg aria-label="Icon to represent media such as images or videos" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                            </div>

                            <div>
                              <p className='text-2xl  '>Drag photos and videos here</p>
                              <div className='mt-6 flex justify-center cursor-pointer'>
                                <label htmlFor="fileUpload" className='px-4 py-2 bg-blue-500 rounded-lg '>Select from Computer</label>
                                <input type="file" id='fileUpload' onChange={fileHandler} className='hidden' />
                                
                              </div>
                              {fileChange.name && <p className='text-center mt-4  text-[#9da4ae]'><span className='text-[#7a828d]'>File is : </span> {fileChange.name}</p>}
                            </div>


                        </div>

                        
                        <div className='flex gap-6 items-center mt-4'>
                            <textarea rows={3} cols={70} {...register("caption")} id='caption' placeholder='Caption here... ( Optional )' className='px-4 py-1 border border-[#262626] outline-none bg-[#4d535d] text-white rounded-lg' />
                        </div>
                        
                        <div className='flex justify-end'>
                          <button type='submit' className='bg-green-600 hover:bg-green-700 transition-all duration-200 text-lg font-semibold px-6 py-2 rounded-lg w-auto'>Post</button>
                        </div>
                      </form>
              </div>
          </div>
    </div>
  )
}

export default Create
