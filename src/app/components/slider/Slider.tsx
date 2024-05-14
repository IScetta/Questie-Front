"use client";

import { ICourse } from "@/app/types";
import { Carousel } from "flowbite-react";
import Card from "../card/Card";

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
    description: course.description,
  }));

  const slides = [];
  for (let i = 0; i < formattedData.length; i += elementsPerSlide) {
    slides.push(
      <div key={i} className="flex items-center justify-around space-x-4">
        {formattedData.slice(i, i + elementsPerSlide).map((course) => (
          <Card
            key={course.id}
            title={course.title}
            body={course.description}
            imgUrl={course.image}
            buttonLink={`/courses/${course.id}`}
            buttonLabel="View Course"
            style={{
              width: `calc((100%/${elementsPerSlide}) - 1rem)`,
              alignSelf: "normal",
              display: "flex",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="h-96 w-full">
      <Carousel slideInterval={5000}>
        {slides.map((slide, index) => (
          <div key={index}>{slide}</div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
