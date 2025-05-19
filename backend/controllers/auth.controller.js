import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generatetokenAndSetCookie from "../utils/generateToken.js"

export const signup=async (req,res)=>{
    try {
       const {fullName,userName,password,confirmPassword,gender}=req.body

    
        // CHECKING WHETHER PASSWORD AND CONFIRMPASSWORD ARE SAME
       if(password!==confirmPassword){
        return res.status(400).json({error:"Passwords don't match"})
       }

       const user=await User.findOne({userName})

       //CHECKING WHETHER A USER ALREADY EXISTS WITH THE GIVEN USERNAME
       if(user){
        return res.status(400).json({error:'Username already exists'})
       }

       // HASHING PASSWORD 
       // a salt is a random string added to a password before hashing it.
       const salt=await bcrypt.genSalt(10)
        // Here, 10 is the salt rounds.
        // This means the hashing algorithm runs 2^10 = 1024 iterations.
       const hashedPassword=await bcrypt.hash(password,salt)


       // ADDING PROFILE PIC
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${userName}`

       const newUser=new User({
        fullName,
        userName,
        password:hashedPassword,
        gender,
        profilePic:gender==='male'?boyProfilePic:girlProfilePic
       })

       await newUser.save()

       // Generate JWT token here
        generatetokenAndSetCookie(newUser._id,res)

       res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        userName:newUser.userName,
        profilePic:newUser.profilePic
    })

    } catch (error) {
        console.log("Error in signup controller",error.message);
        
        res.status(500).json({error:"Internal server error"})
    }
    
}
export const login=async (req,res)=>{
    try {
        const {userName,password}=req.body

        const user=await User.findOne({userName})
        // The ?. operator is called the Optional Chaining Operator
        const isPasswordCorrect=await bcrypt.compare(password,user?.password||"")

        // CHECKING WHETHER USER EXISTS AND PASSWORD IS CORRECT OR NOT
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid credentials"})
        }

        generatetokenAndSetCookie(user._id,res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            userName:user.userName,
            profilePic:user.profilePic
        })

    } catch (error) {
        console.log("Error in login controller",error.message);
        
        res.status(500).json({error:"Internal server error"})
    }
    
}
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message);
        
        res.status(500).json({error:"Internal server error"})
    }
    
}