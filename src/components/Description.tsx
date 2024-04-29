import type {ReactNode} from "react";

export interface ITitleProps {
    children: ReactNode;
    className: string;
}

export default function Description({children, className}: ITitleProps) {
    return (
        <p className={"text-sm md:text-base " + className}>{children}</p>
    )
}