import useSendMessage from "../../hooks/useSendMessage";
import { Input } from "antd";
import { useState } from "react";
const { Search } = Input;
import { IoSend } from "react-icons/io5";

const suffix = <></>;

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage();
  const [inputMessage, setInputMessage] = useState("");

  const onSendMessage = async (value, _e, info) => {
    if (!value) return;
    setInputMessage("");
    await sendMessage(value);
  };

  return (
    <>
      <Search
        style={{
          height: "10%",
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
        enterButton={<IoSend style={{ marginTop: "0.2rem" }} size={22} />}
        size="large"
        suffix={suffix}
        onSearch={onSendMessage}
        loading={loading}
      />
    </>
  );
};
export default MessageInput;
