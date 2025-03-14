import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash2, Edit, Check, X } from "lucide-react";

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

type SortableColumn = 'name' | 'latitude' | 'longtitude' | 'height' | 'mask' | 'uplink' | 'downlink' | 'science' | 'id';
type EditableField = keyof Omit<Ground, 'id'>;

const GroundGeneral: React.FC = () => {
    const [grounds, setGrounds] = useState<Ground[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: SortableColumn; direction: 'asc' | 'desc' } | null>(null);
    
    // Mode states
    const [mode, setMode] = useState<'view' | 'delete' | 'edit'>('view');
    const [selectedGrounds, setSelectedGrounds] = useState<Set<string>>(new Set());
    
    // Edit states
    const [editingGround, setEditingGround] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Partial<Ground>>({});

    // Fetch ground stations from API
    useEffect(() => {
        fetchGroundStations();
    }, []);

    const fetchGroundStations = () => {
        fetch("/api/v1/gs/")
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setGrounds(data);
                } else {
                    console.error("API did not return an array:", data);
                    setGrounds([]);
                }
            })
            .catch(error => {
                console.error("Error fetching ground stations:", error);
                setGrounds([]);
            });
    };

    const handleSort = (key: SortableColumn) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleDelete = () => {
        // Send DELETE request for selected grounds
        selectedGrounds.forEach((id) => {
            fetch(`/api/v1/gs/${id}`, { method: "DELETE" })
                .then(() => {
                    setGrounds((prevGrounds) =>
                        prevGrounds.filter((station) => station.id !== id)
                    );
                })
                .catch((error) => {
                    console.error("Error deleting ground station:", error);
                });
        });

        resetModes();
    };

    const handleEdit = async () => {
        if (!editingGround) return;
        
        try {
            const response = await fetch(`/api/v1/gs/${editingGround}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editValues),
            });
            
            if (response.ok) {
                // Update local state with edited values
                setGrounds(prevGrounds => 
                    prevGrounds.map(station => 
                        station.id === editingGround 
                            ? { ...station, ...editValues } 
                            : station
                    )
                );
                
                // Reset edit state
                resetModes();
            } else {
                console.error("Failed to update ground station:", await response.text());
            }
        } catch (error) {
            console.error("Error updating ground station:", error);
        }
    };

    const resetModes = () => {
        setMode('view');
        setSelectedGrounds(new Set());
        setEditingGround(null);
        setEditValues({});
    };

    const handleModeChange = (newMode: 'view' | 'delete' | 'edit') => {
        if (mode === newMode) {
            resetModes();
        } else {
            setMode(newMode);
            setSelectedGrounds(new Set());
            setEditingGround(null);
            setEditValues({});
        }
    };

    const handleSelectGround = (id: string) => {
        if (mode === 'delete') {
            setSelectedGrounds(prev => {
                const newSelectedGrounds = new Set(prev);
                if (newSelectedGrounds.has(id)) {
                    newSelectedGrounds.delete(id);
                } else {
                    newSelectedGrounds.add(id);
                }
                return newSelectedGrounds;
            });
        } else if (mode === 'edit') {
            // In edit mode, we only select one ground station at a time
            if (editingGround === id) {
                setEditingGround(null);
                setEditValues({});
            } else {
                setEditingGround(id);
                // Initialize edit values with the current ground station values
                const groundToEdit = grounds.find(station => station.id === id);
                if (groundToEdit) {
                    setEditValues({
                        name: groundToEdit.name,
                        lat: groundToEdit.lat,
                        lon: groundToEdit.lon,
                        height: groundToEdit.height,
                        mask: groundToEdit.mask,
                        uplink: groundToEdit.uplink,
                        downlink: groundToEdit.downlink,
                        science: groundToEdit.science,
                    });
                }
            }
        }
    };

    const handleFieldEdit = (field: EditableField, value: string | number) => {
        setEditValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const sortedGrounds = [...grounds].sort((a, b) => {
        if (!sortConfig) return 0;

        const aValue = a[sortConfig.key as keyof Ground];
        const bValue = b[sortConfig.key as keyof Ground];

        const numericKeys: SortableColumn[] = ['latitude', 'longtitude', 'height', 'mask', 'uplink', 'downlink', 'science'];
        if (numericKeys.includes(sortConfig.key)) {
            return sortConfig.direction === 'asc'
                ? parseFloat(aValue as string) - parseFloat(bValue as string)
                : parseFloat(bValue as string) - parseFloat(aValue as string);
        }

        return sortConfig.direction === 'asc'
            ? (aValue as string).localeCompare(bValue as string)
            : (bValue as string).localeCompare(aValue as string);
    });

    const filteredGrounds = sortedGrounds.filter(station =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.id.toString().includes(searchTerm)
    );

    // Helper function to render editable cell
    const renderEditableCell = (station: Ground, field: EditableField) => {
        if (mode === 'edit' && editingGround === station.id) {
            return (
                <input
                    type="text"
                    value={editValues[field] !== undefined ? editValues[field] : station[field]}
                    onChange={(e) => handleFieldEdit(field, e.target.value)}
                    className="w-full p-1 border rounded"
                />
            );
        }
        return station[field];
    };

    return (
        <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold">Ground Station Overview</h3>

            <div className="flex gap-4 items-center">
                <Input
                    placeholder="Search ground stations by name or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Button
                    variant={mode === 'delete' ? "default" : "destructive"}
                    className="ml-4"
                    onClick={() => handleModeChange('delete')}
                >
                    <Trash2 className="h-5 w-5" />
                </Button>

                <Button
                    variant={mode === 'edit' ? "default" : "outline"}
                    className={`ml-4 ${mode !== 'edit' ? "text-white border-blue-500 bg-blue-500 hover:bg-blue-400" : ""}`}
                    onClick={() => handleModeChange('edit')}
                >
                    <Edit className={`h-5 w-5 ${mode !== 'edit' ? "text-white" : ""}`} />
                </Button>
            </div>

            {mode === 'delete' && (
                <div className="flex gap-2">
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={selectedGrounds.size === 0}
                    >
                        Confirm Deletion
                    </Button>
                    <Button
                        variant="outline"
                        onClick={resetModes}
                        className="border-black"
                    >
                        Cancel
                    </Button>
                </div>
            )}

            {mode === 'edit' && editingGround && (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="text-white border-blue-500 bg-blue-500 hover:bg-blue-400"
                        onClick={handleEdit}
                    >
                        <Check className="h-5 w-5 mr-1" /> Save Changes
                    </Button>
                    <Button
                        variant="outline"
                        onClick={resetModes}
                        className="border-black"
                    >
                        <X className="h-5 w-5 mr-1" /> Cancel
                    </Button>
                </div>
            )}

            <Table>
                <TableHeader>
                    <TableRow>
                        {([
                            ['name', 'Name'],
                            ['lat', 'Latitude'],
                            ['lon', 'Longitude'],
                            ['height', 'Height'],
                            ['mask', 'Mask'],
                            ['uplink', 'Uplink'],
                            ['downlink', 'Downlink'],
                            ['science', 'Science'],
                            ['id', 'ID'],
                        ] as [SortableColumn, string][]).map(([key, label]) => (
                            <TableHead key={key}>
                                <Button
                                    variant="ghost"
                                    onClick={() => handleSort(key)}
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
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredGrounds.map((station) => (
                        <TableRow 
                            key={station.id} 
                            className={editingGround === station.id ? "bg-blue-50" : ""}
                        >
                            <TableCell className="font-medium">
                                {mode !== 'view' && (
                                    <input
                                        type="checkbox"
                                        checked={mode === 'delete' ? selectedGrounds.has(station.id) : editingGround === station.id}
                                        onChange={() => handleSelectGround(station.id)}
                                        className="mr-2"
                                    />
                                )}
                                {renderEditableCell(station, 'name')}
                            </TableCell>
                            <TableCell>{renderEditableCell(station, 'lat')}</TableCell>
                            <TableCell>{renderEditableCell(station, 'lon')}</TableCell>
                            <TableCell>{renderEditableCell(station, 'height')}</TableCell>
                            <TableCell>{renderEditableCell(station, 'mask')}</TableCell>
                            <TableCell>{renderEditableCell(station, 'uplink')}</TableCell>
                            <TableCell>{renderEditableCell(station, 'downlink')}</TableCell>
                            <TableCell>{renderEditableCell(station, 'science')}</TableCell>
                            <TableCell>{station.id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default GroundGeneral;