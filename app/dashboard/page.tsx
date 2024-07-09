"use client";
import { useRef } from "react";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui";
import { sliderImages } from "@/lib/const";
import Image from "next/image";
import { PieChartViews } from "@/components/feat/PieChartViews";
import DashboardCard from "@/components/feat/DashboardCard";
import { AreaChartViews } from "@/components/feat/AreaChartViews";

export default function Dashboard() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-4 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full max-w-full rounded-lg overflow-hidden"
      >
        <CarouselContent>
          {sliderImages.map((image, index) => (
            <CarouselItem key={index} className="relative h-52">
              <Image
                src={`/assets/images/${image}.webp`}
                alt={image}
                fill={true}
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="relative w-full max-w-full flex flex-col gap-4 md:gap-6 xl:flex-row ">
        <div className="grid gap-4 md:grid-cols-1 md:gap-6 lg:grid-cols-2 max-w-full">
          <DashboardCard
            title="Total Revenue"
            IconComponent={DollarSign}
            mainText="$45,231.89"
            subText="+20.1% from last month"
            chunkId="dashboard-01-chunk-0"
          />
          <DashboardCard
            title="Subscriptions"
            IconComponent={Users}
            mainText="+2350"
            subText="+180.1% from last month"
            chunkId="dashboard-01-chunk-1"
          />
          <DashboardCard
            title="Sales"
            IconComponent={CreditCard}
            mainText="+12,234"
            subText="+19% from last month"
            chunkId="dashboard-01-chunk-2"
          />
          <DashboardCard
            title="Active Now"
            IconComponent={Activity}
            mainText="+573"
            subText="+201 since last hour"
            chunkId="dashboard-01-chunk-3"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-1 md:gap-6 lg:grid-cols-2 max-w-full">
          <PieChartViews />
          <AreaChartViews />
        </div>
      </div>
    </main>
  );
}
