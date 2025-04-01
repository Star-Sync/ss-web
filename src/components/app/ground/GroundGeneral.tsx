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
import { toast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Ground, getGroundStations, updateGroundStation, deleteGroundStation, getApiErrorMessage } from "@/api/ground-stations";

interface ValidationErrors {
    lat?: string;
    lon?: string;
    height?: string;
    mask?: string;
    science?: string;
    downlink?: string;
    uplink?: string;
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
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        const fetchGroundStations = async () => {
            setLoading(true);
            try {
                const data = await getGroundStations();
                setGrounds(data);
            } catch (err) {
                const errorMessage = getApiErrorMessage(err, "Failed to fetch ground stations.");
                setError(errorMessage);
                console.error(err);
                toast({
                    title: "Error",
                    description: errorMessage,
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
        setValidationErrors({});
    };

    const validateForm = (): boolean => {
        if (!editingGround) return false;
        
        const errors: ValidationErrors = {};
        
        // Validate latitude (-90 to 90)
        const lat = parseFloat(editingGround.lat);
        if (isNaN(lat) || lat < -90 || lat > 90) {
            errors.lat = "Latitude must be between -90 and 90";
        }
        
        // Validate longitude (-180 to 180)
        const lon = parseFloat(editingGround.lon);
        if (isNaN(lon) || lon < -180 || lon > 180) {
            errors.lon = "Longitude must be between -180 and 180";
        }
        
        // Validate height (positive)
        const height = parseFloat(editingGround.height);
        if (isNaN(height) || height <= 0) {
            errors.height = "Height must be a positive number";
        }
        
        // Validate mask (non-negative)
        if (editingGround.mask < 0) {
            errors.mask = "Mask must be at least 0";
        }
        
        // Validate science (positive)
        const science = parseFloat(editingGround.science);
        if (isNaN(science) || science <= 0) {
            errors.science = "Science data rate must be a positive number";
        }
        
        // Validate downlink and uplink are numbers
        const downlink = parseFloat(editingGround.downlink);
        if (isNaN(downlink)) {
            errors.downlink = "Downlink must be a number";
        }
        
        const uplink = parseFloat(editingGround.uplink);
        if (isNaN(uplink)) {
            errors.uplink = "Uplink must be a number";
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveEdit = async () => {
        if (!editingGround) return;
        
        // Validate the form before submitting
        if (!validateForm()) {
            return;
        }

        try {
            const updatedGround = await updateGroundStation(editingGround.id, editingGround);

            // Update the local state
            setGrounds((prev) =>
                prev.map((ground) =>
                    ground.id === editingGround.id ? updatedGround : ground
                )
            );

            toast({
                title: "Ground Station updated successfully.",
                description: `Ground Station "${editingGround.name}" was updated.`,
                variant: "success",
                duration: 5000,
            });

            // Close the edit dialog
            setIsEditDialogOpen(false);
            setEditingGround(null);
        } catch (err) {
            console.error(err);
            
            const errorMessage = getApiErrorMessage(err, "There was an error updating the ground station.");
                
            toast({
                title: "Error updating ground station.",
                description: errorMessage,
                variant: "destructive",
                duration: 5000,
            });
        }
    };

    const handleDelete = async (groundId: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ground station?"
        );
        if (!confirmDelete) return;

        try {
            await deleteGroundStation(groundId);
            setGrounds((prev) => prev.filter((ground) => ground.id !== groundId));
            toast({
                title: "Ground Station deleted successfully.",
                variant: "success",
                duration: 5000,
            });
        } catch (err) {
            console.error(err);
            
            const errorMessage = getApiErrorMessage(err, "There was an error deleting the ground station.");
        
            toast({
                title: "Error deleting ground station.",
                description: errorMessage,
                variant: "destructive",
                duration: 5000,
            });
        }
    };

    const [sortedGrounds, setSortedGrounds] = useState<Ground[]>([]);

    useEffect(() => {
        const sorted = [...grounds];
    
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

    const handleFieldChange = (field: keyof Ground, value: string | number) => {
        if (!editingGround) return;
        
        setEditingGround({
            ...editingGround,
            [field]: value
        });
        
        // Clear validation error for this field
        if (validationErrors[field as keyof ValidationErrors]) {
            setValidationErrors({
                ...validationErrors,
                [field]: undefined
            });
        }
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
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={editingGround.name}
                                    onChange={(e) => handleFieldChange('name', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="lat" className="text-right">
                                    Latitude
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="lat"
                                        type="number"
                                        step="any"
                                        min="-90"
                                        max="90"
                                        value={editingGround.lat}
                                        onChange={(e) => handleFieldChange('lat', e.target.value)}
                                        className={validationErrors.lat ? "border-red-500" : ""}
                                    />
                                    {validationErrors.lat && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.lat}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="lon" className="text-right">
                                    Longitude
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="lon"
                                        type="number"
                                        step="any"
                                        min="-180"
                                        max="180"
                                        value={editingGround.lon}
                                        onChange={(e) => handleFieldChange('lon', e.target.value)}
                                        className={validationErrors.lon ? "border-red-500" : ""}
                                    />
                                    {validationErrors.lon && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.lon}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="height" className="text-right">
                                    Height
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="height"
                                        type="number"
                                        step="any"
                                        min="0.1"
                                        value={editingGround.height}
                                        onChange={(e) => handleFieldChange('height', e.target.value)}
                                        className={validationErrors.height ? "border-red-500" : ""}
                                    />
                                    {validationErrors.height && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.height}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="mask" className="text-right">
                                    Mask
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="mask"
                                        type="number"
                                        step="any"
                                        min="0"
                                        value={editingGround.mask}
                                        onChange={(e) => handleFieldChange('mask', Number(e.target.value))}
                                        className={validationErrors.mask ? "border-red-500" : ""}
                                    />
                                    {validationErrors.mask && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.mask}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="uplink" className="text-right">
                                    Uplink
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="uplink"
                                        type="number"
                                        step="any"
                                        value={editingGround.uplink}
                                        onChange={(e) => handleFieldChange('uplink', e.target.value)}
                                        className={validationErrors.uplink ? "border-red-500" : ""}
                                    />
                                    {validationErrors.uplink && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.uplink}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="downlink" className="text-right">
                                    Downlink
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="downlink"
                                        type="number"
                                        step="any"
                                        value={editingGround.downlink}
                                        onChange={(e) => handleFieldChange('downlink', e.target.value)}
                                        className={validationErrors.downlink ? "border-red-500" : ""}
                                    />
                                    {validationErrors.downlink && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.downlink}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="science" className="text-right">
                                    Science
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="science"
                                        type="number"
                                        step="any"
                                        min="0.1"
                                        value={editingGround.science}
                                        onChange={(e) => handleFieldChange('science', e.target.value)}
                                        className={validationErrors.science ? "border-red-500" : ""}
                                    />
                                    {validationErrors.science && (
                                        <p className="text-red-500 text-sm mt-1">{validationErrors.science}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            className="mr-[5vw]"
                            variant="destructive"
                            onClick={() => {
                                const confirmDelete = window.confirm(
                                    "Are you sure you want to delete this ground station?"
                                );
                                if (confirmDelete && editingGround) {
                                    handleDelete(editingGround.id);
                                    setIsEditDialogOpen(false);
                                }
                            }}
                        >
                            <Trash className="h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsEditDialogOpen(false);
                                setEditingGround(null);
                                setValidationErrors({});
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