import type {Card as ICard, TitleClass, Button as IButton} from "@/interfaces/page.ts";
import Description from "@/components/Description.tsx";
import Title from "@/components/Title.tsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button.tsx";

export interface ICardsSectionProps {
    title: TitleClass;
    description: string | null;
    cards: ICard[];
    buttons: IButton[];
}

export default function CardsSection({title, description, cards, buttons}: ICardsSectionProps) {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-8 md:gap-12 py-[100px]">
            <Title className="text-center">{title.content}</Title>
            <Description className="text-center">{description}</Description>
            <div className="w-full md:w-1/2 lg:w-full grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-10">
                {cards.map(card => (
                    <Card key={card.id} className={(card.highlighted ? "shadow-[0_5px_50px_0_rgba(0,0,0,0.25)]" : "shadow-none") + " p-6 lg:p-8 border-none bg-transparent"}>
                        <CardContent className="flex flex-col justify-beetwen items-start p-0 gap-5 md:gap-6">
                            <img className="w-full rounded-lg" src={import.meta.env.STRAPI_URL + card.image.data.attributes.url} alt="" />
                            <CardTitle className="font-bold text-2xl lg::text-4xl">{card.title}</CardTitle>
                            <CardDescription className="text-base text-black">{card.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="pt-5 md:t-10">
                {buttons.map(button => (
                    <Button key={button.id} variant={button.variant}>{button.content}</Button>
                ))}
            </div>
        </div>
    )
}