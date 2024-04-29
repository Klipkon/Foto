import type {ReactNode} from "react";

export interface ITitleProps {
    children: ReactNode;
    className: string;
}

export default function Title({children, className}: ITitleProps) {
    return (
        <h2 className={"text-2xl sm:text-4xl font-bold lg:leading-[3rem] " + className}>{children}</h2>
    )
}