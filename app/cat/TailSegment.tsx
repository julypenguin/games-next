export default function TailSegment({
    children,
  }: {
    children?: React.ReactNode
  }) {
    return (
        <div className="tail-segment relative bg-orange-400 h-[20px] w-[30px] rounded-[25px] top-0 left-[10px] animate-[tailSwish_6s_infinite_cubic-bezier(.8,0,.2,1)]">{children}</div>
    )
}