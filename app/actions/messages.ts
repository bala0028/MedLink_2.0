"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function getContactsAction() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!currentUser) return { success: false, error: "User not found" };

    // Fetch all other users to act as contacts for the demo
    const otherUsers = await prisma.user.findMany({
      where: { id: { not: currentUser.id } },
      select: { id: true, name: true, role: true }
    });

    return { 
      success: true, 
      currentUser: { id: currentUser.id, name: currentUser.name, email: currentUser.email || "" },
      contacts: otherUsers.map((u, i) => ({
        id: u.id,
        name: u.name || "Unknown User",
        role: u.role || "User",
        img: (10 + i).toString() // Generate sequence of avatars
      }))
    };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return { success: false, error: "Failed to fetch contacts", contacts: [] };
  }
}

export async function getMessagesAction(contactId: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) return { success: false, error: "Unauthorized" };

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!currentUser) return { success: false, error: "User not found" };

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUser.id, receiverId: contactId },
          { senderId: contactId, receiverId: currentUser.id }
        ]
      },
      orderBy: { createdAt: 'asc' }
    });

    return { success: true, messages };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { success: false, error: "Failed to fetch messages" };
  }
}

export async function sendMessageAction(receiverId: string, content: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) return { success: false, error: "Unauthorized" };

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!currentUser) return { success: false, error: "User not found" };

    const message = await prisma.message.create({
      data: {
        senderId: currentUser.id,
        receiverId,
        content
      }
    });

    return { success: true, message };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: "Failed to send message" };
  }
}
