import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import "animate.css";
import "../../assets/css/message.scss";
import { Image } from "antd";

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
      ? "animate__animated animate__flipInX animate__delay-1s"
      : "animate__animated animate__flipInX animate__delay-1s"
    : "";

  // const shakeClass = true
  //   ? "animate__animated animate__slideInRight"
  //   : "";

  const isBase64 = (str) => {
    const base64URLPattern = /^(data:)([\w/+]+);(charset=[\w-]+|base64),(.*)$/;
    return base64URLPattern.test(str);
  };

  return (
    <div className="message-container">
      <div className={`message-wrapper ${chatClassName} ${shakeClass}`}>
        <div className="chat-bubble">
          {isBase64(message.message) ? (
            <Image style={{ maxWidth: "120px"}} src={message.message} alt="chat-image" />
          ) : (
            <p>{message.message}</p>
          )}
        </div>
        <div className="chat-info">
          <div className="chat-time">{formattedTime}</div>
          <div className="chat-user-pic">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
