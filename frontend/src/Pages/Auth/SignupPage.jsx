import React from 'react'
import instaLogo from "../../Assests/Profiles/instalogoBlack.png"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {apiConnector} from "../../Services/apiConnector"
import {authEndpoints} from "../../Services/apis"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../Redux toolkit/Slices/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../../Components/Spinner'
function SignupPage() {

    const navigate = useNavigate()
    const {register,handleSubmit, formState:{errors}} = useForm()
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()

    const onsubmit =async (data)=>{
        try{
            dispatch(setLoading(true))
            const response = await apiConnector("post",authEndpoints.SIGNUP_API,data,)
            dispatch(setLoading(false))
            toast.success(response.data.message)
            navigate("/login")
        }
        catch(error){
            toast.error(error.response.data.message)
            dispatch(setLoading(false))
            return;
        }
    }

  return (


    <div className='bg-white h-screen flex flex-col items-center gap-4 text-black py-3 '>
        {loading && <Spinner/>}

        <div className='lg:w-[400px] lg:h-[580px] border rounded-xl lg:mt-2 mt-8  border-[#c9c9c9] lg:pb-0 pb-8 pt-12 px-4 flex flex-col gap-6 items-center'>
            
            <div className='flex  flex-col font-semibold items-center gap-4'>
                <img src={instaLogo} alt="" className='w-[180px]' />
                <div className='text-center text-[#737373]'>
                    <p>Sign up to see photos and videos </p>
                    <p>from your friends.</p>
                </div>

            </div>

            
            <form action="" onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-3 text-[14px]'>
                <input type="text" {...register("email",{required:true})} placeholder='Email' className='px-4 py-[6px] outline-none rounded-md w-[270px] border border-[#dbdbdb] bg-[#f5f5f5]' />
                {errors.email && <p className='text-red-600'>Email is required !</p>}

                <input type="text" {...register("password",{required:true})} placeholder='Password' className='px-4 py-[6px] outline-none rounded-md w-[270px] border border-[#dbdbdb] bg-[#f5f5f5]' />
                {errors.password && <p className='text-red-600'>password is required !</p>}

                {/* <input type="text" {...register("fullName",{required:true})} placeholder='Fullname' className='px-4 py-[6px] outline-none rounded-md w-[270px] border border-[#dbdbdb] bg-[#f5f5f5]' />
                {errors.fullName && <p className='text-red-600'>name is required !</p>} */}

                <input type="text" {...register("userName",{required:true})} placeholder='Username' className='px-4 py-[6px] outline-none rounded-md w-[270px] border border-[#dbdbdb] bg-[#f5f5f5]' />
                {errors.userName && <p className='text-red-600'>userName is required !</p>}

                <div className='text-center text-[#737373] text-[13px] mt-4'>
                    <p>People who use our service may have uploaded </p>
                    <p>your contact information to Instagram. <span className='text-blue-500 cursor-pointer'>Learn</span> </p>
                    <p className='text-blue-500 cursor-pointer'>More</p>
                </div>

                <div className='text-center text-[#737373] text-[13px] mt-2'>
                    <p>By signing up, you agree to our Terms , <span className='text-blue-500 cursor-pointer'>Privacy</span>  </p>
                    <p className='text-blue-500 cursor-pointer'>Policy and Cookies Policy . </p>
                </div>
                <button type='submit' className='bg-[#53bdeb] font-semibold py-2 rounded-lg mt-3 text-white'>Sign Up</button>
            </form>
        </div>

        <div className='lg:w-[400px] lg:h-[70px] h-[60px] w-[300px] border rounded-xl border-[#c9c9c9] flex justify-center items-center text-[14px]'>
            <p>Have an Account? <span className='text-blue-500 cursor-pointer font-semibold' onClick={()=>navigate("/login")}>Login</span></p>
        </div>
    </div>
  )
}

export default SignupPage
