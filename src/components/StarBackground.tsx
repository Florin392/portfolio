import { memo, useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const STAR_COUNT = 100;
const DEBOUNCE_DELAY_MS = 250;

export const StarBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let resizeTimeout: ReturnType<typeof setTimeout>;
    let stars: Star[] = [];

    // Create stars
    const createStars = (): void => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      }));
    };

    // Set canvas size
    const setCanvasSize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recreate stars when resize happens
      createStars();
    };

    const drawStar = (star: Star): void => {
      //Apply glow only to larger stars, reset immediately to avoid bleed
      if (star.size > 1.5) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();

      // Reset shadow so it doesn't bleed to other stars
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
    };

    const updateStar = (star: Star): void => {
      star.x += star.speedX;
      star.y += star.speedY;

      // Wrap around edges
      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;
    };

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        updateStar(star);
        drawStar(star);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = (): void => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, DEBOUNCE_DELAY_MS);
    };

    setCanvasSize();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
      aria-hidden="true"
    />
  );
});
