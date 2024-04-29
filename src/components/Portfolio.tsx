import Title from "@/components/Title.astro";

export interface IPortfolioProps {
    
}

export default function Portfolio({}: IPortfolioProps) {
    return (
        <div className="rounded-xl">
            <Title></Title>
        </div>
    )
}