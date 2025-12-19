import React, { useEffect, useState } from "react";
import { dummyChats } from "../assets/assets";
import { MessageCircle, Search } from "lucide-react";

import {format, isToday,isYesterday,parseISO} from 'date-fns'

const Messages = () => {
  const user = { id: "user_1" };

  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const formatTime = (dateString) =>{
    if(!dateString) return

    const date = parseISO(dateString)

    if(isToday(date)){
      return 'Today' + format(date,"HH:mm")
    }
    if(isYesterday(date)){
      return 'Yesterday' + format(date,"HH:mm")
    }

    return format(date,"MMM d")
  }

  const fetchUserChat = async () => {
    setChats(dummyChats);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserChat();

    const interval = setInterval(() => {
      fetchUserChat();
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="text-sm text-gray-500">Chat with buyers and sellers</p>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 mb-6 px-3 py-2 border rounded-lg bg-white">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Start conversation"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Chat Section */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">
          Loading messages...
        </div>
      ) : chats.length === 0 ? (
        <div className="flex flex-col items-center text-center py-16 text-gray-500">
          <div className="mb-4">
            <MessageCircle className="w-10 h-10" />
          </div>
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
          {chats.map((chat) => {
            const chatUser =
              chat.chatUserId === user?.id ? chat.ownerUser : chat.chatUser;

            const isLastMessageFromUser = chat.lastMessageSenderId === user?.id;

            return (
              <button
                key={chat.id}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <img
                      src={chatUser?.image}
                      alt={chatUser?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium truncate">
                        {chat.listing?.title}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {formatTime(chat.updatedAt)}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-1">
                      {chatUser?.name}
                    </p>

                    {/* Last message with dynamic class */}
                    <p
                      className={`text-sm truncate ${
                        isLastMessageFromUser
                          ? "text-gray-400"
                          : "text-gray-800 font-medium"
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
