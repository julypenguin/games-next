"use client";

import React, { useState, useEffect, useRef } from 'react'
import Circle from './Circle'

interface Spots {
  x: number,
  y: number,
}

export default function Archery() {
  const [score, setScore] = useState<number>(0)
  const [pageX, setPageX] = useState<number>(0)
  const [pageY, setPageY] = useState<number>(0)
  const [spotList, setSpotList] = useState<Spots[]>([])

  const targetRef = useRef<HTMLDivElement>(null)
  const mouseSymbolRef = useRef<HTMLDivElement>(null)

  const handleClick = (evt: React.MouseEvent<HTMLElement>): void => {
    const attributes = Array.from((evt.target as HTMLElement).attributes)
    const dataLabel = attributes.reduce((value, attr): number => {
      if (attr.name.includes('data-label')) {
        return Number(attr.value) || 0
      }
      return value
    }, 0)
    const newScore = score + (dataLabel * 10)
    setScore(newScore)
  }

  const addSpot = (evt: React.MouseEvent<HTMLElement>): void => {
    const targetElm = targetRef.current
    if (!!targetElm) {
      const targetRect = targetElm.getBoundingClientRect()
      const x = pageX - targetRect.left
      const y = pageY - targetRect.top
      setSpotList([...spotList, { x, y }])
    }
  }

  const resetGame = (): void => {
    setScore(0)
    setSpotList([])
    const targetElm = targetRef.current
    if (!!targetElm) {
      targetElm.classList.remove('animate-[moving_1s_infinite_alternate]')
    }
  }

  useEffect(() => {
    window.onkeydown = (evt) => {
      if (evt.key.toLowerCase() === 'r') {
        resetGame()
      }
      if (evt.key.toLowerCase() === 'k' && !!targetRef.current) {
        targetRef.current.classList.toggle('animate-[moving_1s_infinite_alternate]')
      }
    }

    window.onmousemove = (evt) => {
      const mainElm = document.querySelector('main')

      if (!mainElm) return
      const mainRect = mainElm.getBoundingClientRect()
      const x = evt.pageX
      const y = evt.pageY
      const isLeftLimit = x < mainRect.left
      const isTopLimit = y < mainRect.top
      const isRightLimit = x > mainRect.left + mainRect.width
      const isBottomLimit = y > mainRect.top + mainRect.height
      setPageX(x)
      setPageY(y)

      const mouseSymbolElm = mouseSymbolRef.current
      if (!mouseSymbolElm) return

      if (isLeftLimit || isTopLimit || isRightLimit || isBottomLimit) {
        mouseSymbolElm.classList.remove('block')
        mouseSymbolElm.classList.add('hidden')
      } else {
        mouseSymbolElm.classList.remove('hidden')
        mouseSymbolElm.classList.add('block')

        mouseSymbolElm.style.left = x + 'px'
        mouseSymbolElm.style.top = y + 'px'
      }
    }
  }, [])

  return (
    <>
      <div className='infos fixed left-[50px] top-[50px] z-[10] font-bold select-none text-white'>
        <h1 className='score text-5xl'>Score: {score}</h1>
        <h3 className='explain text-lg opacity-80'>重新開始 R, 變換模式 K</h3>
      </div>
      <div
        className='target absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        ref={targetRef}
        onClick={addSpot}
      >
        <Circle
          dataLabel="5"
          bg="red"
          width="w-100px"
          height="h-100px"
          zIndex="z-5"
          handleClick={handleClick}
        />
        <Circle
          dataLabel="4"
          bg="white"
          width="w-200px"
          height="h-200px"
          zIndex="z-4"
          handleClick={handleClick}
        />
        <Circle
          dataLabel="3"
          bg="red"
          width="w-300px"
          height="h-300px"
          zIndex="z-3"
          handleClick={handleClick}
        />
        <Circle
          dataLabel="2"
          bg="white"
          width="w-400px"
          height="h-400px"
          zIndex="z-2"
          handleClick={handleClick}
        />
        <Circle
          dataLabel="1"
          bg="red"
          width="w-500px"
          height="h-500px"
          zIndex="z-1"
          handleClick={handleClick}
        />
        {spotList.map((spot, idx) => (
          <div key={idx} className='spot absolute w-[15px] h-[15px] rounded-full bg-gray-700 opacity-40 z-50 pointer-events-none' style={{ left: spot.x, top: spot.y }} />
        ))}
      </div>
      <div
        className="fixed hidden mouseSymbol pointer-events-none z-100 before:content-[''] before:block before:w-[40px] before:h-[8px] before:bg-gray-700 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 after:content-[''] after:block after:w-[40px] after:h-[8px] after:bg-gray-700 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-90"
        ref={mouseSymbolRef}
      />
    </>
  )
}
