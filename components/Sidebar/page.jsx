import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const Sidebar = ({ chats }) => {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/api/get-token");
      const decode = jwtDecode(response.data.token);
      const user = decode.userId;
      console.log(decode.userId);
      setUserId(user);
    };
    fetchUser();
  }, []);

  const handleChatClick = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  const handleGenerateJournal = () => {
    router.push(`/journal/${userId}`);
  };

  return (
    <div className="w-72 bg-gray-900 text-white h-screen p-5 flex flex-col justify-between shadow-lg">
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-400 tracking-wide">
          Chats
        </h2>
        <ul className="space-y-2">
          {chats.map((chat, index) => (
            <li
              key={chat._id}
              className="cursor-pointer p-3 rounded-lg bg-gray-800 hover:bg-blue-600 transition duration-300 shadow-md text-center text-lg font-medium"
              onClick={() => handleChatClick(chat._id)}
            >
              {`Chat ${index + 1}`}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleGenerateJournal}
        className="mt-6 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-bold py-3 rounded-lg shadow-lg text-lg tracking-wide"
      >
        Generate Journal
      </button>
    </div>
  );
};

export default Sidebar;
