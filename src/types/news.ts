export interface NewsItem {
  id?: string | number;
  title: string;
  description: string;
  dateTime?: string;
  author?: string;
  image: string;
  link?: string;
  // Backward compatibility alias properties
  headline?: string;
  news_title?: string;
  news_content?: string;
  news_img?: string;
  news_headline?: string;
}
