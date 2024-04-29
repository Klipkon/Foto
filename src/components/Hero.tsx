import type {Button as IButton, Image, Video} from "../interfaces/page";
import Title from "@/components/Title.tsx";
import Description from "@/components/Description.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Play, PlayCircle} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {useState} from "react";

export interface IHeroProps {
    image: Image;
    description: string;
    title: string;
    buttons: IButton[]
    video: Video;
}

export default function Hero({ image, description, buttons, title, video}: IHeroProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
        <div className="flex flex-col items-center justify-center lg:flex-row" style={{height: "calc(100vh - 80px)"}}>
           <div className="flex justify-center items-center lg:justify-start w-full lg:w-auto lg:bg-secondary lg:p-8 xl:p-11 lg:rounded-l-xl z-10">
               <div className="lg:justify-start w-full md:w-3/4 flex flex-col justify-center items-center lg:items-start gap-[25px] lg:gap-[40px] lg:max-w-[400px]">
                   <Title className="xl:text-5xl xl:leading-[4rem] text-center lg:text-left">{title}</Title>
                   <Description className="text-center lg:text-left">{description}</Description>
                   {buttons.map(button => (
                       <Button key={button.id} variant={button.variant} className="w-full md:w-3/4 lg:w-40">{button.content}</Button>
                   ))}
               </div>
           </div>
            <div className="mt-10 lg:mt-0 w-full flex items-center justify-center lg:justify-start max-h-[700px] max-w-[657px] z-20 relative">
                <img className="shadow-[0_5px_100px_0_rgba(0,0,0,0.25)] rounded-xl w-100 w-full" src={import.meta.env.PUBLIC_STRAPI_URL + image.data.attributes.formats.small.url} alt="" />
                <Button className="card-width lg:w-64 absolute bottom-4 left-4 rounded-lg flex justify-center items-center gap-2 p-6" variant="outline" onClick={() => setIsDialogOpen(prev => !prev)}><PlayCircle /> Zobacz prezentacje</Button>
            </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(prev => !prev)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Prezentacja</DialogTitle>
                </DialogHeader>
                <video className="aspect-video rounded-lg" src={import.meta.env.PUBLIC_STRAPI_URL + video.data.attributes.url} controls autoPlay></video>
            </DialogContent>
        </Dialog>
        </>
    )
}
