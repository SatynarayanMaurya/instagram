import React, { useState } from 'react'
import defaultImage from "../../Assests/Basic/profileImage2.png"
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { apiConnector } from '../../Services/apiConnector'
import { profileEndpoints } from '../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../Redux toolkit/Slices/authSlice'
import Spinner from '../../Components/Spinner'
import { useNavigate } from 'react-router-dom'

function EditProfile() {

    const {register, handleSubmit, } = useForm()
    const [profileImage,setProfileImage] = useState("")
    const token = useSelector((state)=>state.auth.token)
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fileHandler = (e)=>{
        const file = e.target.files[0];
        if(file){
            setProfileImage(file)
        }

    }


    const onsubmit = async (data)=>{
        try{
            data.image = profileImage
            dispatch(setLoading(true))
            await apiConnector("put", profileEndpoints.EDIT_PROFILE_API,data,{Authorization:`Bearer ${token}`,'Content-Type': 'multipart/form-data'})

            dispatch(setLoading(false))
            navigate("/profile")
            
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message)
            return ;
        }
    }

  return (
    <div className=' mb-10 lg:ml-[270px] ml-4 mt-12 '>
        
        <div className='flex flex-col gap-8'>

                {loading && <Spinner/>}

                <p className='text-3xl font-semibold'>Edit Profile</p>

                <form action="" onSubmit={handleSubmit(onsubmit)}  className='flex flex-col lg:gap-10 gap-6'>

                    <div className=' border border-[#262626] items-center  flex justify-between py-3 rounded-2xl px-8 bg-[#303338]'>
                        <div className='flex gap-8 items-center'>
                            <img src={defaultImage}  alt="" className='w-[70px] h-[70px] rounded-full border p-2'/>
                            <div className='flex flex-col hide_block_element  text-lg'>
                                <p className='font-semibold'>userName</p>
                                <p className='text-[15px]'>fullName</p>
                            </div>
                            {profileImage ? <p>{profileImage?.name}</p> : ""}
                        </div>

                        <div>
                            <label htmlFor="profileImage" className='px-4 py-2 bg-blue-600 text-white rounded-lg'>Change Photo</label>
                            <input type="file" name="" onChange={fileHandler} id="profileImage" className='hidden' />
                        </div>
                    </div>

                    <div className=' flex flex-col gap-3 '>
                        <label htmlFor="bio" className='text-xl font-semibold'> Bio</label>
                        <textarea name="" {...register("bio")} placeholder='bio...( Optional )' id="bil" cols="30" className='bg-transparent rounded-lg p-4 border border-[#4a4a4a] outline-none'></textarea>
                    </div>

                    <div className=' flex flex-col gap-3 '>
                        <label htmlFor="gender" className='text-xl font-semibold'>Gender</label>
                        <select name="" {...register("gender")} id="gender" className='bg-transparent  border border-[#4a4a4a] py-2 px-4 rounded-lg'>
                            <option value="male" className='bg-transparent text-black'>Male</option>
                            <option value="female" className='bg-transparent text-black'>Female</option>
                            <option value="other" className='bg-transparent text-black'>Other</option>
                        </select>
                    </div>

                    <div className=' flex flex-col gap-3 '>
                        <label htmlFor="phoneNumber" className='text-xl font-semibold'> Phone Number</label>
                        <input type="text"  {...register("phoneNumber")} id='phoneNumber' placeholder='phone Number...'  className='bg-transparent border border-[#4a4a4a] py-2 px-4 rounded-lg outline-none'/>
                    </div>

                    <div className='flex justify-end'>
                        <button type='submit' className='font-semibold px-4 py-2 rounded-lg bg-green-600'>Submit</button>
                    </div>

                </form>
        </div>

    </div>
  )
}

export default EditProfile
