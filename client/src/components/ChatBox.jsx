import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dummyChats } from "../assets/assets";
import { Loader2Icon, X, Send } from "lucide-react";
import { clearChat } from "../app/features/chatSlice";
import { format } from "date-fns";

const ChatBox = () => {
  const { listing, isOpen } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const user = { id: "user_2" };

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const messageEndRef = useRef(null);

  /* ---------------- Fetch Chat ---------------- */
  const fetchChat = async () => {
    setIsLoading(true);
    const data = dummyChats[0];
    setChat(data);
    setMessages(data?.messages || []);
    setIsLoading(false);
  };

  useEffect(() => {
    if (listing && isOpen) {
      fetchChat();
    }
  }, [listing, isOpen]);

  /* ---------------- Reset on Close ---------------- */
  useEffect(() => {
    if (!isOpen) {
      setChat(null);
      setMessages([]);
      setNewMessage("");
      setIsLoading(true);
      setIsSending(false);
    }
  }, [isOpen]);

  /* ---------------- Auto Scroll ---------------- */
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- Send Message ---------------- */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);

    const newMsg = {
      id: Date.now(),
      chatId: chat.id,
      sender_id: user.id,
      message: newMessage.trim(),
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
    setIsSending(false);
  };

  if (!isOpen || !listing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 p-4">
      <div className="flex h-[85vh] w-full max-w-md flex-col rounded-2xl bg-white shadow-xl">
        {/* ---------- Header ---------- */}
        <div className="flex items-start justify-between border-b border-gray-200 p-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {listing.title}
            </h3>
            <p className="text-xs text-gray-500">
              {user.id === listing.ownerId
                ? `Chatting with Buyer (${
                    chat?.chatUser?.name || "Loading..."
                  })`
                : `Chatting with Seller (${
                    chat?.ownerUser?.name || "Loading..."
                  })`}
            </p>
          </div>

          <button
            onClick={() => dispatch(clearChat())}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* ---------- Messages ---------- */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2Icon className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-sm text-gray-500">
              <p className="font-medium">No messages yet</p>
              <p>Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender_id === user.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                    message.sender_id === user.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p>{message.message}</p>
                  <p className="mt-1 text-[10px] opacity-70">
                    {format(new Date(message.createdAt), "MMM dd 'at' h:mm a")}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messageEndRef} />
        </div>

        {/* ---------- Input ---------- */}
        {chat?.listing?.status === "active" ? (
          <form
            onSubmit={handleSendMessage}
            className="flex items-end gap-2 border-t border-gray-200 p-3"
          >
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Type your message here..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />

            <button
              type="submit"
              disabled={!newMessage.trim() || isSending}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSending ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        ) : (
          <div className="border-t border-gray-200 p-3 text-center text-sm text-gray-500">
            <p>
              {chat ? `Listing is ${chat?.listing?.status}` : "Loading chat..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
