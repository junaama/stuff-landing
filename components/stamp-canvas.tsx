"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CursorSticker } from "./cursor-sticker"
import sticker1 from "../stickers/stuff.nyc/sticker1.svg"
import sticker2 from "../stickers/stuff.nyc/sticker2.svg"
import sticker3 from "../stickers/stuff.nyc/sticker3.svg"
import sticker4 from "../stickers/stuff.nyc/sticker4.svg"
import sticker5 from "../stickers/stuff.nyc/sticker5.svg"
import sticker6 from "../stickers/stuff.nyc/sticker6.svg"
import sticker7 from "../stickers/stuff.nyc/sticker7.svg"
import sticker8 from "../stickers/stuff.nyc/sticker8.svg"

const stickerAssets = {
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  sticker7,
  sticker8,
}

type Sticker = {
  id: number
  x: number
  y: number
  stickerType: keyof typeof stickerAssets
}

export function StampCanvas() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [placedStickers, setPlacedStickers] = useState<Sticker[]>([])
  const [currentStickerIndex, setCurrentStickerIndex] = useState(0)
  const [isOverForm, setIsOverForm] = useState(false)
  const [cursorScale, setCursorScale] = useState(1)

  const stickerTypes = Object.keys(stickerAssets) as Array<keyof typeof stickerAssets>
  const currentStickerType = stickerTypes[currentStickerIndex]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })

      // Check if mouse is over form elements
      const target = e.target as HTMLElement
      const isFormElement =
        target.tagName === "INPUT" ||
        target.tagName === "BUTTON" ||
        target.tagName === "LABEL" ||
        target.closest("form") !== null

      setIsOverForm(isFormElement)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    // Don't add stickers when clicking on form elements
    if (isOverForm) return

    // Add a new sticker at the click position
    setPlacedStickers([
      ...placedStickers,
      {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        stickerType: currentStickerType,
      },
    ])

    // Animate cursor on click
    setCursorScale(0.8)
    setTimeout(() => setCursorScale(1), 100)

    setCurrentStickerIndex((currentStickerIndex + 1) % stickerTypes.length)
  }

  return (
    <div className={isOverForm ? "absolute inset-0" : "absolute inset-0 cursor-none"} onClick={handleClick}>
      {/* Render all placed stickers */}
      {placedStickers.map((sticker) => (
        <CursorSticker 
          key={sticker.id} 
          position={{ x: sticker.x, y: sticker.y }} 
          stickerType={sticker.stickerType}
        />
      ))}

      {/* Custom cursor - only show when not over form elements */}
      {!isOverForm && (
        <div
          // className="fixed z-50 pointer-events-none"
          className="fixed z-50 pointer-events-none transition-transform duration-100"

          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            // transform: "translate(-50%, -50%)",
            transform: `translate(-50%, -50%) scale(${cursorScale})`,

          }}
        >
          <img src={stickerAssets[currentStickerType].src} alt="sticker"  />


        </div>
      )}
    </div>
  )
}
