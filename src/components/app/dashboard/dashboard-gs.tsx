import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import GroundStationCard from "./dashboard-carousel-card";
import { groundStations } from "@/api/gs-overview";

interface DashboardGSProps {
    className?: string;
}

const DashboardGS: React.FC<DashboardGSProps> = ({ className }) => {
    return (
        <div className="relative">
            <Carousel className={`bg-white shadow-md rounded-xl ${className}`}>
                <CarouselPrevious
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
                />
                <CarouselNext
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
                />
                <CarouselContent>
                    {groundStations.map((station, index) => (
                        <CarouselItem key={index}>
                            <GroundStationCard station={station} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default DashboardGS;
