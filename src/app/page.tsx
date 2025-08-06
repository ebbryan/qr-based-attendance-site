"use client";

import TypographyH1 from "@/components/TypographyH1";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  // Create an array of objects that can navigate to staff dashboard, attendance app
  // const routes

  const cardRoutes = [
    { id: 1, title: "Attendance App", path: "/attendance-app" },
    { id: 2, title: "Login", path: "/login" },
  ];
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <TypographyH1 text="Test" />
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {cardRoutes.map((item, index) => (
            <CarouselItem key={index} className="pl-1 ">
              <div className="p-1">
                <Card
                  className="cursor-pointer"
                  onClick={() => console.log("CLICKED!!")}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{item.title}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
