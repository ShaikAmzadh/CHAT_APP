import React, { useEffect } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { onlineusers } = useSocketContext();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
          onlineusers={onlineusers}
        />
      ))}
    </div>
  );
};

export default Conversations;
