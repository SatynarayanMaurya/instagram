import React, { useEffect, useState } from 'react'
import circle from "../../../Assests/Profiles/1.png"
// import profile from "../../../Assests/Profiles/1687918366698.jpg"
import { GiTireIronCross } from "react-icons/gi";
import { toast } from 'react-toastify';
import { apiConnector } from '../../../Services/apiConnector';
import { postEndpoints } from '../../../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../Redux toolkit/Slices/authSlice';
import Spinner from '../../../Components/Spinner';
function MoreComments({closeMoreComment}) {

    const token = useSelector((state)=>state.auth.token)
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()
    const [profileDetails, setProfileDetails] = useState({})
    const [postDetails, setPostDetails] = useState({})
    const [allComments, setAllComments] = useState([])
    const postId = useSelector((state)=>state.auth.postId)

    const getPostDetails = async()=>{
        try{
            dispatch(setLoading(true))
            const response = await apiConnector("get",postEndpoints.GET_SINGLE_POST_DETAIILS_API,{},{Authorization:`Bearer ${token}`,"postId":postId})
            dispatch(setLoading(false))
            setProfileDetails(response?.data?.postDetails?.userId)
            setPostDetails(response?.data?.postDetails)
            setAllComments(response?.data?.postDetails?.comments.reverse())
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message)
            return ;
        }
    }


    useEffect(()=>{
        getPostDetails()
    },[token])


  return (
    <div className="fixed right-0 inset-0  flex lg:justify-center lg:items-center lg:mt-0 mt-[240px] bg-opacity-90 backdrop-blur-[1px] rounded-lg ">
      {loading && <Spinner/>}
      <div className='lg:w-[1100px] w-[350px]  h-[450px]  lg:h-[600px] bg-black lg:px-4 px-2 lg:py-4 py-1 flex gap-4'>

        {/* Left part  */}
        <div className='hide_block_element'>
            <img src={postDetails?.media} alt="" className='w-[400px] h-full object-cover rounded-lg' />
        </div>
        
        {/* Right part  */}
        <div>
            <div >
                <div className='flex justify-between '>

                    <div className='flex gap-4 items-center'>
                        <div className='relative'>
                            <img src={circle} alt="" className='w-[57px] h-[57px] ' />
                            <img src={profileDetails?.profilePicture} alt="" className='w-[47px] h-[47px] object-cover rounded-full absolute top-[5px] left-[5px]' />
                        </div>
                        <div className='flex gap-1 items-center'>
                            <p>{profileDetails?.userName}</p>
                            <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                    <button onClick={()=>closeMoreComment()} className='lg:mr-6 mr-6 text-xl'><GiTireIronCross/></button>
                </div>
                <div className=' border-t-[1px] lg:w-[415px] w-[350px] lg:my-4 my-2 lg:-ml-4 -ml-2'></div>
                
                {/* all Comments  */}
                <div className='flex flex-col gap-4 overflow-y-scroll h-[450px]'>

                    {
                        allComments.length === 0 ?

                        <div>
                            <p className='text-2xl font-semibold text-center mt-4'>No Comments here</p>
                        </div> :

                        allComments.map((comment)=>{
                            return <div className='flex gap-4 ' key={comment._id}>
                                        <div className='relative'>
                                            <img src={circle} alt="" className='w-[52px] h-[52px] ' />
                                            <img src={comment?.userId?.profilePicture} alt="" className='w-[42px] h-[42px] object-cover rounded-full absolute top-[5px] left-[5px]' />
                                        </div>
                                        <div className='flex flex-col gap-1 w-[330px] '>
                                            <div className='flex gap-1 items-center'>
                                                <p>{comment?.userId?.userName}</p>
                                                <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg>
                                            </div>
                                            <p className='text-sm'>{comment.comment} </p>
                                        </div>
                                    </div>
                        })
                    }

                </div>
            </div>
           
        </div>
      </div>
    </div>
  )
}

export default MoreComments
