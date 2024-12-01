import React, { useEffect, useState } from 'react'
import circle from "../../Assests/Profiles/1.png"
import { toast } from 'react-toastify'
import { apiConnector } from '../../Services/apiConnector'
import { connectionsEndpoints, profileEndpoints } from '../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../Redux toolkit/Slices/authSlice'
import Spinner from '../../Components/Spinner'
function RightSidebar() {

  const token = useSelector((state)=>state.auth.token)
  const loading = useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch()
  const [userDetail , setUserDetail ] = useState({})
  const [suggestedAccounts , setSuggestedAccounts ] = useState([])
  const [follow, setFollow] = useState(false)

  const getUserDetails = async ()=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("get", profileEndpoints.PROFILE_DETAILS_API,{},{Authorization:`Bearer ${token}`})
      dispatch(setLoading(false))
      setUserDetail(response?.data?.userDetails)
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data.message);
      return ;
    }
  }

  const getSuggestedAccount = async ()=>{
    try{
      const response = await apiConnector("get", profileEndpoints.SUGGESTED_ACCOUNT_API,{},{Authorization:`Bearer ${token}`})
      // console.log("Response is : ", response.data.suggestedAccounts)
      const result = response?.data?.suggestedAccounts.sort(() => 0.5 - Math.random());
      setSuggestedAccounts(result.slice(0,6))
    }
    catch(error){
      toast.error(error?.response?.data?.message)
      return;
    }
  }

  const followTheUser =async (followingUserId)=>{
    try{
      dispatch(setLoading(true))
      await apiConnector("put",connectionsEndpoints.FOLLOW_THE_USER_API,{followingUserId},{Authorization:`Bearer ${token}`})
      dispatch(setLoading(false))
      setFollow(!follow)
      // console.log("follow response is : ", response)
      // toast.success(response?.data?.message)
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return ;

    }
  }

  useEffect(()=>{
    getUserDetails()
    getSuggestedAccount()
  },[token,follow])

  return (
    <div className='border-l pl-8 pt-12 border-[#262626] fixed ml-20'>
        {loading && <Spinner/>}
        <div className='w-[70%]'>

            {/* Profile our  */}
            <div className='flex gap-4 items-center'>

                {/* User profile  */}
                <div className='relative w-[56px] h-[56px] cursor-pointer'>
                  <img src={circle} alt="" />
                  <img src={userDetail?.profilePicture !== "null" ? userDetail?.profilePicture : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"} alt="" className='w-[48px] h-[48px] object-cover rounded-full absolute top-[2px] left-[3px] overflow-hidden' />
                </div>

                {/* user Id  */}
                <div className='flex justify-between items-center w-[80%] cursor-pointer'>

                  <div>
                      <div className='flex gap-1 items-center'>
                        <p>{userDetail?.userName}</p>
                        <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg>
                      </div>


                      <p className='text-[14px] text-[#a8a8a8]'>{userDetail.userName}</p>

                  </div>


                  <p className='text-blue-500'>Switch</p>

                </div>
            </div>


            {/* suggested text  */}
            <div className='flex justify-between items-center mt-6'>
              <p>Suggested for you</p>
              <p>See all</p>
            </div>

            {/* suggested account  */}
            <div className='mt-6 flex flex-col gap-6'>

              {
                suggestedAccounts.map((singleAccount)=>{
                  return (singleAccount?.userName !== userDetail.userName && <div key={singleAccount._id} className='flex gap-4 items-center'>

                            {/* User profile  */}
                            <div className='relative w-[49px] h-[49px] cursor-pointer'>
                              <img src={circle} alt="" />
                              <img src={singleAccount?.profilePicture !== "null" ? singleAccount?.profilePicture : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" } alt="" className='w-[42px] h-[42px] object-cover rounded-full absolute top-[3px] left-[4px] overflow-hidden' />
                            </div>
            
                            {/* user Id  */}
                            <div className='flex justify-between items-center w-[80%] cursor-pointer'>
            
                              <div>
                                  <div className='flex gap-1 items-center'>
                                    <p>{singleAccount.userName}</p>
                                    <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg>
                                  </div>
            
            
                                  <p className='text-[14px] text-[#a8a8a8]'>{singleAccount.userName}</p>
            
                              </div>
            
            
                              <div className='text-blue-500' onClick={()=>followTheUser(singleAccount?._id)}>{userDetail?.following?.includes(singleAccount._id) ? <p>Unfollow</p> : <p>Follow</p>}</div>
            
                            </div>
                          </div>)
                })
              }

            </div>

            <div className='text-[13px] text-[#a8a8a8] mt-10 flex flex-col gap-3'>
              <p>About <span>·</span>Help <span>·</span>Press <span>·</span>Api <span>·</span>Jobs <span>·</span>Privacy <span>·</span>Terms <span>·</span>Location <span>·</span>Language <span>·</span>Meta verified </p>
              <p>&copy; satynarayan maurya</p>
            </div>

        </div>
    </div>
  )
}

export default RightSidebar
