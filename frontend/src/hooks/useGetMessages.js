import React, { useState } from 'react'
import useConversation from '../zustand/useConversation.js'
import axios from 'axios'
import toast from 'react-hot-toast'
const useGetMessages = () => {
  const [loading, setloading] = useState(false)

  const {setMessages,selectedConversation}=useConversation()

  const getMessages=async ()=>{
    setloading(true)
    try {
      
        const res=await axios.get(`/api/messages/${selectedConversation._id}`)

        const data=res.data

        if(data.error){
            throw new Error(data.error)
        }

        setMessages(data)
    } catch (error) {
        toast.error(error.message)
    }finally{
        setloading(false)
    }
  }
  return {loading,getMessages}
}

export default useGetMessages