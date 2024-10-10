import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req,res,next)=> {
    // get user detail from frontend
    // validation if fields are empty or not
    // check if user is alredy registered  - username , email
    // check for images check fro avatar
    // upload them to cloudinary check if avatar is availabel or not
    // create user object - create entry in db
    // remove paasword and refresh token field from response
    // check for user creation 
    // return response

    const { username, fullname ,password, email } = req.body
    // console.log( "username :-",username, "email:-" ,email,
    //    "password:-",   password, "fullname:-", fullname)
    // if(fullname === ""){
    //     throw new ApiError(400,"fullname is required")
    // }

    if(
        [ fullname, email, username, password].some((field)=>  field?.trim() === "") 
    ) {
        throw new ApiError(400, "all fields are required")
    }
   const existedUser =  User.findOne({
        $or:[{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exist" )
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath =  req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is require")  
    }
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is require")  
    }

  const avatar =  await uploadOnCloudinary(avatarLocalPath)
  const coverImage =  await uploadOnCloudinary(coverImageLocalPath)

  if(! avatar ) {
    throw new ApiError(400, "Avatar file is require")  
  }

const user =  await User.create({
    fullname,
    avatar: avatar.url,

    // coverImage : coverImage?.url || "",

    coverImage :coverImage.url,
    email,
    password,
    username: username.toLowerCase(),
})

const createdUser =  await User.findById(user._id).select(
    "-password -refreshToken"
)

if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
)

})

export { registerUser }