import React, { useEffect, useState } from "react";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

// A hacker/decoder effect component
export function HyperText({
  text,
  className,
  style,
  duration = 800,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}) {
  const [displayText, setDisplayText] = useState<string[]>(() => text.split("").map(() => ""));
  
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((_, index) => {
          if (index < iterations) {
            return text[index];
          }
          if (text[index] === " " || text[index] === "\n") return text[index];
          return ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
        })
      );
      
      if (iterations >= text.length) {
        clearInterval(interval);
      }
      
      iterations += 1 / (duration / 50);
    }, 50);

    return () => clearInterval(interval);
  }, [text, duration]);

  // Handle new lines visually if needed, though this is primarily text
  return (
    <span className={className} style={style}>
      {displayText.map((char, i) => (
        char === "\n" ? <br key={i} /> : <span key={i}>{char}</span>
      ))}
    </span>
  );
}
