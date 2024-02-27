import { useEffect, useRef, useState } from "react";

export default function XWonAnm({ lastRoundWinner, hasRoundFinished }) {
  const animRef = useRef();
  const textRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const animate = () => {
    console.log("animate called");
    // Adjust these calculations as necessary for the desired effect
    const newOpacity = Math.max(0, 1 - 0.007 * activeIndexRef.current);
    const newScale = 0.0045 * activeIndexRef.current + 1;
    console.log("new opacity: " + newOpacity);
    console.log("new scale: " + newScale);

    if (textRef.current) {
      textRef.current.style.opacity = `${newOpacity}`;
      textRef.current.style.transform = `scale(${newScale})`;
    }

    if (newOpacity > 0) {
      setActiveIndex((n) => n + 1);
      animRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    console.log("useeffect called");

    if (hasRoundFinished) {
      animRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
      setActiveIndex(0); // Reset activeIndex when round finishes
    };
  }, [hasRoundFinished]); // Re-run animation when these values change

  if (!hasRoundFinished) return null;

  let text = "";
  if (lastRoundWinner === "tie") {
    text = "TIE";
  } else if (lastRoundWinner === "player") {
    text = "YOU WON";
  } else {
    text = "COMPUTER WON";
  }

  return (
    <div className="xwonDiv">
      <h1 ref={textRef} className="frAnm">
        {text}
      </h1>
    </div>
  );
}