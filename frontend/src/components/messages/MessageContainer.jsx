import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TbMessages } from "react-icons/tb";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div
            style={{
              minHeight: "2.8rem",
              paddingInline: "1rem",
              paddingBlock: "0.7rem",
              backgroundColor: "#20948b",
              borderRadius: "0.5rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.9rem",
                color: "white",
              }}
            >
              To:
            </span>{" "}
            <span
              style={{
                fontSize: "1.1rem",
                color: "white",
                fontWeight: "bold",
                paddingTop: "0.5rem",
              }}
            >
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          paddingInline: "1rem",
          textAlign: "center",
          fontSize: "1.2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "#20948b",
        }}
      >
        <p>Welcome 🙏 {authUser.fullName}!</p>
        <p>Select a chat to start messaging</p>
        <TbMessages
          style={{
            textAlign: "center",
            fontSize: "3rem",
          }}
        />
      </div>
    </div>
  );
};
