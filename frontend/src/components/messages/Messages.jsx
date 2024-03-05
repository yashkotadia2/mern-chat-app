import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import "../../assets/css/messages.scss";
import { LoadingOutlined } from "@ant-design/icons";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="messages-container">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <LoadingOutlined
            style={{
              color: "#20948b",
              width: "fit-content",
              fontSize: "6rem",
            }}
          />
        </div>
      )}
      {!loading && messages.length === 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "gray",
            fontSize: "1.1rem",
          }}
        >
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
