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
      <div key={i} className="flex items-center justify-around space-x-4">
        {formattedData.slice(i, i + elementsPerSlide).map((course) => (
          <Card
            key={course.id}
            title={course.title}
            body={course.description}
            imgUrl={course.image}
            buttonLink={`${cardButtonLink}/${course.id}`}
            buttonLabel={cardButtonLabel}
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
    <div className="w-full h-[26rem]">
      <Carousel slideInterval={5000}>
        {slides.map((slide, index) => (
          <div key={index}>{slide}</div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
