"use client";

import { useRouter } from 'next/navigation';
import Cat from './cat/Cat'

export default function Template({ children }: { children: React.ReactNode }) {

    type game = {
        name?: string,
        path?: string,
    }

    const router = useRouter();

    const gameList: game[] = [
        {
            name: 'Snake',
            path: '/'
        },
        {
            name: 'Archery',
            path: '/archery'
        },
        {
            name: 'Memory',
            path: '/memory'
        },
    ]

    const getGame = (position: string) => {
        const thisPath = window.location.pathname
        return gameList.reduce((selectGame, game, idx): game => {
            if (game.path === thisPath) {
                if (position === 'right') {
                    return idx === gameList.length - 1 ? gameList[0] : gameList[idx + 1]
                } else {
                    return idx === 0 ? (gameList.at(-1) as game) : gameList[idx - 1]
                }
            }
            return selectGame
        }, {})
    }

    return (
        <div className='container lg:w-[1024px] md:w-[768px] sm:w-[600px] w-full flex flex-col '>
            <aside className="flex justify-end">
                <Cat />
            </aside>
            <main className='relative select-none lg:max-w-[834px] md:max-w-[578px] w-full flex-1 border-8 border-white-400/95 rounded-md -top-[95px] md:left-[60px] overflow-hidden bg-gray-700 active:border-white'>
                {children}
            </main>
            <div className='nextGame fixed left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden sm:block'>
                <div onClick={e => {
                    const path = getGame('left').path || '/'
                    router.push(path)
                }}>
                    <div
                        className="p-12 arrow is-right relative w-[60px] h-[60px] rotate-[135deg] cursor-pointer after:border-white after:border-b-solid after:border-b-[12px] after:border-r-solid after:border-r-[12px] after:content-[''] after:inline-block after:w-[60px] after:h-[60px] after:left-0 after:absolute after:top-0 after:rounded-tl-md active:scale-95"
                    />
                </div>
            </div>
            <div className='nextGame fixed right-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden sm:block'>
                <div onClick={e => {
                    const path = getGame('right').path || '/'
                    router.push(path)
                }}>
                    <div
                        className="p-12 arrow is-right relative w-[60px] h-[60px] rotate-[315deg] cursor-pointer after:border-white after:border-b-solid after:border-b-[12px] after:border-r-solid after:border-r-[12px] after:content-[''] after:inline-block after:w-[60px] after:h-[60px] after:left-0 after:absolute after:top-0 after:rounded-tl-md active:scale-95"
                    />
                </div>
            </div>
        </div>
    )
}