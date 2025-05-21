import { useState } from "react"
import toast from "react-hot-toast"
import axios from 'axios'
import { useAuthContext } from "../context/AuthContext"


const useSignup = () => {
  const [loading,setLoading]=useState(false)
  const {setAuthUser}=useAuthContext()

  const signup=async ({fullName,userName,password,confirmPassword,gender})=>{
    const success=handleInputErrors({fullName,userName,password,confirmPassword,gender})

    if(!success) return 
    setLoading(true)
    try {
        // const res=await fetch('http://localhost:5000/api/auth/signup',{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":'application/json'
        //     },
        //     body:JSON.stringify({fullName,userName,password,confirmPassword,gender})
        // })
        
        // const data=await res.json()

        // BY USING AXIOS THERE IS NO NEED TO STRINGIFYING THE OBJEC WHILE SENDING AND CONVERTING BACK TO JSON WHILE USING IN FRONTEND
        const res=await axios.post('/api/auth/signup',{fullName,userName,password,confirmPassword,gender})
        const data=res.data
        if(data.error){
            throw new Error(data.error)
        }

        //SET USER TO LOCALSTORAGE
        localStorage.setItem("chat-user",JSON.stringify(data))

        toast.success("Signed up successfully")
        setAuthUser(data)
        
    } catch (error) {
        toast.error(error.message)
    }finally{
    setLoading(false)
    }
  }

  return {loading,signup}
}

export default useSignup

function handleInputErrors({fullName,userName,password,confirmPassword,gender}){
    if(!fullName || !userName || !password || !confirmPassword || !gender){
        toast.error("Please fill in all fields")
        return false;
    }

    if(password!==confirmPassword){
        toast.error("Passwords do not match")
        return false
    }

    if(password.length<6){
        toast.error("Password must be at least 6 characters")

        return false
    }

    return true
}