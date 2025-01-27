import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";

interface Satellite {
    id: string;
    name: string;
    priority: number;
    uplink: string;
    downlink: string;
    scienceTime: string;
    exclusionCones: string;
    tle: string;
}

type SortableColumn = 'name' | 'priority' | 'uplink' | 'downlink' | 'scienceTime';

const SatelliteGeneral: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: SortableColumn; direction: 'asc' | 'desc' } | null>(null);

    // Example data
    const [satellites] = useState<Satellite[]>([
        {
            id: "1",
            name: "Hubble Space Telescope",
            priority: 1,
            uplink: "2024-03-20 14:00",
            downlink: "2024-03-20 15:30",
            scienceTime: "6h 45m",
            exclusionCones: "2 active",
            tle: "1 20580U 90037B   24081.58343750  .00000017  00000-0  00000+0 0  9999..."
        },
        {
            id: "2",
            name: "International Space Station",
            priority: 2,
            uplink: "2024-03-21 10:00",
            downlink: "2024-03-21 11:30",
            scienceTime: "4h 30m",
            exclusionCones: "1 active",
            tle: "1 25544U 98067A   24081.58343750  .00000017  00000-0  00000+0 0  9999..."
        },
        {
            id: "3",
            name: "Spitzer Space Telescope",
            priority: 3,
            uplink: "2024-03-22 12:00",
            downlink: "2024-03-22 13:30",
            scienceTime: "8h 15m",
            exclusionCones: "3 active",
            tle: "1 26957U 01018A   24081.58343750  .00000017  00000-0  00000+0 0  9999..."
        },
        {
            id: "4",
            name: "Chandra X-ray Observatory",
            priority: 1,
            uplink: "2024-03-23 14:00",
            downlink: "2024-03-23 15:30",
            scienceTime: "5h 45m",
            exclusionCones: "2 active",
            tle: "1 25867U 99057A   24081.58343750  .00000017  00000-0  00000+0 0  9999..."
        },
        {
            id: "5",
            name: "Kepler Space Telescope",
            priority: 2,
            uplink: "2024-03-24 10:00",
            downlink: "2024-03-24 11:30",
            scienceTime: "6h 30m",
            exclusionCones: "1 active",
            tle: "1 28357U 03018A   24081.58343750  .00000017  00000-0  00000+0 0  9999..."
        },
        {
            id: "6",
            name: "Swift Gamma-Ray Burst Mission",
            priority: 3,
            uplink: "2024-03-25 12:00",
            downlink: "2024-03-25 13:30",
            scienceTime: "7h 15m",
            exclusionCones: "3 active",
            tle: "1 28905U 05018A   24081.58343750  .00000017  00000-0  00000+0 0  9999..."
        },
        {
            id: "7",
            name: "Fermi Gamma-Ray Space Telescope",
            priority: 1,
            uplink: "2024-03-26 14:00",
            downlink: "2024-03-26 15:30",
            scienceTime: "5h 45m",
            exclusionCones: "2 active",
            tle: "1 33053U 08018A   24081.58343750  .00000017  00000-0  00000+0 0  9999..."
        },
        {
            id: "8",
            name: "NuSTAR",
            priority: 2,
            uplink: "2024-03-27 10:00",
            downlink: "2024-03-27 11:30",
            scienceTime: "6h 30m",
            exclusionCones: "1 active",
            tle: "1 37753U 11018A   24081.58343750  .00000017  00000-0  00000+0 0  9999..."
        },
        {
            id: "9",
            name: "GALEX",
            priority: 3,
            uplink: "2024-03-28 12:00",
            downlink: "2024-03-28 13:30",
            scienceTime: "7h 15m",
            exclusionCones: "3 active",
            tle: "1 29251U 06018A   24081.58343750  .00000017  00000-0  00000+0 0  9999..."
        },
        {
            id: "10",
            name: "WISE",
            priority: 1,
            uplink: "2024-03-29 14:00",
            downlink: "2024-03-29 15:30",
            scienceTime: "5h 45m",
            exclusionCones: "2 active",
            tle: "1 35696U 09018A   24081.58343750  .00000017  00000-0  00000+0 0  9999..."
        },
    ]);

    const handleSort = (key: SortableColumn) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedSatellites = [...satellites].sort((a, b) => {
        if (!sortConfig) return 0;

        const aValue = a[sortConfig.key as keyof Satellite];
        const bValue = b[sortConfig.key as keyof Satellite];

        // Handle different data types
        if (sortConfig.key === 'priority') {
            return sortConfig.direction === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
        }

        if (sortConfig.key === 'scienceTime') {
            const parseTime = (time: string) => {
                const hours = parseInt(time.replace('h', ''));
                const minutes = parseInt(time.replace('h', '').replace('m', ''));
                return hours + minutes / 60;
            };
            return sortConfig.direction === 'asc' ?
                parseTime(aValue as string) - parseTime(bValue as string) :
                parseTime(bValue as string) - parseTime(aValue as string);
        }

        // For date comparisons
        if (sortConfig.key === 'uplink' || sortConfig.key === 'downlink') {
            return sortConfig.direction === 'asc' ?
                new Date(aValue as string).getTime() - new Date(bValue as string).getTime() :
                new Date(bValue as string).getTime() - new Date(aValue as string).getTime();
        }

        // Default string comparison
        return sortConfig.direction === 'asc' ?
            (aValue as string).localeCompare(bValue as string) :
            (bValue as string).localeCompare(aValue as string);
    });

    const filteredSatellites = sortedSatellites.filter(satellite => {// Add timescale filtering logic here based on selectedTimescale
        return satellite.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold">Satellite Overview</h3>

            <div className="flex gap-4">
                <Input
                    placeholder="Search satellites..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {([
                            ['name', 'Name'],
                            ['priority', 'Priority'],
                            ['uplink', 'Uplink'],
                            ['downlink', 'Downlink'],
                            ['scienceTime', 'Science Time'],
                            ['exclusionCones', 'Exclusion Cones'],
                            ['tle', 'TLE'],
                        ] as [SortableColumn | string, string][]).map(([key, label]) => (
                            <TableHead key={key}>
                                {['name', 'priority', 'uplink', 'downlink', 'scienceTime'].includes(key) ? (
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSort(key as SortableColumn)}
                                        className="p-0 hover:bg-transparent"
                                    >
                                        {label}
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                        {sortConfig?.key === key && (
                                            <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                                        )}
                                    </Button>
                                ) : (
                                    label
                                )}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredSatellites.map((satellite) => (
                        <TableRow key={satellite.id}>
                            <TableCell className="font-medium">{satellite.name}</TableCell>
                            <TableCell>{satellite.priority}</TableCell>
                            <TableCell>{satellite.uplink}</TableCell>
                            <TableCell>{satellite.downlink}</TableCell>
                            <TableCell>{satellite.scienceTime}</TableCell>
                            <TableCell>{satellite.exclusionCones}</TableCell>
                            <TableCell className="max-w-[200px] truncate">
                                {satellite.tle}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SatelliteGeneral;
