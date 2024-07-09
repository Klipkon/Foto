import type {
  ArticleData,
  CategoryData,
} from "@/interfaces/article.interface.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs.tsx";

export default function ArticlesCards({
  categories,
}: {
  articles: ArticleData[];
  categories: CategoryData[];
  portfolio?: boolean;
}) {
  function currentCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    return category ? category : "Wszystko";
  }

  function setCategoryInUrl(category: string) {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("category", category);

    window.location.search = urlParams.toString();
  }

  return (
    <Tabs defaultValue={currentCategory()}>
      <TabsList>
        {categories.map((category, i) => (
          <TabsTrigger
            key={i}
            value={category.attributes.name}
            onMouseDown={() => setCategoryInUrl(category.attributes.name)}
          >
            {category.attributes.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category, i) => (
        <TabsContent key={i} value={category.attributes.name}></TabsContent>
      ))}
    </Tabs>
  );
}
