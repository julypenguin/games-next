"use client";

import React, { useState, useEffect, useRef } from 'react'
import * as Tone from 'tone'

export default function Snake() {

    interface Vector {
        x: number,
        y: number,
    }

    interface Snake {
        body: Vector[],
        maxLength: number,
        head: Vector,
        speed: Vector,
        direction: string,
        nextDirection: string,
    }

    const bw = 10 // 格子寬度
    const bs = 2 // 格子間距
    const gameWidth = 40 // 總共有幾個格子( 40 * 40)
    const LEFT = 'Left'
    const RIGHT = 'Right'
    const UP = 'Up'
    const DOWN = 'Down'

    const [score, setScore] = useState<number>(0)

    const panelRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
    const snakeRef = useRef<Snake | null>(null)
    const foodsRef = useRef<Vector[]>([])
    const gameRef = useRef({ start: false })

    const playSound = (note: Tone.Unit.Frequency, volumn?: number, when?: number) => {
        setTimeout(() => {
            const synth = new Tone.Synth().toDestination()
            synth.volume.value = volumn || -12
            synth.triggerAttackRelease(note, "8n")
        }, when || 0);
    }

    const getPosition = (x: number, y: number) => {
        return {
            x: x * bw + (x - 1) * bs,
            y: y * bw + (y - 1) * bs,
        }
    }

    const drawBlock = (vector: Vector, color: string) => {
        const ctx = ctxRef.current
        if (!!ctx) {
            ctx.fillStyle = color
            const pos = getPosition(vector.x, vector.y)
            ctx.fillRect(pos.x, pos.y, bw, bw)
        }
    }

    const render = () => {
        const canvas = canvasRef.current
        const ctx = ctxRef.current
        const snake = snakeRef.current
        const foods = foodsRef.current
        if (!!canvas && !!ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            for (let x = 0; x < gameWidth; x++) {
                for (let y = 0; y < gameWidth; y++) {
                    drawBlock({ x, y }, "rgba(255, 255, 255, 0.03)")
                }
            }

            if (!!snake) {
                snake.body.forEach((snakePosition, i) => {
                    drawBlock(snakePosition, "white")
                });
            }

            if (!!foods) {
                foods.forEach((foodPosition, i) => {
                    drawBlock(foodPosition, "red")
                });
            }
            requestAnimationFrame(() => {
                render()
            })
        }
    }

    const checkBoundary = (gameWidth: number) => {
        const snake = snakeRef.current
        if (!snake) return
        let xInRange = 0 <= snake.head.x && snake.head.x < gameWidth
        let yInRange = 0 <= snake.head.y && snake.head.y < gameWidth
        return xInRange && yInRange
    }

    const resetSnake = () => {
        snakeRef.current = {
            body: [],
            maxLength: 5,
            head: vector(0, 20),
            speed: vector(1, 0),
            direction: RIGHT,
            nextDirection: '', // 避免蛇還沒更新卻連續按下多次方向鍵，導致原地死亡
        }
    }

    const direction = (dir: string): Vector => {
        const snake = snakeRef.current
        if (!snake) return vector(1, 0)
        if (!!snake.nextDirection) dir = snake.nextDirection
        switch (dir) {
            case UP:
                snake.nextDirection = UP
                return vector(0, -1)
            case DOWN:
                snake.nextDirection = DOWN
                return vector(0, 1)
            case LEFT:
                snake.nextDirection = LEFT
                return vector(-1, 0)
            case RIGHT:
                snake.nextDirection = RIGHT
                return vector(1, 0)
            default: return vector(1, 0)
        }
    }

    const setSnakeDirection = (dir: string) => {
        const snake = snakeRef.current
        if (!snake) return
        let target: Vector = direction(dir)

        const isReverse = equalVector(snake.speed, mulVector(target, -1))
        if (!isReverse) {
            snake.speed = target
        }

    }

    const updateSnake = () => {
        const snake = snakeRef.current
        if (!snake) return
        snake.body = [...snake.body, snake.head]
        snake.head = addVector(snake.head, snake.speed)
        snake.nextDirection = ''
        while (snake.body.length > snake.maxLength) {
            snake.body.shift()
        }
    }

    const updateGame = () => {
        const snake = snakeRef.current
        const foods = foodsRef.current
        const game = gameRef.current

        if (!snake || !foods) return
        if (!!game.start) {
            playSound("A2", -12)
            updateSnake()
            foods.forEach((food, i) => {
                const isEqual = equalVector(snake.head, food)
                if (isEqual) {
                    snake.maxLength++
                    foods.splice(i, 1)
                    generateFood()
                }
            })
            snake.body.forEach((bodyPosition) => {
                const isTouch = equalVector(snake.head, bodyPosition)
                if (!!isTouch) {
                    endGame()
                }
            });
            const isBoundary = checkBoundary(gameWidth)
            if (!isBoundary) {
                endGame()
            }
        }
        const speed = Math.sqrt(snake.body.length) + 5
        setTimeout(() => {

            updateGame()
        }, 1000 / speed);
    }

    const startGame = () => {
        clearFoods()
        generateFood()

        const panel = panelRef.current
        const game = gameRef.current
        game.start = true
        resetSnake()
        setScore(0)
        if (!panel) return
        panel.classList.remove('flex')
        panel.classList.add('hidden')
        playSound("C#5", -20)
        playSound("E5", -20, 200)
    }

    const endGame = () => {

        const snake = snakeRef.current
        const panel = panelRef.current
        const game = gameRef.current
        game.start = false
        if (!panel) return
        panel.classList.remove('hidden')
        panel.classList.add('flex')
        if (snake) {
            setScore(snake.maxLength - 5)
        }
        playSound("A3", -12)
        playSound("E2", -10, 200)
        playSound("A2", -10, 400)
    }

    const clearFoods = () => {
        foodsRef.current = []
    }

    const generateFood = () => {
        const x = Math.floor(Math.random() * gameWidth)
        const y = Math.floor(Math.random() * gameWidth)
        foodsRef.current = [...foodsRef.current, vector(x, y)]
        drawEffect(x, y)
        playSound("E5", -20)
        playSound("A5", -20, 50)
    }

    const vector = (x: number = 0, y: number = 0): Vector => {
        return { x, y }
    }

    const addVector = (vector1: Vector, vector2: Vector): Vector => {
        const x = vector1.x + vector2.x
        const y = vector1.y + vector2.y
        return { x, y }
    }

    const subVector = (vector1: Vector, vector2: Vector): Vector => {
        const x = vector1.x - vector2.x
        const y = vector1.y - vector2.y
        return { x, y }
    }

    const calcLength = (vector: Vector): number => {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
    }

    const setVector = (vector: Vector): Vector => {
        const x = vector.x
        const y = vector.y
        return { x, y }
    }

    const equalVector = (vector1: Vector, vector2: Vector): boolean => {
        return vector1.x === vector2.x && vector1.y === vector2.y
    }

    const mulVector = (vector: Vector, mulNumber: number): Vector => {
        const x = vector.x * mulNumber
        const y = vector.y * mulNumber
        return { x, y }
    }

    const drawEffect = (x: number, y: number) => {
        const ctx = ctxRef.current
        let r = 2
        const pos = getPosition(x, y)
        if (!!ctx) {
            const effect = () => {
                r++
                ctx.strokeStyle = `rgba(255, 0, 0, ${(100 - r) / 100})`
                ctx.beginPath()
                ctx.arc(pos.x + (bw / 2), pos.y + (bw / 2), r, 0, Math.PI * 2)
                ctx.stroke()

                if (r < 100) {
                    requestAnimationFrame(effect)
                }
            }
            requestAnimationFrame(effect)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!!canvas) {
            canvas.width = bw * gameWidth + bs * gameWidth - 1 // 40 格子有 39 間隙
            canvas.height = canvas.width

            ctxRef.current = canvas.getContext("2d")
            resetSnake()
            render()
            updateGame()

            window.onkeydown = (evt) => {
                setSnakeDirection(evt.key.replace("Arrow", ""))
            }
        }

    }, [])

    return (
        <div className='game h-full relative flex justify-center items-center bg-black'>
            <canvas
                className='border-[1px] border-black max-w-full'
                ref={canvasRef}
            />
            <div
                className='fixed text-white w-full h-full flex justify-center items-center flex-col'
                ref={panelRef}
            >
                <div className='text-4xl'>
                    <span className='px-2'>Score:</span>
                    <span>{score}</span>
                </div>
                <div className='mt-4 px-3 py-1 border border-white rounded-3xl cursor-pointer hover:text-black hover:bg-white' onClick={startGame}>Start Game</div>
            </div>
        </div>
    )
}
