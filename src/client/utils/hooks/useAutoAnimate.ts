import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";

export default function useAutoAnimate<T extends HTMLElement>() {
  const parentRef = useRef<T | null>(null);
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
  return { parentRef };
}
