import ImageSlider from "./ImageSlider";


export const Card = ({owner, imageUrl}) => {
    return (
        
        <div class="w-full rounded cursor-pointer overflow-hidden shadow-lg m-2 transform transition-transform duration-300 hover:scale-110">
            <ImageSlider images={imageUrl}/>
            <div class="px-6 py-4">
                <div class="font-regular text-xl mb-2">{owner}</div>
            </div>
        </div>
    );
}