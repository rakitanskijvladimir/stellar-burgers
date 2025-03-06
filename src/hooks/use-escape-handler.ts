import { useEffect } from "react";

export default function useEscapeHandler(callback: () => void): void {
  useEffect(() => {
    const onKeyPress = (event: KeyboardEvent): void => {
      if (event.code === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [callback]);
}
