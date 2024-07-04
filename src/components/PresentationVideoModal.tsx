import type {Video} from "../interfaces/page";
import {Button} from "@/components/ui/button.tsx";
import {PlayCircle} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";

export interface IHeroProps {
    video: Video;
}

export default function PresentationVideoDialog({video}: IHeroProps) {
    return (
         <Dialog>
            <DialogTrigger asChild>
                <Button className="card-width modalButton lg:w-64 absolute bottom-4 left-4 rounded-lg flex justify-center items-center gap-2 p-6" variant="outline"><PlayCircle /> Zobacz prezentacje</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Prezentacja</DialogTitle>
                </DialogHeader>
                <video className="aspect-video rounded-lg" src={import.meta.env.PUBLIC_STRAPI_URL + video.data.attributes.url} controls autoPlay></video>
            </DialogContent>
        </Dialog>
    )
}
