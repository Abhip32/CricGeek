import { NewsItem } from "@/types/news";
import Image from "next/image";

const NewsCard = ({ title, description, image, headline}: NewsItem) => {
    return (
        <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl p-4 sm:p-6 pb-6 sm:pb-8 pt-32 sm:pt-40 w-full h-[500px] shadow-lg transition-transform transform hover:scale-105">
            <Image 
                src={image} 
                alt={title} 
                className="absolute inset-0 h-full w-full object-cover object-top"
                fill
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/60 to-transparent"></div>
            <h3 className="relative z-10 mt-3 text-xl sm:text-2xl lg:text-3xl font-bold text-white line-clamp-2">{title}</h3>
            <div className="relative z-10 mt-2 text-sm leading-6 text-gray-300 line-clamp-3">{headline}</div>
        </article>
    );
}

export default NewsCard;
