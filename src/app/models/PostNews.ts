import { ArticlesNews } from "./ArticlesNews";

export interface PostNews {
  articles: ArticlesNews[],
  status: string,
  totalResults:number
}
