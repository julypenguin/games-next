"use client";

interface CircleProps {
    dataLabel: string,
    bg: string,
    width: string,
    height: string,
    zIndex: string,
    handleClick?: (evt: React.MouseEvent<HTMLElement>) => void,
}

export default function Circle(props: CircleProps) {
    const { dataLabel, bg, width, height, zIndex, handleClick } = props

    return (
        <div
            className={`cir ${width} ${height} rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${zIndex} ${bg === 'red' ? 'bg-red-archery' : 'bg-white'} active:brightness-[80%] duration-500 active:duration-0 before:content-[attr(data-label)] before:absolute before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:top-[20px]`}
            data-label={dataLabel}
            onClick={typeof handleClick === 'function' ? handleClick : undefined}
        ></div>
    )
}