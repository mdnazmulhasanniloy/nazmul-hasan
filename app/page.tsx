import { HomePage } from "@/components/home-page";
import { getPortfolioContent } from "@/lib/content";

export default async function Home() {
  const content = await getPortfolioContent();
  return <HomePage content={content}/>;
}
