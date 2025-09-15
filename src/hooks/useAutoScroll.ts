"use client";
import { useEffect, useRef } from "react";

export function useAutoScroll(deps: any[]) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, deps);

  return ref;
}
