import { useState, useEffect } from "react";

export default function useTypingEffect(text, speed = 30) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    if (!text) return; // nothing to type

    let index = 0;
    const interval = setInterval(() => {
      // Guard against out-of-range access and only append a valid character
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        // finished typing
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}
