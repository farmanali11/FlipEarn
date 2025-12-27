import React, { useEffect, useMemo, useState} from "react";
import { dummyChats } from "../assets/assets";
import { MessageCircle, Search } from "lucide-react";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { setChat } from "../app/features/chatSlice";
import { useDispatch } from "react-redux";

const Messages = () => {
  const user = { id: "user_1" };
  const dispatch = useDispatch()

  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const formatTime = (dateString) => {
    if (!dateString) return "";

    const date = parseISO(dateString);

    if (isToday(date)) {
      return `Today ${format(date, "HH:mm")}`;
    }

    if (isYesterday(date)) {
      return `Yesterday ${format(date, "HH:mm")}`;
    }

    return format(date, "MMM d");
  };

  const filteredChats = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return chats.filter((chat) => {
      const chatUser =
        chat.chatUserId === user.id ? chat.ownerUser : chat.chatUser;

      return (
        chat.listing?.title?.toLowerCase().includes(query) ||
        chatUser?.name?.toLowerCase().includes(query)
      );
    });
  }, [chats, searchQuery]);

  const handleOpenChat =((chat)=>{
    dispatch(setChat({listing:chat.listing,chatId:chat.id}))
  })

  const fetchUserChat = async () => {
    setChats(dummyChats);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserChat();
    const interval = setInterval(fetchUserChat, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
        <p className="text-sm text-gray-500">Chat with buyers and sellers</p>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 mb-6 px-3 py-2 border rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Start conversation"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Chat Section */}
      {loading ? (
        <div className="py-10 text-center text-gray-500">
          Loading messages...
        </div>
      ) : filteredChats.length === 0 ? (
        <div className="flex flex-col items-center text-center py-16 text-gray-500">
          <MessageCircle className="w-10 h-10 mb-4" />
          <h3 className="font-medium mb-1">
            {searchQuery ? "No chats found" : "No messages yet"}
          </h3>
          <p className="text-sm max-w-xs">
            {searchQuery
              ? "Try a different search term"
              : 'Start a conversation by viewing a listing and clicking "Chat with Seller"'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredChats.map((chat) => {
            const chatUser =
              chat.chatUserId === user.id ? chat.ownerUser : chat.chatUser;

            const isLastMessageFromUser = chat.lastMessageSenderId === user.id;

            return (
              <button
              onClick={()=>handleOpenChat(chat)}
                key={chat.id}
                className="w-full rounded-lg p-3 text-left transition hover:bg-gray-50 focus:outline-none focus:bg-gray-100"
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
                    <img
                      src={chatUser?.image}
                      alt={chatUser?.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        {chat.listing?.title}
                      </h3>
                      <span className="ml-2 text-xs text-gray-400 shrink-0">
                        {formatTime(chat.updatedAt)}
                      </span>
                    </div>

                    <p className="mb-1 text-xs text-gray-500">
                      {chatUser?.name}
                    </p>

                    {/* Last message */}
                    <p
                      className={`truncate text-sm ${
                        isLastMessageFromUser
                          ? "text-gray-400"
                          : "font-medium text-gray-800"
                      }`}
                    >
                      {chat.lastMessage || "No messages yet"}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Messages;
