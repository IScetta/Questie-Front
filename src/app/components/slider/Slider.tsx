"use client";

import { ICourse } from "@/app/types";
import { Carousel } from "flowbite-react";
import Card from "../card/Card";

const Slider = ({
  data,
  elementsPerSlide = 3,
  cardButtonLink,
  cardButtonLabel,
}: {
  data: ICourse[];
  elementsPerSlide: number;
  cardButtonLink: string;
  cardButtonLabel: string;
}) => {
  const formattedData = data.map((course) => ({
    id: course.id,
    image: course.image,
    title: course.title,
    description: course.description,
  }));

  const slides = [];
  for (let i = 0; i < formattedData.length; i += elementsPerSlide) {
    slides.push(
      <div
        key={i}
        className="flex items-center justify-around space-x-4 h-full"
      >
        {formattedData.slice(i, i + elementsPerSlide).map((course) => (
          <Card
            key={course.id}
            title={course.title}
            imgUrl={course.image}
            buttonLink={`${cardButtonLink}/${course.id}`}
            buttonLabel={"Ver Curso"}
            style={{
              width: `calc((100%/${elementsPerSlide}) - 1rem)`,
              height: "100%",
              margin: "1rem 0",
            }}
          >
            <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
              {course.description}
            </p>
          </Card>
        ))}
      </div>
    );
  }

/*   return (
    <div className="w-full h-[40rem] flex items-stretch bg-blue-gray-50">
      <Carousel slideInterval={5000}>
        {slides.map((slide, index) => (
          <div key={index} className="px-14">
            {slide}
          </div>
        ))}
      </Carousel>
    </div>
  ); */
};

export default Slider;
