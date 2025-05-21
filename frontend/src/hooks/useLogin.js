import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser}=useAuthContext()

    const login=async ({userName,password})=>{

        setLoading(true)
        try {
            if(!userName || !password){
                throw new Error("Missing fields")
            }
            if(password.length<6){
                throw new Error("Password should be atleast of 6 characters")
            }
           const res=await axios.post('/api/auth/login',{
            userName,password
           }) 

           const data=res.data

           if(data.error){
            throw new Error(data.error)
           }

           localStorage.setItem("chat-user",JSON.stringify(data))

           toast.success("Login successfull")

           setAuthUser(data)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || "Login failed")
        }finally{
            setLoading(false)
        }
    }

  return {loading,login}
}

export default useLogin