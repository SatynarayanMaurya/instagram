import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import instaLogo from "../../Assests/Profiles/instalogoBlack.png"
import loginImg1 from "../../Assests/Profiles/loginIxmg1.png"
import loginImg2 from "../../Assests/Profiles/loginImg2.png"
import { apiConnector } from '../../Services/apiConnector'
import { authEndpoints } from '../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setToken } from '../../Redux toolkit/Slices/authSlice'
import {toast}  from "react-toastify";
import Spinner from "../../Components/Spinner"

function LoginPage() {

    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors }, } = useForm();
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.auth.loading)

    const onsubmit = async(data)=>{
        try{
            dispatch(setLoading(true))
            const response = await apiConnector("post", authEndpoints.LOGIN_API,data)
            dispatch(setLoading(false))
            dispatch(setToken(response.data.token))
            localStorage.setItem("token", response.data.token)
            // toast.success(response.data.message)
            navigate("/")
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message)
            return ;
        }
    }


  return (
    <div>
        {loading && <Spinner/>}
        <div className='bg-white h-screen flex lg:flex-row flex-col-reverse lg:gap-36 gap-12 justify-center text-black py-12'>

            {/* image part  */}
            <div className='relative lg:ml-0 ml-4  hide_block_element'>
                <img src={loginImg2} alt="profile" className='bg-black pb-4 pt-3 rounded-[2vw]' />
                <img src={loginImg1} alt="profile" className='absolute top-2 left-20 bg-black pb-4 pt-3 rounded-[2vw]' />
            </div>

            {/* Login part  */}
            <div className='flex flex-col items-center gap-4'>
                <div className='lg:w-[400px] lg:h-[460px] border rounded-xl border-[#c9c9c9] lg:pb-0 pb-12 pt-12  px-4 flex flex-col gap-6 items-center'>
                    
                    <div >
                        <img src={instaLogo} alt="" className='w-[180px]' />

                    </div>

                    
                    <form action="" onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-2 text-[14px]'>
                        <input type="text" {...register("userName",{required:true})} placeholder='Username or Email' className='px-4 py-[6px] outline-none rounded-md w-[270px] border border-[#dbdbdb] bg-[#f5f5f5]' />
                        {errors.email && <p className='text-red-600'>Email or userName is required !</p>}

                        <input type="text" {...register("password",{required:true})} placeholder='Password' className='px-4 py-[6px] outline-none rounded-md w-[270px] border border-[#dbdbdb] bg-[#f5f5f5]' />
                        {errors.password && <p className='text-red-600'>password is required !</p>}

                        <div className='text-center text-[#737373] text-[13px] mt-4'>
                            <p>People who use our service may have uploaded </p>
                            <p>your contact information to Instagram. <span className='text-blue-500 cursor-pointer'>Learn</span> </p>
                            <p className='text-blue-500 cursor-pointer'>More</p>
                        </div>
                        <button type='submit' className='bg-[#53bdeb] font-semibold py-2 rounded-lg mt-3 text-white'>Login</button>
                        <div className='flex justify-end text-[13px] cursor-pointer'>
                            <button>Forgot Password?</button>
                        </div>
                    </form>
                </div>

                <div className='lg:w-[400px] lg:h-[90px] h-[60px] w-[300px] border rounded-xl border-[#c9c9c9] flex justify-center items-center text-[14px]'>
                    <p>Don't have an account? <span className='text-blue-500 cursor-pointer font-semibold' onClick={()=>navigate("/signup")}>Signup</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
