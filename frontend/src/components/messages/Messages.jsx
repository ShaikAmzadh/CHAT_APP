import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages.js";
import useConversation from "../../zustand/useConversation.js";
import MessageSkeleton from "../skeletons/MessagesSkeletons.jsx";

const Messages = () => {
  const { loading, getMessages } = useGetMessages();

  const { messages, selectedConversation } = useConversation();
  const lastMessageRef = useRef();
  useEffect(() => {
    if (selectedConversation) {
      getMessages();
    }
  }, [selectedConversation?._id]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
  });
  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading &&
        [...Array(3)].map((_, idx) => (
          <MessageSkeleton key={idx}></MessageSkeleton>
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
      {messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
