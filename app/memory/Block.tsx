"use client";

import React, { useState, useEffect, useRef } from 'react'

export default function Block({
    idx,
    color = 'red',
    playBlock = { block: [0] },
    handleClick,
    canInput = false,
}: {
    idx: number,
    color: 'red' | 'yellow' | 'blue' | 'green',
    playBlock: { block: number[] },
    handleClick: () => void | undefined,
    canInput: boolean,
}) {
    const ADD = 'ADD'
    const REMOVE = 'REMOVE'
    const blockRef = useRef<HTMLDivElement>(null)
    const audioRef = useRef<HTMLAudioElement | null>(typeof Audio !== "undefined" ? new Audio(`https://awiclass.monoame.com/pianosound/set/${idx}.wav`) : null)

    const getColorClassList = (): string[] => {
        switch (color) {
            case 'red':
                return ['bg-red-400', 'shadow-red-400']
            case 'yellow':
                return ['bg-yellow-400', 'shadow-yellow-400']
            case 'blue':
                return ['bg-blue-400', 'shadow-blue-400']
            case 'green':
                return ['bg-green-400', 'shadow-green-400']
            default:
                return ['bg-red-400', 'shadow-red-400']
        }
    }

    const handleClassList = (classList: string[], option: string): void => {
        const blockElm = blockRef.current
        if (!blockElm) return
        classList.forEach((cls) => {
            if (option === ADD) {
                blockElm.classList.add(cls)
            }
            if (option === REMOVE) {
                blockElm.classList.remove(cls)
            }
        })
    }

    const handleTimeout = (classList: string[]): void => {
        setTimeout(() => {
            handleClassList(classList, REMOVE)
        }, 200);
    }

    const flash = () => {
        let colorList: string[] = getColorClassList()
        if (!audioRef.current) return
        audioRef.current.currentTime = 0
        audioRef.current.play()

        handleClassList(colorList, ADD)
        handleTimeout(colorList)
    }

    let lightColor = ''

    switch (color) {
        case 'red':
            lightColor = 'shadow-red-400/20 border-red-400 ' + (canInput ? 'hover:bg-red-400/30 hover:shadow-red-400/30  active:bg-red-400 active:shadow-red-400 active:text-black' : '')
            break;
        case 'yellow':
            lightColor = 'shadow-yellow-400/20 border-yellow-400 ' + (canInput ? 'hover:bg-yellow-400/30 hover:shadow-yellow-400/30 active:bg-yellow-400 active:shadow-yellow-400 active:text-black' : '')
            break;
        case 'blue':
            lightColor = 'shadow-blue-400/20 border-blue-400 ' + (canInput ? 'hover:bg-blue-400/30 hover:shadow-blue-400/30 active:bg-blue-400 active:shadow-blue-400 active:text-black' : '')
            break;
        case 'green':
            lightColor = 'shadow-green-400/20 border-green-400 ' + (canInput ? 'hover:bg-green-400/30 hover:shadow-green-400/30 active:bg-green-400 active:shadow-green-400 active:text-black' : '')
            break;
        default:
            break;
    }

    useEffect(() => {
        if (playBlock.block.includes(idx)) {
            flash()
        }
    }, [playBlock])

    return (
        <>
            <div
                className={`m-4 block1 w-[150px] h-[150px] border flex justify-center items-center duration-500 cursor-pointer active:duration-0 active:delay-0 shadow-halo ${lightColor}`}
                ref={blockRef}
                onClick={e => typeof handleClick === 'function' && handleClick()}
            />
        </>

    )
}
