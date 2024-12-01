const express = require("express")
const router = express.Router()

const {isAuth} = require("../Middlewares/auth")
const { signup, login } = require("../Controllers/auth")
const { createPost, getAllPost, likePost, createComment, getSinglePostDetails, getAllReels, getSingleUserReel, getSingleUserPost, likeReel, getSingleReelDetails, createCommentOnReel, getAnotherSingleUserPost, getAnotherSingleUserReel } = require("../Controllers/createPost")
const { profileDetails, editProfile, suggestedAccount, getAnotherProfileDetails } = require("../Controllers/Profile")
const { followingUser } = require("../Controllers/connections")


// Auth

router.post("/signup", signup)
router.post("/login", login)


//Posts 

router.post("/create-post",isAuth, createPost)
router.get("/get-all-post",isAuth, getAllPost)
router.post("/like-post",isAuth,likePost)
router.post("/create-comment",isAuth,createComment)
router.get("/get-single-post-details", isAuth, getSinglePostDetails)

router.get("/get-single-user-posts", isAuth, getSingleUserPost)
router.get("/get-another-single-user-post",isAuth,getAnotherSingleUserPost)


// Reels
router.get("/get-all-reels", isAuth,getAllReels)
router.get("/get-single-user-reels",isAuth, getSingleUserReel)
router.put("/like-reel", isAuth, likeReel)
router.get("/get-single-reel-details",isAuth,getSingleReelDetails)
router.get("/get-another-single-reel-details", isAuth, getAnotherSingleUserReel)
router.post("/create-comment-on-reel", isAuth, createCommentOnReel)


// Connections 
router.put("/follow-the-user",isAuth,followingUser)


// Profiles
router.get("/profile-details",isAuth,profileDetails)
router.put("/edit-profile", isAuth,editProfile)
router.get("/suggested-account", isAuth,suggestedAccount)
router.get("/get-another-profile-details", isAuth, getAnotherProfileDetails)

module.exports = router