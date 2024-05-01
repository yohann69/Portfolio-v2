"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

export function ImageGrid() {
    return (
        <div className="h-screen w-full">
            <LayoutGrid cards={cards} />
        </div>
    );
}

const SkeletonOne = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">House in the woods</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A serene and tranquil retreat, this house in the woods offers a peaceful
                escape from the hustle and bustle of city life.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">House above the clouds</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Perched high above the world, this house offers breathtaking views and a
                unique living experience. It&apos;s a place where the sky meets home,
                and tranquility is a way of life.
            </p>
        </div>
    );
};
const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">Greens all over</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
                perfect place to relax, unwind, and enjoy life.
            </p>
        </div>
    );
};
const SkeletonFour = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">Rivers are serene</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A house by the river is a place of peace and tranquility. It&apos;s the
                perfect place to relax, unwind, and enjoy life.
            </p>
        </div>
    );
};

const cards = [
    {
        id: 1,
        content: <SkeletonOne />,
        className: "md:col-span-2",
        thumbnail:
            "/img/20230808-IMG_20230808_211518.jpg",
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        className: "col-span-3",
        thumbnail:
            "/img/20230814-IMG_8855.jpg",
    },
    {
        id: 3,
        content: <SkeletonThree />,
        className: "col-span-1",
        thumbnail:
            "/img/20231227-1703677579054.jpg",
    },
    {
        id: 4,
        content: <SkeletonFour />,
        className: "md:col-span-3",
        thumbnail:
            "/img/20240226-IMG_0720.jpg",
    },
    {
        id: 5,
        content: <SkeletonFour />,
        className: "col-span-1",
        thumbnail:
            "/img/20240225-IMG_0284.jpg",
    },
    {
        id: 6,
        content: <SkeletonFour />,
        className: "md:col-span-2",
        thumbnail:
            "/img/20240328-IMG_1299.jpg",
    },
    {
        id: 7,
        content: <SkeletonFour />,
        className: "md:col-span-2",
        thumbnail:
            "/img/20240117-IMG_0140.jpg",
    },
    {
        id: 8,
        content: <SkeletonFour />,
        className: "md:col-span-3",
        thumbnail:
            "/img/20240224-IMG_20240224_181005.jpg",
    },
    {
        id: 9,
        content: <SkeletonFour />,
        className: "col-span-1",
        thumbnail:
            "/img/20240414-IMG_20240414_155553.jpg" +
            "",
    },
    {
        id: 10,
        content: <SkeletonFour />,
        className: "md:col-span-1",
        thumbnail:
            "/img/20240322-IMG_20240322_200501.jpg",
    },
    {
        id: 11,
        content: <SkeletonFour />,
        className: "md:col-span-2",
        thumbnail:
            "/img/20231104-IMG_20231104_122339.jpg",
    },
    {
        id: 12,
        content: <SkeletonFour />,
        className: "md:col-span-1",
        thumbnail:
            "/img/20240225-IMG_20240225_164323.jpg",
    },
    {
        id: 13,
        content: <SkeletonFour />,
        className: "md:col-span-2",
        thumbnail:
            "/img/20240227-IMG_0846.jpg",
    },
];

