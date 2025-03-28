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
import { Textarea } from "@/components/ui/textarea";
import apiClient from "@/lib/api";

interface Satellite {
  id: string;
  name: string;
  priority: number;
  uplink: number;
  telemetry: number;
  science: number;
  tle: string;
  ex_cones?: any[];
}

type SortableColumn = "name" | "priority" | "uplink" | "telemetry" | "science";

const SatelliteGeneral: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortableColumn;
    direction: "asc" | "desc";
  } | null>(null);
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSatellite, setEditingSatellite] = useState<Satellite | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchSatellites = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<Satellite[]>(
          "/api/v1/satellites/"
        );

        const processedData = response.data.map((sat) => ({
          ...sat,
          uplink: typeof sat.uplink === "number" ? sat.uplink : 0,
          telemetry: typeof sat.telemetry === "number" ? sat.telemetry : 0,
          science: typeof sat.science === "number" ? sat.science : 0,
        }));
        setSatellites(processedData);
      } catch (err) {
        setError("Failed to fetch satellites.");
        console.error(err);
        toast({
          title: "Error: " + err,
          description:
            "There was an error fetching from the API. Please try again.",
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
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (satellite: Satellite) => {
    setEditingSatellite({ ...satellite });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingSatellite) return;

    try {
      await apiClient.patch(
        `/api/v1/satellites/${editingSatellite.id}`,
        editingSatellite
      );

      // Update the local state
      setSatellites((prev) =>
        prev.map((sat) =>
          sat.id === editingSatellite.id ? editingSatellite : sat
        )
      );

      toast({
        title: "Satellite updated successfully.",
        description: `Satellite "${editingSatellite.name}" was updated.`,
      });

      // Close the edit dialog
      setIsEditDialogOpen(false);
      setEditingSatellite(null);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error updating satellite.",
        description: "There was an error updating the satellite.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (satelliteId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this satellite?"
    );
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/api/v1/satellites/${satelliteId}`);
      setSatellites((prev) => prev.filter((sat) => sat.id !== satelliteId));
      toast({
        title: "Satellite deleted successfully.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error deleting satellite.",
        description: "There was an error deleting the satellite.",
        variant: "destructive",
      });
    }
  };

  const sortedSatellites = [...satellites].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key as keyof Satellite];
    const bValue = b[sortConfig.key as keyof Satellite];

    // Handle numeric comparisons
    if (
      sortConfig.key === "priority" ||
      sortConfig.key === "uplink" ||
      sortConfig.key === "telemetry" ||
      sortConfig.key === "science"
    ) {
      const aNum = typeof aValue === "number" ? aValue : 0;
      const bNum = typeof bValue === "number" ? bValue : 0;

      return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
    }

    // String comparison for other fields
    return sortConfig.direction === "asc"
      ? String(aValue || "").localeCompare(String(bValue || ""))
      : String(bValue || "").localeCompare(String(aValue || ""));
  });

  const filteredSatellites = sortedSatellites.filter((satellite) => {
    return satellite.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <div>Loading satellites...</div>;
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
      <h3 className="text-xl font-semibold">Satellite Overview</h3>

      <div className="flex gap-4">
        <Input
          placeholder="Search satellites..."
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
                                ["priority", "Priority"],
                                ["uplink", "Uplink"],
                                ["telemetry", "Telemetry"],
                                ["science", "Science"],
                                ["tle", "TLE"],
                            ] as [SortableColumn | string, string][]).map(([key, label]) => (
                                <TableHead key={key} className="px-4 py-3">
                                    {[
                                        "name",
                                        "priority",
                                        "uplink",
                                        "telemetry",
                                        "science",
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
                        {filteredSatellites.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4">
                                    No satellites found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredSatellites.map((satellite) => (
                                <TableRow key={satellite.id}>
                                    <TableCell className="font-medium px-4 py-3">
                                        {formatValue(satellite.name)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(satellite.priority)}</TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(satellite.uplink)}</TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(satellite.telemetry)}</TableCell>
                                    <TableCell className="px-4 py-3">{formatValue(satellite.science)}</TableCell>
                                    <TableCell className="max-w-[200px] truncate px-4 py-3">
                                        {formatValue(satellite.tle)}
                                    </TableCell>
                                    <TableCell className="space-x-2 px-4 py-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(satellite)}
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
            <DialogTitle>Edit Satellite</DialogTitle>
          </DialogHeader>

          {editingSatellite && (
            <div className="grid gap-4 py-4 ">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingSatellite.name}
                  onChange={(e) =>
                    setEditingSatellite({
                      ...editingSatellite,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Input
                  id="priority"
                  type="number"
                  value={editingSatellite.priority}
                  onChange={(e) =>
                    setEditingSatellite({
                      ...editingSatellite,
                      priority: Number(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="uplink" className="text-right">
                  Uplink
                </Label>
                <Input
                  id="uplink"
                  type="number"
                  value={editingSatellite.uplink}
                  onChange={(e) =>
                    setEditingSatellite({
                      ...editingSatellite,
                      uplink: Number(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telemetry" className="text-right">
                  Telemetry
                </Label>
                <Input
                  id="telemetry"
                  type="number"
                  value={editingSatellite.telemetry}
                  onChange={(e) =>
                    setEditingSatellite({
                      ...editingSatellite,
                      telemetry: Number(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="science" className="text-right">
                  Science
                </Label>
                <Input
                  id="science"
                  type="number"
                  value={editingSatellite.science}
                  onChange={(e) =>
                    setEditingSatellite({
                      ...editingSatellite,
                      science: Number(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tle" className="text-right">
                  TLE
                </Label>
                <Textarea
                  id="tle"
                  value={editingSatellite.tle}
                  onChange={(e) =>
                    setEditingSatellite({
                      ...editingSatellite,
                      tle: e.target.value,
                    })
                  }
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
          )}

                    <DialogFooter>
                         <Button
                                  className="mr-[5vw]"
                                    variant="destructive"
                                    onClick={() => {
                                      const confirmDelete = window.confirm(
                                        "Are you sure you want to delete this satellite cone?"
                                      );
                                      if (confirmDelete && editingSatellite) {
                                        handleDelete(editingSatellite.id);
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
                                setEditingSatellite(null);
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

export default SatelliteGeneral;
