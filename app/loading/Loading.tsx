"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react'

export default function Template() {

    const [loadingPercent, setLoadingPercent] = useState<number>(0)

    useEffect(() => {
        let percent = 0
        let timer = setInterval(() => {
            if (percent > 100) {
                clearInterval(timer)
                return
            }
            setLoadingPercent(percent)
            percent += 4
        }, 30)
    }, [])

    return (
        <div className={`pageLoading fixed w-full h-full left-0 top-0 flex justify-center items-center flex-col bg-cyan-700 transition-all duration-1000 z-[20] ${loadingPercent < 100 ? '' : 'opacity-0 pointer-events-none'}`}>
            <div className={`loading w-[200px] h-[10px] bg-white rounded-full overflow-hidden`}>
                <div className="bar h-full bg-orange-500" style={{ width: loadingPercent + '%' }} />
            </div>
        </div>
    )
}