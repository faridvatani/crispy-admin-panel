"use client";

import { useEffect, useRef } from "react";

/**
 * DigitalMatrix component renders a canvas with a digital rain effect,
 * similar to the "Matrix" movie. The effect is achieved by drawing 
 * characters falling down the screen in a loop.
 *
 * @component
 * @example
 * return (
 *   <DigitalMatrix />
 * )
 *
 * @returns {JSX.Element} A React component that renders a canvas with the digital rain effect.
 *
 * @remarks
 * - The component uses the `useRef` hook to reference the canvas element.
 * - The `useEffect` hook is used to set up the canvas dimensions, drawing context, and animation loop.
 * - The animation loop is implemented using `setInterval` to repeatedly draw characters on the canvas.
 * - The component also handles window resize events to adjust the canvas size accordingly.
 *
 * @dependencies
 * - React
 * - useRef
 * - useEffect
 */
export default function DigitalMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const CANVAS_WIDTH: number = window.innerWidth;
    const CANVAS_HEIGHT: number = window.innerHeight;
    const FONT_SIZE: number = 16;
    const FONT_STYLE: string = `${FONT_SIZE}px monospace`;
    const FILL_STYLE: string = "rgba(0, 0, 0, 0.05)";
    const TEXT_COLOR: string = "#7b39ed";
    const CHARACTERS: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const CHARACTERS_LENGTH: number = CHARACTERS.length;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = FONT_SIZE;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const characters = CHARACTERS;

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = FILL_STYLE;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = TEXT_COLOR;
      ctx.font = FONT_STYLE;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * CHARACTERS_LENGTH),
        );
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    const intervalId = setInterval(draw, 33);

    function handleResize() {
      if (!canvas) return;

      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
