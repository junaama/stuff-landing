"use client"
import { useState, useEffect } from "react"
import sticker1 from "../stickers/stuff.nyc/sticker1.svg"
import sticker2 from "../stickers/stuff.nyc/sticker2.svg"
import sticker3 from "../stickers/stuff.nyc/sticker3.svg"
import sticker4 from "../stickers/stuff.nyc/sticker4.svg"
import sticker5 from "../stickers/stuff.nyc/sticker5.svg"
import sticker6 from "../stickers/stuff.nyc/sticker6.svg"
import sticker7 from "../stickers/stuff.nyc/sticker7.svg"
import sticker8 from "../stickers/stuff.nyc/sticker8.svg"

const stickers = {
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  sticker7,
  sticker8,
}

interface CursorStickerProps {
  position: { x: number; y: number }
  stickerType?: keyof typeof stickers
}

export function CursorSticker({ position, stickerType = "sticker1" }: CursorStickerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`absolute pointer-events-none ${isVisible ? "sticker-bounce" : "opacity-0"}`}

      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isVisible ? "translate(-50%, -50%)" : "translate(-50%, -50%) scale(0)",
      }}
    >
      <img src={stickers[stickerType].src} alt={`${stickerType} sticker`}  />
    </div>
  )
}
