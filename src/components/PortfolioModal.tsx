import type { ArticleData } from "@/interfaces/article.interface.ts";
import { cn } from "@/lib/utils.ts";
import { DialogTitle } from "@radix-ui/react-dialog";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Button } from "./ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog.tsx";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.tsx";

export interface Props {
  data: ArticleData[];
  twoColumn?: boolean;
}

export default function PortfolioModal({ data, twoColumn }: Props) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const [project, setProject] = useState<ArticleData | null>(null);

  function chooseColor(i: number) {
    const roundedDvision = Math.floor(i / 3);

    const idxInRow = i - roundedDvision * 3;

    switch (idxInRow) {
      case 0:
        return "bg-cyan";
      case 1:
        return "bg-green";
      case 2:
        return "bg-accent";
    }
  }

  function chooseShadow(i: number) {
    const roundedDvision = Math.floor(i / 3);

    const idxInRow = i - roundedDvision * 3;

    switch (idxInRow) {
      case 0:
        return "shadow-cyan";
      case 1:
        return "shadow-green";
      case 2:
        return "shadow-accent";
    }
  }

  function OnClick(project: ArticleData, i: number) {
    setOpen((prev) => !prev);
    setProject(project);
    setColor(chooseShadow(i)!);
  }

  const pathname = window.location.pathname.split("/")[2];

  function getTabName(value: string) {
    switch (value) {
      case "zdjecia-360":
        return "360photo";
      case "packshoty":
        return "packshots";
      default:
        return null;
    }
  }

  return (
    <>
      <div
        id="portfolioCards"
        className={cn(
          !twoColumn ? "xl:grid-cols-3" : "",
          "grid w-full grid-cols-1 gap-10 py-14 md:grid-cols-2 xl:gap-10",
        )}
      >
        {data.map((project, i) => (
          <Card
            className="h-full p-1 hover:cursor-pointer lg:px-1"
            shadowcolor={chooseColor(i)}
            hover={true}
            key={i}
            onClick={() => OnClick(project, i)}
          >
            <CardContent className="relative flex h-[300px] w-full flex-col gap-5 p-0">
              <img
                className="h-full w-full rounded-[48px] object-cover"
                src={
                  import.meta.env.PUBLIC_STRAPI_URL +
                  project.attributes.thumbnail?.data.attributes.url
                }
                alt={
                  project.attributes.thumbnail?.data.attributes.alternativeText
                }
                width={project.attributes.thumbnail?.data.attributes.width}
                height={project.attributes.thumbnail?.data.attributes.height}
              />
              <div className="absolute left-0 top-0 h-full w-full rounded-[48px] bg-black/50"></div>
              <CardHeader>
                <CardTitle className="absolute bottom-6 left-6 right-6 font-semibold text-white lg:text-2xl">
                  {project.attributes.title}
                </CardTitle>
              </CardHeader>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={color}
          aria-describedby={project?.attributes.title}
        >
          <DialogHeader>
            <DialogTitle>{project?.attributes.title}</DialogTitle>
          </DialogHeader>
          <Tabs
            defaultValue={
              getTabName(pathname) ??
              (project?.attributes.url ? "360photo" : "packshots")
            }
          >
            <TabsList>
              {project?.attributes.url ? (
                <TabsTrigger value="360photo">Zdjęcia 360°</TabsTrigger>
              ) : null}
              {project?.attributes.images?.data ? (
                <TabsTrigger value="packshots">Packshoty</TabsTrigger>
              ) : null}
            </TabsList>
            {project?.attributes.url ? (
              <TabsContent value="360photo">
                <iframe
                  src={project?.attributes.url}
                  className="h-[500px] w-full lg:h-[800px]"
                ></iframe>
              </TabsContent>
            ) : null}
            {project?.attributes.images?.data ? (
              <TabsContent value="packshots">
                <Carousel className="flex w-full items-center justify-between">
                  <CarouselPrevious className="left-0" />
                  <CarouselContent>
                    {project.attributes.images.data.map((image) => (
                      <CarouselItem className="flex items-center justify-center">
                        <img
                          src={
                            import.meta.env.PUBLIC_STRAPI_URL +
                            image.attributes.url
                          }
                          className="h-[500px] lg:h-[800px]"
                          loading="lazy"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNext className="right-0" />
                </Carousel>
              </TabsContent>
            ) : null}
          </Tabs>

          <DialogFooter className="flex w-full flex-row justify-center sm:justify-center">
            <DialogClose asChild>
              <Button variant="secondary" className="w-24">
                Zamknij
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
