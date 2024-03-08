import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";
import { toast } from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
import useGetConversations from "./useGetConversations";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const {
    messages,
    setMessages,
    selectedConversation,
    setSelectedConversation,
  } = useConversation();
  const { conversations } = useGetConversations();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // console.log("newMessage", newMessage);
      const check = newMessage.senderId == selectedConversation._id;
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      if (check) {
        setMessages([...messages, newMessage]);
      } else {
        let messageFromConversation = conversations.filter((conversation) => {
          if (conversation._id == newMessage.senderId) {
            return conversation;
          }
        });
        console.log("messageFromConvernxfbhvkjsation", messageFromConversation);
        toast(
          "New message from " +
            messageFromConversation[0].fullName +
            "\n > " +
            newMessage.message,
          {
            icon: "✉",
            style: {
              borderRadius: "10px",
              background: "#1995ad",
              color: "#fff",
              boxShadow: "#badce315 0px 5px 15px",
            },
            duration: 5000,
            // position: "bottom-center",
          }
        );

  
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages, selectedConversation, conversations]);
};
export default useListenMessages;
