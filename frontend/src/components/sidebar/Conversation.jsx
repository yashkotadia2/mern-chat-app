import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import "../../assets/css/conversation.scss";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`conversation-container ${
          isSelected ? "conversation-selected" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar-container`}>
          <div className="avatar-pic">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="user-name-container">
          <div className="user-name">
            <p>{conversation.fullName}</p>
          </div>
          <div className="user-status">
            {isOnline && <span className={`user-online`} />}
          </div>
        </div>
      </div>

      {/* {!lastIdx && <div className="divider" />} */}
    </>
  );
};
export default Conversation;
