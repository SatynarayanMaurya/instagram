// const BASE_URL = "http://localhost:4000"
// const BASE_URL = "http://192.168.1.4:4000"
const BASE_URL = "https://instagram-backend-lo48.onrender.com"


export const authEndpoints = {
    
    SIGNUP_API : BASE_URL + "/api/v1/signup",
    LOGIN_API : BASE_URL + "/api/v1/login",
}

export const postEndpoints = {

    CREATE_POST_API : BASE_URL + "/api/v1/create-post",
    GET_ALL_POST : BASE_URL + "/api/v1/get-all-post",
    GET_USER_POST : BASE_URL + "/api/v1/get-user-post",
    LIKE_POST_API : BASE_URL + "/api/v1/like-post",
    CREATE_COMMENT_API : BASE_URL + "/api/v1/create-comment",
    GET_SINGLE_POST_DETAIILS_API : BASE_URL + "/api/v1/get-single-post-details",
    GET_SINGLE_USER_POST_API : BASE_URL + "/api/v1/get-single-user-posts",
    GET_ANOTHER_SINGLE_USER_POST_API : BASE_URL + "/api/v1/get-another-single-user-post",

    GET_ALL_REELS_API : BASE_URL + "/api/v1/get-all-reels"
    
}

export const reelEndpoints = {
    GET_SINGLE_USER_REEL_API : BASE_URL + "/api/v1/get-single-user-reels",
    LIKE_REEL_API : BASE_URL + "/api/v1/like-reel",
    GET_SINGLE_REEL_API : BASE_URL + "/api/v1/get-single-reel-details",
    CREATE_COMMENT_ON_REEL_API : BASE_URL + "/api/v1/create-comment-on-reel",
    GET_ANOTHER_SINGLE_REEL_API : BASE_URL + "/api/v1/get-another-single-reel-details"
}

export const profileEndpoints = {

    PROFILE_DETAILS_API : BASE_URL + "/api/v1/profile-details",
    EDIT_PROFILE_API : BASE_URL + "/api/v1/edit-profile",
    SUGGESTED_ACCOUNT_API : BASE_URL  + "/api/v1/suggested-account",
    GET_ANOTHER_PROFILE_DETAILS_API : BASE_URL + "/api/v1/get-another-profile-details"

}

export const connectionsEndpoints = {
    FOLLOW_THE_USER_API : BASE_URL + "/api/v1/follow-the-user"
}
