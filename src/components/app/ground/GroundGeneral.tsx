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
import { ArrowUpDown, Edit2, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Ground {
    id: string;
    name: string;
    lat: string;
    lon: string;
    height: string;
    mask: number;
    uplink: string;
    downlink: string;
    science: string;
}

type SortableColumn = 'name' | 'lat' | 'lon' | 'height' | 'mask' | 'uplink' | 'downlink' | 'science';

const GroundGeneral: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<
        { key: SortableColumn; direction: "asc" | "desc" } | null
    >(null);
    const [grounds, setGrounds] = useState<Ground[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingGround, setEditingGround] = useState<Ground | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    useEffect(() => {
        const fetchGroundStations = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Ground[]>("/api/v1/gs/");
                setGrounds(response.data);
            } catch (err) {
                setError("Failed to fetch ground stations.");
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

        fetchGroundStations();
    }, []);

    const handleSort = (key: SortableColumn) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const handleEdit = (ground: Ground) => {
        setEditingGround({ ...ground });
        setIsEditDialogOpen(true);
    };

    const handleSaveEdit = async () => {
        if (!editingGround) return;

        try {
            await axios.patch(`/api/v1/gs/${editingGround.id}`, editingGround);

            // Update the local state
            setGrounds((prev) =>
                prev.map((ground) =>
                    ground.id === editingGround.id ? editingGround : ground
                )
            );

            toast({
                title: "Ground Station updated successfully.",
                description: `Ground Station "${editingGround.name}" was updated.`,
            });

            // Close the edit dialog
            setIsEditDialogOpen(false);
            setEditingGround(null);
        } catch (err) {
            console.error(err);
            
            // Check if it's an axios error with a response
            const errorMessage = axios.isAxiosError(err) && err.response?.data?.detail 
                ? err.response.data.detail 
                : "There was an error updating the ground station.";

            toast({
                title: "Error updating ground station.",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (groundId: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ground station?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/v1/gs/${groundId}`);
            setGrounds((prev) => prev.filter((ground) => ground.id !== groundId));
            toast({
                title: "Ground Station deleted successfully.",
            });
        } catch (err) {
            console.error(err);
            // Check if it's an axios error with a response
            const errorMessage = axios.isAxiosError(err) && err.response?.data?.detail 
                ? err.response.data.detail 
                : "There was an error deleting the ground station.";

            toast({
                title: "Error deleting ground station.",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };

    const [sortedGrounds, setSortedGrounds] = useState<Ground[]>([]);

    useEffect(() => {
        let sorted = [...grounds];
    
        if (sortConfig) {
            sorted.sort((a, b) => {
                const aValue = a[sortConfig.key as keyof Ground];
                const bValue = b[sortConfig.key as keyof Ground];
    
                // Columns that should be sorted numerically
                const numericColumns: SortableColumn[] = ['height', 'mask', 'downlink', 'science'];
    
                if (numericColumns.includes(sortConfig.key)) {
                    // Custom parsing to handle numeric strings, including decimal and scientific notation
                    const parseNumericString = (value: string | number): number => {
                        // Remove any non-numeric characters except decimal point and scientific notation
                        const cleanValue = String(value)
                            .replace(/[^\d.-eE]/g, '')
                            .trim();
                        
                        // Parse the cleaned string
                        const parsed = parseFloat(cleanValue);
                        
                        // Return parsed number or 0 if parsing fails
                        return isNaN(parsed) ? 0 : parsed;
                    };
    
                    const aNum = parseNumericString(aValue);
                    const bNum = parseNumericString(bValue);
    
                    return sortConfig.direction === "asc" 
                        ? aNum - bNum 
                        : bNum - aNum;
                }
    
                // String comparison for other fields (case-insensitive)
                return sortConfig.direction === "asc"
                    ? String(aValue || "").localeCompare(String(bValue || ""), undefined, { sensitivity: 'base' })
                    : String(bValue || "").localeCompare(String(aValue || ""), undefined, { sensitivity: 'base' });
            });
        }
    
        setSortedGrounds(sorted);
    }, [grounds, sortConfig]);


    const filteredGrounds = sortedGrounds.filter((ground) => {
        return ground.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return <div>Loading ground stations...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const formatValue = (value: any) => {
        if (value === undefined || value === null) return "-";
        return value.toString();
    };

    return (
        <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold">Ground Station Overview</h3>

            <div className="flex gap-4">
                <Input
                    placeholder="Search ground stations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {([
                                ["name", "Name"],
                                ["lat", "Latitude"],
                                ["lon", "Longitude"],
                                ["height", "Height"],
                                ["mask", "Mask"],
                                ["uplink", "Uplink"],
                                ["downlink", "Downlink"],
                                ["science", "Science"],
                            ] as [SortableColumn | string, string][]).map(([key, label]) => (
                                <TableHead key={key} className="px-4 py-3">
                                    {[
                                        "name", "lat", "lon", "height", "mask", 
                                        "uplink", "downlink", "science"
                                    ].includes(key) ? (
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                handleSort(key as SortableColumn)
                                            }
                                            className="p-0 hover:bg-transparent flex items-center"
                                        >
                                            {label}
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                            {/* {sortConfig?.key === key && (
                                                <span className="ml-1">
                                                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                                                </span>
                                            )} */}
                                        </Button>
                                    ) : (
                                        label
                                    )}
                                </TableHead>
                            ))}
                            <TableHead key="actions" className="px-4 py-3">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredGrounds.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center py-4">
                                    No ground stations found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredGrounds.map((ground) => (
                                <TableRow key={ground.id}>
                                    <TableCell className="font-medium px-4 py-3">
                                        {formatValue(ground.name)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(ground.lat)}</TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(ground.lon)}</TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(ground.height)}</TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(ground.mask)}</TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(ground.uplink)}</TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(ground.downlink)}</TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(ground.science)}</TableCell>
                                    <TableCell className="space-x-2 px-4 py-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(ground)}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(ground.id)}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="bg-white border shadow-lg">
                    <DialogHeader>
                        <DialogTitle>Edit Ground Station</DialogTitle>
                    </DialogHeader>

                    {editingGround && (
                        <div className="grid gap-4 py-4 ">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={editingGround.name}
                                    onChange={(e) => setEditingGround({
                                        ...editingGround,
                                        name: e.target.value
                                    })}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="lat" className="text-right">
                                    Latitude
                                </Label>
                                <Input
                                    id="lat"
                                    value={editingGround.lat}
                                    onChange={(e) => setEditingGround({
                                        ...editingGround,
                                        lat: e.target.value
                                    })}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="lon" className="text-right">
                                    Longitude
                                </Label>
                                <Input
                                    id="lon"
                                    value={editingGround.lon}
                                    onChange={(e) => setEditingGround({
                                        ...editingGround,
                                        lon: e.target.value
                                    })}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="height" className="text-right">
                                    Height
                                </Label>
                                <Input
                                    id="height"
                                    value={editingGround.height}
                                    onChange={(e) => setEditingGround({
                                        ...editingGround,
                                        height: e.target.value
                                    })}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="mask" className="text-right">
                                    Mask
                                </Label>
                                <Input
                                    id="mask"
                                    type="number"
                                    value={editingGround.mask}
                                    onChange={(e) => setEditingGround({
                                        ...editingGround,
                                        mask: Number(e.target.value)
                                    })}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="uplink" className="text-right">
                                    Uplink
                                </Label>
                                <Input
                                    id="uplink"
                                    value={editingGround.uplink}
                                    onChange={(e) => setEditingGround({
                                        ...editingGround,
                                        uplink: e.target.value
                                    })}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="downlink" className="text-right">
                                    Downlink
                                </Label>
                                <Input
                                    id="downlink"
                                    value={editingGround.downlink}
                                    onChange={(e) => setEditingGround({
                                        ...editingGround,
                                        downlink: e.target.value
                                    })}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="science" className="text-right">
                                    Science
                                </Label>
                                <Input
                                    id="science"
                                    value={editingGround.science}
                                    onChange={(e) => setEditingGround({
                                        ...editingGround,
                                        science: e.target.value
                                    })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditDialogOpen(false);
                                setEditingGround(null);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEdit}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GroundGeneral;