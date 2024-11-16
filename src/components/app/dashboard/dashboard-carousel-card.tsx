import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { GroundStation } from "@/api/gs-overview";
import { Heat } from "@alptugidin/react-circular-progress-bar";

interface GroundStationCardProps {
    station: GroundStation;
}

const GroundStationCard: React.FC<GroundStationCardProps> = ({ station }) => (
    <Card className="h-[50vh] shadow-lg rounded-lg border border-gray-200">
        <CardHeader>
            <CardTitle className="text-lg font-semibold">{station.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{station.location}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {/* Circular progress bar */}
            <div className="flex justify-center">
                <Heat
                    progress={station.usage || 50} // Dynamically pass usage
                    text="Usage"
                    sx={{
                        bgColor: "#f3f4f6",
                        barWidth: 10,
                        shape: "half",
                        strokeLinecap: "round",
                        valueSize: 18,
                        valueFamily: "Arial Black",
                        textSize: 12,
                        textWeight: "bold",
                        textFamily: "Arial",
                    }}
                />
            </div>
            {/* Usage data table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wide">
                            Date
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wide">
                            Usage (%)
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {station.usageData?.map((data, idx) => (
                        <tr key={idx}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                {data.date}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">
                                {data.usage}%
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </CardContent>
        <CardFooter className="flex justify-end">
            <button
                className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => alert(`Viewing details for ${station.name}`)} // Replace with actual handler
            >
                View Details
            </button>
        </CardFooter>
    </Card>
);

export default GroundStationCard;
