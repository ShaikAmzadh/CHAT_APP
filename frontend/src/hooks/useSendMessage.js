import React, { useState } from 'react'
import useConversation from '../zustand/useConversation.js'
import axios from 'axios'
import toast from 'react-hot-toast'

const useSendMessage = () => {
  const [loading, setloading] = useState(false)

  const {messages,setMessages,selectedConversation}=useConversation()

  const sendMessage=async(message)=>{

    setloading(true)
    try {
        const res=await axios.post(`/api/messages/send/${selectedConversation._id}`,{message})

        const data=res.data

        if(data.error){
            throw new Error(data.error)
        }
        
        setMessages([...messages,data])
        console.log(messages);
    } catch (error) {
        toast.error(error.message)
    }finally{
        setloading(false)
    }
  }

  return {loading,sendMessage}
}

export default useSendMessage