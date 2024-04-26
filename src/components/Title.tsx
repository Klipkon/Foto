import type {ReactNode} from "react";

export interface ITitleProps {
    children: ReactNode;
}

export default function Title({children}: ITitleProps) {
    return (
        <h2 className="text-2xl md:text-[40px] font-bold">{children}</h2>
    )
}