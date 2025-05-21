import { useState } from "react";
import { createContext } from "react";
import { useAuthContext } from "./AuthContext";
import { useEffect } from "react";
import io from "socket.io-client";
import { useContext } from "react";

export const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);
  const [onlineusers, setonlineusers] = useState([]);

  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        },
      });

      setsocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setonlineusers(users);
      });
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineusers }}>
      {children}
    </SocketContext.Provider>
  );
};
