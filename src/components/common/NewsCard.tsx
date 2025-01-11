import { NewsItem } from "@/types/news";
import Image from "next/image";

const NewsCard = ({ title, description, image, headline }: NewsItem) => {
    return (
        <article className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 w-full">
            {/* Image Section */}
            <div className="relative w-full h-48 sm:h-auto">
                <Image 
                    src={image} 
                    alt={title} 
                    className="object-cover w-full h-full"
                    fill
                    priority
                />
            </div>

            {/* Content Section */}
            <div className="sm:col-span-2 p-4 sm:p-6 flex flex-col justify-between">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{headline}</p>
                <p className="mt-4 text-sm text-gray-500 line-clamp-4">{description}</p>
            </div>
        </article>
    );
};

export default NewsCard;