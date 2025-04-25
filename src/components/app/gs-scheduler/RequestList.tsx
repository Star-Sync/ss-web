import React, { FC, useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash, Pencil, ArrowUpDown, Edit2 } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

interface Request {
    id: string;
    requestType: string;
    mission: string;
    satellite_name: string;
    station_id: number;
    orbit: number;
    uplink: boolean;
    telemetry: boolean;
    science: boolean;
    startTime: string;
    endTime: string;
    duration: number;
    aos: string;
    rf_on: string;
    rf_off: string;
    los: string;
}

type SortConfig = {
    key: keyof Request;
    direction: "asc" | "desc";
};

const RequestList: FC = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingRequest, setEditingRequest] = useState<Request | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: "startTime",
        direction: "asc",
    });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch("/api/v1/request/");
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    const handleSort = (key: keyof Request) => {
        setSortConfig((currentSort) => ({
            key,
            direction:
                currentSort.key === key && currentSort.direction === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    const sortedRequests = [...requests].sort((a, b) => {
        if (sortConfig.key === "startTime" || sortConfig.key === "endTime") {
            const dateA = new Date(a[sortConfig.key]).getTime();
            const dateB = new Date(b[sortConfig.key]).getTime();
            return sortConfig.direction === "asc"
                ? dateA - dateB
                : dateB - dateA;
        }

        if (typeof a[sortConfig.key] === "number") {
            return sortConfig.direction === "asc"
                ? (a[sortConfig.key] as number) - (b[sortConfig.key] as number)
                : (b[sortConfig.key] as number) - (a[sortConfig.key] as number);
        }

        const valueA = String(a[sortConfig.key]).toLowerCase();
        const valueB = String(b[sortConfig.key]).toLowerCase();
        return sortConfig.direction === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
    });

    const handleEdit = (request: Request) => {
        setEditingRequest(request);
        setIsEditDialogOpen(true);
    };

    const handleDelete = async (id: string, requestType: string) => {
        try {
            const endpoint =
                requestType === "RFTime"
                    ? `/api/v1/request/rf-time/${id}`
                    : `/api/v1/request/contact/${id}`;

            const response = await fetch(endpoint, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchRequests();
            }
        } catch (error) {
            console.error("Error deleting request:", error);
        }
    };

    const formatValue = (
        value: any,
        type: "date" | "boolean" | "number" | "string" = "string"
    ) => {
        if (value === null || value === undefined) return "N/A";

        switch (type) {
            case "date":
                return format(new Date(value), "yyyy-MM-dd HH:mm");
            case "boolean":
                return value ? "Yes" : "No";
            case "number":
                return value.toString();
            default:
                return value.toString();
        }
    };

    const SortableHeader: FC<{ label: string; sortKey: keyof Request }> = ({
        label,
        sortKey,
    }) => (
        <TableHead
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => handleSort(sortKey)}
        >
            <div className="flex items-center gap-2">
                {label}
                <ArrowUpDown className="h-4 w-4" />
                {sortConfig.key === sortKey && (
                    <span className="text-xs">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                )}
            </div>
        </TableHead>
    );

    const filteredRequests = sortedRequests.filter((request) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            request.id.toLowerCase().includes(searchLower) ||
            request.requestType.toLowerCase().includes(searchLower) ||
            request.mission.toLowerCase().includes(searchLower) ||
            request.satellite_name.toLowerCase().includes(searchLower) ||
            request.station_id.toString().includes(searchLower)
        );
    });

    return (
        <div className="border rounded-md">
            <div className="p-4">
                <Input
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableHeader label="ID" sortKey="id" />
                        <SortableHeader
                            label="Request Type"
                            sortKey="requestType"
                        />
                        <SortableHeader label="Mission" sortKey="mission" />
                        <SortableHeader
                            label="Satellite"
                            sortKey="satellite_name"
                        />
                        <SortableHeader
                            label="Station ID"
                            sortKey="station_id"
                        />
                        <SortableHeader
                            label="Start Time"
                            sortKey="startTime"
                        />
                        <SortableHeader label="End Time" sortKey="endTime" />
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredRequests.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-4">
                                No requests found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredRequests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>{formatValue(request.id)}</TableCell>
                                <TableCell>
                                    {formatValue(request.requestType)}
                                </TableCell>
                                <TableCell>
                                    {formatValue(request.mission)}
                                </TableCell>
                                <TableCell>
                                    {formatValue(request.satellite_name)}
                                </TableCell>
                                <TableCell>
                                    {formatValue(request.station_id, "number")}
                                </TableCell>
                                <TableCell>
                                    {formatValue(request.startTime, "date")}
                                </TableCell>
                                <TableCell>
                                    {formatValue(request.endTime, "date")}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(request)}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogPortal>
                    <div className="fixed inset-0 bg-black/50 z-[1000]" />
                </DialogPortal>
                <DialogContent className="bg-white border shadow-lg max-h-[90vh] flex flex-col z-[1000]">
                    <DialogHeader>
                        <DialogTitle>Request Details</DialogTitle>
                    </DialogHeader>

                    {editingRequest && (
                        <div className="grid gap-4 py-4 overflow-y-auto">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="requestType"
                                    className="text-right"
                                >
                                    Request Type
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(editingRequest.requestType)}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="mission" className="text-right">
                                    Mission
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(editingRequest.mission)}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="satellite"
                                    className="text-right"
                                >
                                    Satellite
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(editingRequest.satellite_name)}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="station" className="text-right">
                                    Station ID
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(
                                        editingRequest.station_id,
                                        "number"
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="orbit" className="text-right">
                                    Orbit
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(
                                        editingRequest.orbit,
                                        "number"
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="uplink" className="text-right">
                                    Uplink
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(
                                        editingRequest.uplink,
                                        "boolean"
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="telemetry"
                                    className="text-right"
                                >
                                    Telemetry
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(
                                        editingRequest.telemetry,
                                        "boolean"
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="science" className="text-right">
                                    Science
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(
                                        editingRequest.science,
                                        "boolean"
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="startTime"
                                    className="text-right"
                                >
                                    Start Time
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(
                                        editingRequest.startTime,
                                        "date"
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="endTime" className="text-right">
                                    End Time
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(
                                        editingRequest.endTime,
                                        "date"
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="duration"
                                    className="text-right"
                                >
                                    Duration (seconds)
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(
                                        editingRequest.duration,
                                        "number"
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="aos" className="text-right">
                                    AOS
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(editingRequest.aos, "date")}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="rf_on" className="text-right">
                                    RF On
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(editingRequest.rf_on, "date")}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="rf_off" className="text-right">
                                    RF Off
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(editingRequest.rf_off, "date")}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="los" className="text-right">
                                    LOS
                                </Label>
                                <div className="col-span-3 p-2 bg-gray-50 rounded">
                                    {formatValue(editingRequest.los, "date")}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="mt-auto">
                        <Button
                            variant="destructive"
                            onClick={() => {
                                const confirmDelete = window.confirm(
                                    "Are you sure you want to delete this request?"
                                );
                                if (confirmDelete && editingRequest) {
                                    handleDelete(
                                        editingRequest.id,
                                        editingRequest.requestType
                                    );
                                    setIsEditDialogOpen(false);
                                }
                            }}
                        >
                            <Trash className="h-4 mr-2" />
                            Delete Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RequestList;
