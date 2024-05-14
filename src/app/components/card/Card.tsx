"use client";

import { Button, Card as FlowbiteCard } from "flowbite-react";

const Card = ({
  title,
  body,
  imgUrl,
  style,
  buttonLink,
  buttonLabel,
}: {
  title: string;
  body?: string;
  imgUrl: string;
  style?: { [key: string]: string };
  buttonLink?: string;
  buttonLabel?: string;
}) => {
  return (
    <FlowbiteCard className="max-w-sm my-4" style={style}>
      <div className="flex flex-col space-between h-full space-y-4">
        <div className="flex flex-col h-full space-y-4">
          <img className="w-full h-1/2 object-cover" src={imgUrl} alt={title} />
          <h5 className="text-xl font-bold tracking-tight text-gray-900 truncate">
            {title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 truncate">
            {body}
          </p>
        </div>
        <div>
          <div className="flex justify-end">
            {buttonLink && buttonLabel && (
              <a href={buttonLink}>
                <Button color="purple">{buttonLabel}</Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </FlowbiteCard>
  );
};

export default Card;
