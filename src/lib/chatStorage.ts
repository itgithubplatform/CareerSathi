import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

/**
 * Create (or reuse) a chat session for a user.
 * If you already have a sessionId, skip calling this.
 */
export async function createChatSession(userId: string, title = "New Chat") {
  const sessionRef = collection(db, "users", userId, "sessions");
  const newSession = await addDoc(sessionRef, {
    title,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(), // Add updatedAt on creation
  });
  return newSession.id; // sessionId
}

/**
 * Updates the title of a specific chat session.
 * Useful for setting the title after the first user message.
 */
export async function updateChatSessionTitle(
  userId: string,
  sessionId: string,
  title: string
) {
  const sessionDoc = doc(db, "users", userId, "sessions", sessionId);
  await updateDoc(sessionDoc, { title });
}


/**
 * Save a chat message inside a session.
 */
export async function saveChatMessage(
  userId:string,
  sessionId: string,
  role: "user" | "bot",
  text: string
) {
  const msgRef = collection(
    db,
    "users",
    userId,
    "sessions",
    sessionId,
    "messages"
  );
  await addDoc(msgRef, {
    role,
    text,
    timestamp: serverTimestamp(),
  });

  // Update the parent session "lastMessage" and "updatedAt" for sidebar previews
  const sessionDoc = doc(db, "users", userId, "sessions", sessionId);
  await setDoc(
    sessionDoc,
    {
      lastMessage: text,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
