import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser}=useAuthContext()

    const login=async ({userName,password})=>{
        if(password.length<6){
            toast.error("Password should contain atleast 6 characters")
            return
        }
        setLoading(true)
        try {
           const res=await axios.post('/api/auth/login',{
            userName,password
           }) 

           const data=await res.data

           if(data.error){
            throw new Error(data.error)
           }

           localStorage.setItem("chat-user",JSON.stringify(data))

           toast.success("Login successfull")

           setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

  return {loading,login}
}

export default useLogin