"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useChatSessions(userId: string | undefined) {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;
    const sessionsRef = collection(db, "users", userId, "sessions");
    const q = query(sessionsRef, orderBy("updatedAt", "desc"), limit(10));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setSessions(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      },
      (err) => console.error("Error fetching conversations:", err)
    );

    return () => unsub();
  }, [userId]);

  return sessions;
}
