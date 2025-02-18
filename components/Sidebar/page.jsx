import { useRouter } from "next/navigation";

const Sidebar = ({ chats }) => {
  const router = useRouter();

  const handleChatClick = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="sidebar w-1/4 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <ul>
        {chats.map((chat, index) => (
          <li
            key={chat._id}
            className="cursor-pointer p-2 mb-2 hover:bg-gray-600 rounded"
            onClick={() => handleChatClick(chat._id)}
          >
            {`Chat ${index + 1}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
