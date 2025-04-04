import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getGroundStations, GroundStation } from '@/api/gs-overview';
import { Loader2 } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from '@/components/ui/separator';

export default function DashboardGS() {
    const [groundStations, setGroundStations] = useState<GroundStation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroundStations = async () => {
            try {
                const stations = await getGroundStations();
                setGroundStations(stations);
            } catch (error) {
                console.error('Error fetching ground stations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroundStations();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Ground Stations</h1>
               
                <div className="text-sm text-muted-foreground">
                    {groundStations.length} stations available
                </div>
            </div>
            <Separator className="my-4" />
            <Carousel 
            opts={{
                align: "start",
                loop: true,
              }}
            className="w-full">
                <CarouselContent>
                    {groundStations.map((station) => (
                        <CarouselItem key={station.id}>
                            <Card className="border-none shadow-none">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl">{station.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Latitude</p>
                                                <p className="font-medium">{station.lat.toFixed(4)}°</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Longitude</p>
                                                <p className="font-medium">{station.lon.toFixed(4)}°</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Height</p>
                                                <p className="font-medium">{station.height}m</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Mask Angle</p>
                                                <p className="font-medium">{station.mask}°</p>
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t">
                                            <h4 className="text-sm font-medium mb-2">Frequencies</h4>
                                            <div className="grid grid-cols-3 gap-3">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Uplink</p>
                                                    <p className="font-medium">{station.uplink} MHz</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Downlink</p>
                                                    <p className="font-medium">{station.downlink} MHz</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Science</p>
                                                    <p className="font-medium">{station.science} MHz</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="top-[-3vw]" />
                <CarouselNext className="top-[-3vw]" />
            </Carousel>
        </div>
    );
}
