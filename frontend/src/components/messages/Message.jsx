import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { extractTime } from "../../utils/extractTime.js";

const Message = ({ message }) => {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const fromMe = authUser._id === message.senderId;

  const time = extractTime(message.createdAt);
  return (
    <div className={`chat ${fromMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={`${
              fromMe ? authUser.profilePic : selectedConversation.profilePic
            }`}
            alt="Tailwind css chat bubble component"
          />
        </div>
      </div>

      <div className={`chat-bubble text-white ${fromMe ? "bg-blue-500" : ""}`}>
        {message.message}
      </div>

      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {time}
      </div>
    </div>
  );
};

export default Message;
