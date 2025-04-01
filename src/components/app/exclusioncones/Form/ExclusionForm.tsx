import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  ExclusionFormSchema,
  ExclusionFormData,
} from "@/components/app/exclusioncones/Form/ExclusionFormSchema";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import FormCombobox, { Option } from "@/components/ui/wrapper/comboboxwrapper";
import { getSatellitesSafe, getApiErrorMessage as getSatelliteApiErrorMessage } from "@/api/satellites";
import { getGroundStationsSafe, getApiErrorMessage as getGroundStationApiErrorMessage } from "@/api/ground-stations";
import { createExclusionCone, getApiErrorMessage } from "@/api/exclusion-cones";

const ExclusionForm: React.FC = () => {
  const form = useForm<ExclusionFormData>({
    resolver: zodResolver(ExclusionFormSchema),
    defaultValues: {
      mission: "",
      angle_limit: 0,
      interfering_satellite: "",
      satellite_id: "",
      gs_id: 0,
    },
  });

  // Option states for Satellite and Ground Station selection.
  const [satelliteOptions, setSatelliteOptions] = useState<Option[]>([]);
  const [interferingSatelliteOptions, setInterferingSatelliteOptions] = useState<Option[]>([]);
  const [groundStationOptions, setGroundStationOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchSatellites() {
      try {
        const satellites = await getSatellitesSafe();
        const options = satellites.map((sat) => ({
          value: sat.id,
          label: `${sat.name} (${sat.id.slice(0, 5) + "..."})`
        }));
        setSatelliteOptions(options);
        
        // Create separate options for interfering satellite using name as value
        const interferingOptions = satellites.map((sat) => ({
          value: sat.name,
          label: `${sat.name} (${sat.id.slice(0, 5) + "..."})`
        }));
        setInterferingSatelliteOptions(interferingOptions);
      } catch (error) {
        console.error("Failed to fetch satellites", error);
        toast({
          title: "Error Loading Satellites",
          description: getSatelliteApiErrorMessage(error, "Failed to load satellites. Please try again."),
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
          label: `${gs.name} (${gs.id})`
        }));
        setGroundStationOptions(options);
      } catch (error) {
        console.error("Failed to fetch ground stations", error);
        toast({
          title: "Error Loading Ground Stations",
          description: getGroundStationApiErrorMessage(error, "Failed to load ground stations. Please try again."),
          variant: "destructive",
          duration: 5000,
        });
      }
    }
    fetchGroundStations();
  }, []);

  const onSubmit = async (values: ExclusionFormData) => {
    try {
      await createExclusionCone(values);
      toast({
        title: "Success",
        description: `Exclusion cone "${values.mission}" was successfully created`,
        variant: "success",
        duration: 5000,
      });
      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error submitting exclusion cone:", error);
      toast({
        title: "Submission Error",
        description: getApiErrorMessage(error, "Failed to create exclusion cone!"),
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
          <FormFieldWrapper<ExclusionFormData>
            control={form.control}
            name="mission"
            label="Mission"
            placeholder="Enter mission name"
          />
          <FormCombobox
            name="interfering_satellite"
            label="Interfering Satellite"
            placeholder="Select interfering satellite"
            items={interferingSatelliteOptions}
            className="mt-2 w-full border-[0.1vw] border-gray-300 rounded-md text-gray-700"
          />
        </div>
        <Separator className="max-w-[50vw]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[50vw]">
          <FormFieldWrapper<ExclusionFormData>
            control={form.control}
            name="angle_limit"
            label="Angle Limit"
            placeholder="Enter angle limit"
            type="number"
          />
          <FormCombobox
            name="satellite_id"
            label="Satellite"
            placeholder="Select a satellite"
            items={satelliteOptions}
            className="mt-2 w-full border-[0.1vw] border-gray-300 rounded-md text-gray-700"
          />
          <FormCombobox
            name="gs_id"
            label="Ground Station"
            placeholder="Select a ground station"
            items={groundStationOptions}
            className="mt-2 w-full border-[0.1vw] border-gray-300 rounded-md text-gray-700"
          />
        </div>
        <Separator className="max-w-[50vw]" />
        <Button type="submit" className="w-full md:w-auto">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default ExclusionForm;
