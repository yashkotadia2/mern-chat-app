import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { BsSearch } from "react-icons/bs";
import { Input } from "antd";
const { Search } = Input;

const SearchInput = () => {
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const onSearch = (value, _e, info) => {
    console.log("search", info?.source, value);

    if (!value) return;
    if (value.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(value.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
    } else toast.error("No such user found!");
  };

  return (
    <>
      <Search
        placeholder="Search conversations..."
        allowClear
        enterButton={
          <BsSearch
            style={{
              marginTop: "0.2rem",
            }}
            size={22}
          />
        }
        size="large"
        onSearch={onSearch}
        style={{
          width: "90%",
          marginInline: "1rem",
          marginTop: "1rem",
        }}
      />
    </>
  );
};
export default SearchInput;
