import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const sparkleTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create sparkle
      if (sparkleTimeoutRef.current) {
        clearTimeout(sparkleTimeoutRef.current);
      }

      sparkleTimeoutRef.current = window.setTimeout(() => {
        createSparkle(e.clientX, e.clientY);
      }, 50);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 800);
    };

    const animateCursor = () => {
      // Smooth cursor movement with easing
      const ease = 0.15;
      const dotEase = 0.3;

      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;
      dotX += (mouseX - dotX) * dotEase;
      dotY += (mouseY - dotY) * dotEase;

      if (cursor) {
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
      }
      if (dot) {
        dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      }

      requestAnimationFrame(animateCursor);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    animateCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      if (sparkleTimeoutRef.current) {
        clearTimeout(sparkleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? "hover" : ""}`}
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHovering ? "hover" : ""}`}
      />
    </>
  );
}
