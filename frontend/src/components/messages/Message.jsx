import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import "animate.css";
import "../../assets/css/message.scss";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "you" : "other";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const shakeClass = message.shouldShake
    ? fromMe
      ? "animate__animated animate__slideInRight animate__faster"
      : "animate__animated animate__slideInLeft animate__faster"
    : "";

  // const shakeClass = true
  //   ? "animate__animated animate__slideInRight"
  //   : "";

  return (
    <div className="message-container">
      <div className={`message-wrapper ${chatClassName} ${shakeClass}`}>
        <div className="chat-bubble">
          <p>{message.message}</p>
        </div>
        <div className="chat-info">
          <div className="chat-user-pic">
            <img src={profilePic} alt="user avatar" />
          </div>
          <div className="chat-time">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
};
export default Message;
