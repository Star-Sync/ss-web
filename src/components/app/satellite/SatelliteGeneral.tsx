import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import axios from "axios";
import {toast} from "@/hooks/use-toast";

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

type SortableColumn =
    | "name"
    | "priority"
    | "uplink"
    | "downlink"
    | "scienceTime";

const SatelliteGeneral: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<
        { key: SortableColumn; direction: "asc" | "desc" } | null
    >(null);
    const [satellites, setSatellites] = useState<Satellite[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSatellites = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Satellite[]>("/api/v1/satellites/"); // Replace with your API endpoint
                setSatellites(response.data);
            } catch (err) {
                setError("Failed to fetch satellites.");
                console.error(err);
                toast({
                    title: "Error: " + err,
                    description: "There was an error fetching from the API. Please try again.",
                    variant: "destructive",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSatellites();
    }, []);

    const handleSort = (key: SortableColumn) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedSatellites = [...satellites].sort((a, b) => {
        if (!sortConfig) return 0;

        const aValue = a[sortConfig.key as keyof Satellite];
        const bValue = b[sortConfig.key as keyof Satellite];

        // Handle different data types
        if (sortConfig.key === "priority") {
            return sortConfig.direction === "asc"
                ? (aValue as number) - (bValue as number)
                : (bValue as number) - (aValue as number);
        }

        if (sortConfig.key === "scienceTime") {
            const parseTime = (time: string) => {
                const hours = parseInt(time.replace("h", ""));
                const minutes = parseInt(time.replace("h", "").replace("m", ""));
                return hours + minutes / 60;
            };
            return sortConfig.direction === "asc"
                ? parseTime(aValue as string) - parseTime(bValue as string)
                : parseTime(bValue as string) - parseTime(aValue as string);
        }

        // For date comparisons
        if (sortConfig.key === "uplink" || sortConfig.key === "downlink") {
            return sortConfig.direction === "asc"
                ? new Date(aValue as string).getTime() -
                new Date(bValue as string).getTime()
                : new Date(bValue as string).getTime() -
                new Date(aValue as string).getTime();
        }

        // Default string comparison
        return sortConfig.direction === "asc"
            ? (aValue as string).localeCompare(bValue as string)
            : (bValue as string).localeCompare(aValue as string);
    });

    const filteredSatellites = sortedSatellites.filter((satellite) => {
        // Add timescale filtering logic here based on selectedTimescale
        return satellite.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return <div>Loading satellites...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                            ["name", "Name"],
                            ["priority", "Priority"],
                            ["uplink", "Uplink"],
                            ["downlink", "Downlink"],
                            ["scienceTime", "Science Time"],
                            ["exclusionCones", "Exclusion Cones"],
                            ["tle", "TLE"],
                        ] as [SortableColumn | string, string][]).map(([key, label]) => (
                            <TableHead key={key}>
                                {["name", "priority", "uplink", "downlink", "scienceTime"].includes(
                                    key
                                ) ? (
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleSort(key as SortableColumn)}
                                        className="p-0 hover:bg-transparent"
                                    >
                                        {label}
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                        {sortConfig?.key === key && (
                                            <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
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
