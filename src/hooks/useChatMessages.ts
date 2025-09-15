"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ChatMessage } from "@/types/chat";

export function useChatMessages(userId: string | undefined, sessionId: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !sessionId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const messagesRef = collection(db, "users", userId, "sessions", sessionId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data() as ChatMessage));
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching messages:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userId, sessionId]);

  return { messages, loading, setMessages };
}
