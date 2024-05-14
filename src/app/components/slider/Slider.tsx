import { ICourse } from "@/app/types";
import { Carousel } from "flowbite-react";

const Slider = ({
  data,
  elementsPerSlide = 3,
}: {
  data: ICourse[];
  elementsPerSlide: number;
}) => {
  const formattedData = data.map((course) => ({
    id: course.id,
    image: course.image,
    title: course.title,
  }));

  const slides = [];
  for (let i = 0; i < formattedData.length; i += elementsPerSlide) {
    slides.push(
      <div key={i} className="flex justify-evenly space-x-4">
        {formattedData.slice(i, i + elementsPerSlide).map((course) => (
          <div
            key={course.id}
            style={{ width: `calc(100%/${elementsPerSlide})` }}
          >
            <img
              className="w-full h-full object-cover"
              src={course.image}
              alt={course.title}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel draggable={false} slideInterval={5000}>
        {slides.map((slide, index) => (
          <div key={index}>{slide}</div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
