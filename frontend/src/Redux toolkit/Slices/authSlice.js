import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token : localStorage.getItem("token") || "null",
    loading :false,
    postId:""
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:( state,actions)=>{
            state.token = actions.payload
        },
        setLoading:(state, actions)=>{
            state.loading = actions.payload
        },
        setPostId:(state,actions)=>{
            state.postId = actions.payload
        }
    }
})

export const { setToken,setLoading,setPostId } = authSlice.actions
export default authSlice.reducer