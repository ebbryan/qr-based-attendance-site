"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "@bprogress/next/app";
import { ROUTES } from "@/constants/routes.enum";

const PageContent = () => {
  const router = useRouter();
  const cardRoutes = [
    { id: 1, title: "Attendance App", path: "#" },
    { id: 2, title: "Login", path: ROUTES.LOGIN },
  ];
  const onNavigate = (path: string) => router.push(path);

  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {cardRoutes.map((item) => (
          <CarouselItem key={item.id} className="pl-1 ">
            <div className="p-1">
              <Card
                className="cursor-pointer"
                onClick={() => onNavigate(item.path)}
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
  );
};

export default PageContent;
