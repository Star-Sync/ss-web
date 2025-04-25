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
import {
  ExclusionCone,
  getExclusionCones,
  updateExclusionCone,
  deleteExclusionCone,
  getApiErrorMessage,
} from "@/api/exclusion-cones";
import {
  getSatellitesSafe,
  getApiErrorMessage as getSatelliteApiErrorMessage,
} from "@/api/satellites";
import {
  getGroundStationsSafe,
  getApiErrorMessage as getGroundStationApiErrorMessage,
} from "@/api/ground-stations";
import FormCombobox, { Option } from "@/components/ui/wrapper/comboboxwrapper";
import { useForm, FormProvider } from "react-hook-form";

type SortableColumn =
  | "mission"
  | "angle_limit"
  | "interfering_satellite"
  | "satellite_id"
  | "gs_id";

const ExclusionGeneral: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortableColumn;
    direction: "asc" | "desc";
  } | null>(null);
  const [exCones, setExCones] = useState<ExclusionCone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCone, setEditingCone] = useState<ExclusionCone | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [satelliteOptions, setSatelliteOptions] = useState<Option[]>([]);
  const [interferingSatelliteOptions, setInterferingSatelliteOptions] =
    useState<Option[]>([]);
  const [groundStationOptions, setGroundStationOptions] = useState<Option[]>(
    []
  );

  const form = useForm({
    defaultValues: {
      mission: "",
      angle_limit: 0,
      interfering_satellite: "",
      satellite_id: "",
      gs_id: "",
    },
  });

  useEffect(() => {
    const fetchExclusionCones = async () => {
      setLoading(true);
      try {
        const data = await getExclusionCones();
        setExCones(data);
      } catch (err) {
        const errorMessage = getApiErrorMessage(
          err,
          "Failed to fetch exclusion cones."
        );
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

    fetchExclusionCones();
  }, []);

  useEffect(() => {
    async function fetchSatellites() {
      try {
        const satellites = await getSatellitesSafe();
        const options = satellites.map((sat) => ({
          value: sat.id,
          label: `${sat.name} (${sat.id.slice(0, 5) + "..."})`,
        }));
        setSatelliteOptions(options);

        // Create separate options for interfering satellite using name as value
        const interferingOptions = satellites.map((sat) => ({
          value: sat.name,
          label: `${sat.name} (${sat.id.slice(0, 5) + "..."})`,
        }));
        setInterferingSatelliteOptions(interferingOptions);
      } catch (error) {
        console.error("Failed to fetch satellites", error);
        toast({
          title: "Error Loading Satellites",
          description: getSatelliteApiErrorMessage(
            error,
            "Failed to load satellites. Please try again."
          ),
          variant: "destructive",
          duration: 5000,
        });
      }
    }
    fetchSatellites();
  }, []);

  useEffect(() => {
    async function fetchGroundStations() {
      try {
        const groundStations = await getGroundStationsSafe();
        const options = groundStations.map((gs) => ({
          value: String(gs.id),
          label: `${gs.name} (${gs.id})`,
        }));
        setGroundStationOptions(options);
      } catch (error) {
        console.error("Failed to fetch ground stations", error);
        toast({
          title: "Error Loading Ground Stations",
          description: getGroundStationApiErrorMessage(
            error,
            "Failed to load ground stations. Please try again."
          ),
          variant: "destructive",
          duration: 5000,
        });
      }
    }
    fetchGroundStations();
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

  const handleEdit = (cone: ExclusionCone) => {
    setEditingCone({ ...cone });
    form.reset({
      mission: cone.mission,
      angle_limit: cone.angle_limit,
      interfering_satellite: cone.interfering_satellite,
      satellite_id: cone.satellite_id,
      gs_id: String(cone.gs_id),
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingCone) return;

    const values = form.getValues();
    const updatedCone = {
      ...editingCone,
      mission: values.mission,
      angle_limit: values.angle_limit,
      interfering_satellite: values.interfering_satellite,
      satellite_id: values.satellite_id,
      gs_id: Number(values.gs_id),
    };

    try {
      const result = await updateExclusionCone(editingCone.id, updatedCone);
      setExCones((prev) =>
        prev.map((cone) => (cone.id === editingCone.id ? result : cone))
      );
      toast({
        title: "Exclusion cone updated successfully.",
        description: `Exclusion cone for mission "${updatedCone.mission}" was updated.`,
        variant: "success",
        duration: 5000,
      });
      setIsEditDialogOpen(false);
      setEditingCone(null);
    } catch (err) {
      console.error(err);
      const errorMessage = getApiErrorMessage(
        err,
        "There was an error updating the exclusion cone."
      );
      toast({
        title: "Error updating exclusion cone",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
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
        variant: "success",
        duration: 5000,
      });
    } catch (err) {
      console.error(err);
      const errorMessage = getApiErrorMessage(
        err,
        "There was an error deleting the exclusion cone."
      );
      toast({
        title: "Error deleting exclusion cone",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
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
            <FormProvider {...form}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mission" className="text-right">
                    Mission
                  </Label>
                  <Input
                    id="mission"
                    {...form.register("mission")}
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
                    {...form.register("angle_limit", { valueAsNumber: true })}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="interfering_satellite" className="text-right">
                    Interfering Satellite
                  </Label>
                  <div className="col-span-3">
                    <FormCombobox
                      name="interfering_satellite"
                      label=""
                      placeholder="Select interfering satellite"
                      items={interferingSatelliteOptions}
                      className="mt-0 w-full border-[0.1vw] border-gray-300 rounded-md text-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="satellite_id" className="text-right">
                    Satellite ID
                  </Label>
                  <div className="col-span-3">
                    <FormCombobox
                      name="satellite_id"
                      label=""
                      placeholder="Select a satellite"
                      items={satelliteOptions}
                      className="mt-0 w-full border-[0.1vw] border-gray-300 rounded-md text-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gs_id" className="text-right">
                    GS ID
                  </Label>
                  <div className="col-span-3">
                    <FormCombobox
                      name="gs_id"
                      label=""
                      placeholder="Select a ground station"
                      items={groundStationOptions}
                      className="mt-0 w-full border-[0.1vw] border-gray-300 rounded-md text-gray-700"
                    />
                  </div>
                </div>
              </div>
            </FormProvider>
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
