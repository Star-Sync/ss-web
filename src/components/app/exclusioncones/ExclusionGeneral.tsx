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
import { ExclusionCone, getExclusionCones, updateExclusionCone, deleteExclusionCone } from "@/api/exclusion-cones";

type SortableColumn = "mission" | "angle_limit" | "interfering_satellite" | "satellite_id" | "gs_id";

const ExclusionGeneral: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<
    { key: SortableColumn; direction: "asc" | "desc" } | null
  >(null);
  const [exCones, setExCones] = useState<ExclusionCone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCone, setEditingCone] = useState<ExclusionCone | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchExclusionCones = async () => {
      setLoading(true);
      try {
        const data = await getExclusionCones();
        setExCones(data);
      } catch (err) {
        setError("Failed to fetch exclusion cones.");
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

    fetchExclusionCones();
  }, []);

  const handleSort = (key: SortableColumn) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (cone: ExclusionCone) => {
    setEditingCone({ ...cone });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingCone) return;

    try {
      const updatedCone = await updateExclusionCone(editingCone.id, editingCone);
      setExCones((prev) =>
        prev.map((cone) => (cone.id === editingCone.id ? updatedCone : cone))
      );
      toast({
        title: "Exclusion cone updated successfully.",
        description: `Exclusion cone for mission "${editingCone.mission}" was updated.`,
        variant: "success",
        duration: 5000,
      });
      setIsEditDialogOpen(false);
      setEditingCone(null);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error updating exclusion cone.",
        description: "There was an error updating the exclusion cone.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (coneId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this exclusion cone?"
    );
    if (!confirmDelete) return;

    try {
      await deleteExclusionCone(coneId);
      setExCones((prev) => prev.filter((cone) => cone.id !== coneId));
      toast({
        title: "Exclusion cone deleted successfully.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error deleting exclusion cone.",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const sortedCones = [...exCones].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key as keyof ExclusionCone];
    const bValue = b[sortConfig.key as keyof ExclusionCone];

    if (sortConfig.key === "angle_limit" || sortConfig.key === "gs_id") {
      const aNum = typeof aValue === "number" ? aValue : 0;
      const bNum = typeof bValue === "number" ? bValue : 0;
      return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
    }

    return sortConfig.direction === "asc"
      ? String(aValue || "").localeCompare(String(bValue || ""))
      : String(bValue || "").localeCompare(String(aValue || ""));
  });

  const filteredCones = sortedCones.filter((cone) => {
    return cone.mission.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatValue = (value: any) => {
    if (value === undefined || value === null) return "-";
    return value.toString();
  };

  if (loading) {
    return <div>Loading exclusion cones...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-xl font-semibold">Exclusion Cones Overview</h3>

      <div className="flex gap-4">
        <Input
          placeholder="Search by mission..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {(
                [
                  ["mission", "Mission"],
                  ["angle_limit", "Angle Limit"],
                  ["interfering_satellite", "Interfering Satellite"],
                  ["satellite_id", "Satellite ID"],
                  ["gs_id", "GS ID"],
                ] as [SortableColumn, string][]
              ).map(([key, label]) => (
                <TableHead key={key} className="px-4 py-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(key)}
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
                </TableHead>
              ))}
              <TableHead key="actions" className="px-4 py-3">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCones.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No exclusion cones found
                </TableCell>
              </TableRow>
            ) : (
              filteredCones.map((cone) => (
                <TableRow key={cone.id}>
                  <TableCell className="font-medium px-4 py-3">
                    {formatValue(cone.mission)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {formatValue(cone.angle_limit)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {formatValue(cone.interfering_satellite)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {formatValue(cone.satellite_id)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {formatValue(cone.gs_id)}
                  </TableCell>
                  <TableCell className="space-x-2 px-4 py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(cone)}
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
            <DialogTitle>Edit Exclusion Cone</DialogTitle>
          </DialogHeader>

          {editingCone && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mission" className="text-right">
                  Mission
                </Label>
                <Input
                  id="mission"
                  value={editingCone.mission}
                  onChange={(e) =>
                    setEditingCone({
                      ...editingCone,
                      mission: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="angle_limit" className="text-right">
                  Angle Limit
                </Label>
                <Input
                  id="angle_limit"
                  type="number"
                  value={editingCone.angle_limit}
                  onChange={(e) =>
                    setEditingCone({
                      ...editingCone,
                      angle_limit: Number(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="interfering_satellite"
                  className="text-right"
                >
                  Interfering Satellite
                </Label>
                <Input
                  id="interfering_satellite"
                  value={editingCone.interfering_satellite}
                  onChange={(e) =>
                    setEditingCone({
                      ...editingCone,
                      interfering_satellite: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="satellite_id" className="text-right">
                  Satellite ID
                </Label>
                <Input
                  id="satellite_id"
                  value={editingCone.satellite_id}
                  onChange={(e) =>
                    setEditingCone({
                      ...editingCone,
                      satellite_id: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gs_id" className="text-right">
                  GS ID
                </Label>
                <Input
                  id="gs_id"
                  type="number"
                  value={editingCone.gs_id}
                  onChange={(e) =>
                    setEditingCone({
                      ...editingCone,
                      gs_id: Number(e.target.value),
                    })
                  }
                  className="col-span-3"
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
                "Are you sure you want to delete this exclusion cone?"
              );
              if (confirmDelete && editingCone) {
                handleDelete(editingCone.id);
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
                setEditingCone(null);
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

export default ExclusionGeneral;
