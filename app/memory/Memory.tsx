"use client";

import React, { useState, useEffect, useRef } from 'react'
import Block from './Block'

export default function Memory() {
    const WAITING = 'waiting'
    const GAMEPLAY = 'gamePlay'
    const USERINPUT = 'userInput'
    const [correctSoundSets, setCorrectSoundSets] = useState<(HTMLAudioElement | null)[]>([])
    const [wrongSoundSets, setWrongSoundSets] = useState<(HTMLAudioElement | null)[]>([])
    const [currentLevel, setCurrentLevel] = useState<number>(0)
    const [playBlock, setPlayBlock] = useState<{ block: number[] }>({ block: [0] }) // 控制閃爍
    const [mode, setMode] = useState<string>(WAITING)
    const [userInput, setUserInput] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [showMessage, setshowMessage] = useState<string>('Level ' + currentLevel)
    const [tempString, setTempString] = useState<string>('')
    const [statusColor, setStatusColor] = useState<string>('bg-white')
    const [isStart, setIsStart] = useState<boolean>(false)

    const playInterval = 400
    const answerList = answer.split('')

    const getAudioObject = (pitch: number): HTMLAudioElement | null => {
        const audio = typeof Audio !== "undefined" ? new Audio(`https://awiclass.monoame.com/pianosound/set/${pitch}.wav`) : null
        if (!!audio) {
            audio.setAttribute("preload", "auto")
        }
        return audio
    }

    // 播放正確或錯誤聲音
    const playSets = (soundSets: (HTMLAudioElement | null)[]) => {
        if (!!soundSets) {
            soundSets.forEach(audio => {
                if (!!audio) {
                    audio.currentTime = 0
                    audio.play()
                }
            });
        }
    }

    const getLevelData = (currentLevel: number): string => {
        let levelData = ''
        const difficulty = currentLevel + 2
        for (let i = 0; i < difficulty; i++) {
            levelData = levelData + Math.ceil(Math.random() * 4)
        }
        return levelData
    }

    // 開始特定 level 遊戲
    const startLevel = (currentLevel: number) => {
        const levelData = getLevelData(currentLevel)
        startGame(levelData)
        setshowMessage('Level ' + currentLevel)
        setStatusColor('bg-white')
    }

    // 遊戲開始
    const startGame = (answer: string) => {
        setMode(GAMEPLAY)
        setAnswer(answer)
        setTempString('')
        const notes = answer.split('')
        const timer = setInterval(() => {
            let chart = notes.shift()
            setPlayBlock({ block: [Number(chart)] })
            if (!notes.length) {
                startUserInput()
                clearInterval(timer)
            }
        }, playInterval)
    }

    // 開始輸入
    const startUserInput = () => {
        setUserInput('')
        setMode(USERINPUT)
    }

    // 輸入答案的結果
    const userSendInput = (inputChar: string) => {
        if (mode === USERINPUT) {
            let newTempString = userInput + inputChar
            setTempString(newTempString)
            setPlayBlock({ block: [Number(inputChar)] })
            if (answer.indexOf(newTempString) === 0) {
                if (answer === newTempString) {
                    const newCurrentLevel = currentLevel + 1
                    setshowMessage('Correct')
                    setCurrentLevel(newCurrentLevel)
                    setMode(WAITING)
                    setStatusColor('bg-blue-400')
                    setTimeout(() => {
                        turnAllOn()
                        playSets(correctSoundSets)
                    }, 500);
                    setTimeout(() => {
                        startLevel(newCurrentLevel)
                    }, 1000);
                }
            } else {
                setshowMessage('Wrong')
                setCurrentLevel(0)
                setMode(WAITING)
                setStatusColor('bg-red-400')
                setTimeout(() => {
                    turnAllOn()
                    playSets(wrongSoundSets)
                }, 500);
                setTimeout(() => {
                    startLevel(0)
                }, 1000);
            }
            setUserInput(newTempString)
        }
    }

    const turnAllOn = () => {
        setPlayBlock({ block: [1, 2, 3, 4] })
    }

    useEffect(() => {
        const correct = [1, 3, 5, 8]
        const wrong = [2, 4, 5.5, 7]

        const newCorrectSoundSets = correct.map((pitch) => getAudioObject(pitch))
        const newWrongSoundSets = wrong.map((pitch) => getAudioObject(pitch))

        setCorrectSoundSets(newCorrectSoundSets)
        setWrongSoundSets(newWrongSoundSets)

    }, [])

    return (
        <div className='game h-full relative bg-gray-700 flex justify-center items-center'>
            <div className="infos text-white absolute left-[40px] top-[40px]">
                <h1 className='text-5xl tracking-wide leading-tight font-bold'>Memory
                    <br />
                    Blocks
                </h1>
                <h3 className="status text-2xl mt-4 font-medium text-red-600">{showMessage}</h3>
            </div>
            <div className="blocks text-white relative top-20">
                <div className="row flex">
                    <Block
                        idx={1}
                        color='red'
                        playBlock={playBlock}
                        handleClick={() => userSendInput('1')}
                        canInput={mode === USERINPUT}
                    ></Block>
                    <Block
                        idx={2}
                        color='yellow'
                        playBlock={playBlock}
                        handleClick={() => userSendInput('2')}
                        canInput={mode === USERINPUT}
                    ></Block>
                </div>
                <div className="row flex">
                    <Block
                        idx={3}
                        color='blue'
                        playBlock={playBlock}
                        handleClick={() => userSendInput('3')}
                        canInput={mode === USERINPUT}
                    ></Block>
                    <Block
                        idx={4}
                        color='green'
                        playBlock={playBlock}
                        handleClick={() => userSendInput('4')}
                        canInput={mode === USERINPUT}
                    ></Block>
                </div>
                <div className="row flex">
                    <div className={`inputStatus mt-2 ml-2`}>
                        {answerList.map((ans, i) => (
                            <div
                                key={i}
                                className={`circle inline-block m-2 w-2 h-2 rounded-full ${i < tempString.length ? 'correct opacity-100' : 'opacity-30'} ${statusColor}`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={`startCheck absolute inset-0 bg-gray-700 flex justify-center items-center flex-col duration-300 ${!isStart ? '' : 'opacity-0 pointer-events-none'}`}
            >
                <div className='p-8 mb-40 text-5xl text-white font-bold'>Memory Blocks</div>
                <div
                    className='px-4 py-2 text-yellow-400 text-4xl border border-yellow-400 rounded-lg cursor-pointer shadow-halo shadow-yellow-400/20 hover:bg-yellow-500 hover:text-white hover:shadow-yellow-400/60 active:scale-95'
                    onClick={() => {
                        setIsStart(true)
                        startLevel(currentLevel)
                    }}
                >開始遊戲</div>
            </div>
        </div>
    )
}
