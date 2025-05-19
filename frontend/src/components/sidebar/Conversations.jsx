import React, { useState } from "react";
import Conversation from "./Conversation";

const Conversations = () => {
  const [users, setUsers] = useState([
    {
      username: "Olsen",
      profilePic: "/eolsen.webp",
    },
    {
      username: "Olsen",
      profilePic: "/image1.jpg",
    },
    {
      username: "Olsen",
      profilePic: "/image2.jpg",
    },
    {
      username: "Olsen",
      profilePic: "/image3.jpg",
    },
    {
      username: "Olsen",
      profilePic: "/image4.jpg_large",
    },
    {
      username: "Olsen",
      profilePic: "/eolsen.webp",
    },
    {
      username: "Olsen",
      profilePic: "/eolsen.webp",
    },
    {
      username: "Olsen",
      profilePic: "/eolsen.webp",
    },
    {
      username: "Olsen",
      profilePic: "/eolsen.webp",
    },
  ]);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {users.map((user) => (
        <Conversation user={user} />
      ))}
    </div>
  );
};

export default Conversations;
