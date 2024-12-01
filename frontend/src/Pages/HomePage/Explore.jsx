import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { apiConnector } from '../../Services/apiConnector'
import { postEndpoints } from '../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../Redux toolkit/Slices/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../Components/Spinner'
function Explore() {

  const token = useSelector((state)=>state.auth.token)
  const loading = useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch()
  const [allPosts, setAllPosts] = useState([])
  const navigate = useNavigate()


  const getAllPost = async()=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector('get', postEndpoints.GET_ALL_POST,{},{Authorization:`Bearer ${token}`})
      dispatch(setLoading(false))
      // console.log("Explore page all response is : ", response?.data?.allPost)
      setAllPosts(response?.data?.allPost.sort(() => Math.random() - 0.5))
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return ;
    }
  }

  const postClicked = (userId)=>{
    navigate(`/account/${userId}`)
  }

  useEffect(()=>{
    getAllPost()
  },[token])


  return (
    <div className=' lg:ml-[360px] lg:mt-16 mt-6' >

        {loading && <Spinner/>}

        <div className='flex gap-4 flex-wrap'>


          {
            allPosts?.map((post)=>{
              return <div key={post._id} className='cursor-pointer' onClick={()=>postClicked(post?.userId?._id)}>
                        <img src={post?.media} alt="" className='lg:w-[290px] lg:h-[290px] w-[160px] h-[160px] object-cover' />
                      </div>
            })
          }

        </div>
    </div>
  )
}

export default Explore
