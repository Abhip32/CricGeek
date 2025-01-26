import { NewsItem } from "@/types/news";
import Image from "next/image";

const NewsCard = ({ title, description, image, headline }: NewsItem) => {
    return (
	<div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
		<div className="w-full md:w-1/3 bg-white grid place-items-center">
			<img src={image} alt="tailwind logo" className="rounded-xl" />
        </div>
			<div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
				<div className="flex justify-between item-center">
					<p className="text-gray-500 font-medium hidden md:block">{title}</p>
				</div>
				<h5 className="font-black text-gray-800 md:text-3xl text-xl">{headline}</h5>
				<p className="md:text-lg text-gray-500 text-base">{description}</p>
			</div>
		</div>
    );
};

export default NewsCard;