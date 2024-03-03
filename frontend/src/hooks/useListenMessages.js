import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation  } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
		// const check = newMessage.receiverId == selectedConversation.id;
		console.log("selectedConverjojsjsation", newMessage.receiverId, selectedConversation.id);

      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      // if (check) {
      //   alert(newMessage.message);
      // }
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
