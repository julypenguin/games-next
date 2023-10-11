interface Stars {
    count: number,
}

export default function Star({ count = 10 }: Stars) {


    const stars = (): number[] => {
        let startList: number[] = []
        for (let i = 1; i <= count; i++) {
            startList = [...startList, i]
        }
        return startList
    }

    return (
        <div className='allstars w-full h-full absolute left-0 top-0'>
            {stars().map(starNumber => (
                <div
                    key={starNumber}
                    className="star absolute bg-white w-[4px] h-[4px] rounded-full animate-[falling_2s_infinite]"
                    style={{
                        left: `${Math.floor(Math.random() * 100)}%`,
                        top: `${Math.floor(Math.random() * -80) + 70}%`,
                        animationDelay: `${starNumber * -0.1}s`
                    }}
                />
            ))}
        </div>
    )
}
