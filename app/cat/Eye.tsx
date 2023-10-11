export default function TailSegment({
    position,
}: {
    position: string,
}) {

    const eyeClassname = position === 'right' ? 'float-left' : 'float-right'

    return (
        <div className={`eye left ${eyeClassname} relative w-[16px] h-[16px] rounded-full bg-white animate-[eyeBlink_6s_infinite] text-center`}>
            <div className="eye-pupil absolute top-1/4 left-1/4 h-1/2 w-1/5 bg-black rounded-full animate-[lookAround_6s_infinite] after:content-[''] after:absolute after:top-[30%] after:-right-[5%] after:h-1/5 after:w-[35%] after:rounded-full after:bg-white"></div>
        </div>
    )
}