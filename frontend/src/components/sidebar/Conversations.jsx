import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { LoadingOutlined } from "@ant-design/icons";
import "../../assets/css/conversations.scss";
import noConversationsSvg from "../../assets/icons/message.svg";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div
      className="conversations-container"
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <LoadingOutlined
          style={{
            color: "#1995ad",
            width: "fit-content",
            fontSize: "4rem",
            margin: "50% auto",
          }}
        />
      ) : null}

      {conversations.length === 0 && !loading && (
        <div>
          <h3
            style={{
              textAlign: "center",
              color: "#1995ad",
              margin: "50% auto",
            }}
          >
            <img
              src={noConversationsSvg}
              alt="no conversations"
              style={{ width: "50px", height: "50px" }}
            />
            <br />
            No Conversations
          </h3>
        </div>
      )}
    </div>
  );
};
export default Conversations;
