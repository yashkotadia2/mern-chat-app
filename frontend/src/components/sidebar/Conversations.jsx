import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { LoadingOutlined } from "@ant-design/icons";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div
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
        <LoadingOutlined style={{
			color: "#20948b",
			width: "fit-content",
			fontSize: "4rem",
			margin: "auto",
		}} />
      ) : null}
    </div>
  );
};
export default Conversations;