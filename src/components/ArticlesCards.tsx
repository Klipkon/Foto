import type { ArticleData, CategoryData } from "@/interfaces/article.interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardTitle } from "./ui/card";
import { filterArticlesByCategory, titleToSlug } from "@/lib/utils";

export default function ArticlesCards({ articles, categories}: { articles: ArticleData[], categories: CategoryData[]}) {
    console.log(articles, categories);

    return (
        <Tabs defaultValue="Wszystko">
            <TabsList>
            {
                categories.map((category, i) => (
                    <TabsTrigger key={i} value={category.attributes.name}>{category.attributes.name}</TabsTrigger>
                ))
            }
            </TabsList>
            {
                categories.map((category, i) => (
                    <TabsContent key={i} value={category.attributes.name}>
                        <div id="cardsContainer" className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-10 pt-14">
                        {
                            filterArticlesByCategory(articles, category.attributes.name).map((article, i) => (
                                <a key={article.id} href={"/blog/" + titleToSlug(article.attributes.title)} className="group">
                                    <Card className="p-6 lg:p-8 border-none shadow-none bg-secondary h-full">
                                        <CardContent className="flex flex-col justify-beetwen items-start p-0 gap-5 md:gap-6">
                                            <img className="w-full rounded-lg max-h-[302px]" src={import.meta.env.PUBLIC_STRAPI_URL + article.attributes.image.data.attributes.formats.thumbnail.url} alt="" width={article.attributes.image.data.attributes.formats.thumbnail.width} height={article.attributes.image.data.attributes.formats.thumbnail.height} loading="eager" />
                                            <CardTitle className="font-semibold text-lg sm:text-2xl">{article.attributes.title}</CardTitle>
                                        </CardContent>
                                    </Card>
                                </a>
                            ))
                        }
                        </div>
                    </TabsContent>
                ))
            }
        </Tabs>
    )
}


