export const getChat = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { listingId, chatId } = req.body;

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    let existingChat = null;
    if (chatId) {
      existingChat = await prisma.chat.findFirst({
        where: {
          id: chatId,
          OR: [{ chatUserId: userId }, { ownerUserId: userId }],
        },
        include: {
          listing: true,
          ownerUser: true,
          chatUser: true,
          messages: true,
        },
      });
    } else {
      existingChat = await prisma.chat.findFirst({
        where: {
          listingId,
          chatUserId: userId,
          ownerUserId: listing.ownerId,
        },
        include: {
          listing: true,
          ownerUser: true,
          chatUser: true,
          messages: true,
        },
      });
    }

    if (existingChat) {
      if (existingChat.isLastMessageRead === false) {
        const lastMessage =
          existingChat.messages[existingChat.messages.length - 1];
        const isLastMessageSendByMe = lastMessage.sender_Id === userId;
        if (!isLastMessageSendByMe) {
          await prisma.chat.update({
            where: { id: existingChat.id },
            data: { isLastMessageRead: true },
          });
        }
      }
      return res.status(200).json({ chat: existingChat });
    }

    const newChat = await prisma.chat.create({
      data: {
        listingId,
        ownerUserId: listing.ownerId,
        chatUserId: userId,
      },
    });

    const chatWithData = await prisma.chat.findUnique({
      where: { id: newChat.id },
      include: {
        listing: true,
        ownerUser: true,
        chatUser: true,
        messages: true,
      },
    });

    return res.status(201).json({ chat: chatWithData });
  } catch (error) {
    console.error("Get Chat Error:", error);
    return res.status(500).json({
      message: error.message || error.code || "Internal Server Error",
    });
  }
};

export const getAllUserChats = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const chats = await prisma.chat.findMany({
      where: {
        OR: [{ chatUserId: userId }, { ownerUserId: userId }],
      },
      include: {
        listing: true,
        ownerUser: true,
        chatUser: true,
        messages: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!chats || chats.length === 0) {
      return res.status(404).json({ message: "No chats found for this user" });
    }

    return res.status(200).json({ chats });
  } catch (error) {
    console.error("Get All User Chats Error:", error);
    return res.status(500).json({
      message: error.message || error.code || "Internal Server Error",
    });
  }
};

export const sendChatMessage = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { chatId, message } = req.body;

    const chat = await prisma.chat.findFirst({
      where: {
        AND: [
          { id: chatId },
          { OR: [{ chatUserId: userId }, { ownerUserId: userId }] },
        ],
      },
      include: {
        listing: true,
        ownerUser: true,
        chatUser: true,
      },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    } else if (chat.listing.status !== "active") {
      return res
        .status(400)
        .json({ message: "Cannot send message in inactive listing chat" });
    }

    const newMessage = await prisma.message.create({
      data: {
        chatId,
        sender_Id: userId,
        message,
        createdAt: new Date(),
      },
    });

    await prisma.chat.update({
      where: { id: chatId },
      data: {
        lastMessageAt: new Date(),
        isLastMessageRead: false,
        lastMessage: newMessage.message,
        lastMessageSenderId: userId,
      },
    });

    return res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error("Send Chat Message Error:", error);
    return res.status(500).json({
      message: error.message || error.code || "Internal Server Error",
    });
  }
};
