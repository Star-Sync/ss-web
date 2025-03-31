import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import {
  ExclusionFormSchema,
  ExclusionFormData,
} from "@/components/app/exclusioncones/Form/ExclusionFormSchema";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import FormCombobox, { Option } from "@/components/ui/wrapper/comboboxwrapper";

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
  const [groundStationOptions, setGroundStationOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchSatellites() {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/satellites"
        );
        // Map the API response so that:
        // - value is set to the satellite's "id"
        // - label is set to the satellite's "name"
        const options = response.data.map((sat: any) => ({
          value: sat.id,
          label: `${sat.name} (${sat.id.slice(0, 5) + "..."})`
        }));
        setSatelliteOptions(options);
      } catch (error) {
        console.error("Failed to fetch satellites", error);
      }
    }
    fetchSatellites();
  }, []);

  useEffect(() => {
    async function fetchGroundStations() {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/gs"
        );
        // Map the API response so that:
        // - value is set to the ground station's "id" (converted to a string)
        // - label is set to the ground station's "name"
        const options = response.data.map((gs: any) => ({
          value: String(gs.id),
          label: gs.name,
        }));
        setGroundStationOptions(options);
      } catch (error) {
        console.error("Failed to fetch ground stations", error);
      }
    }
    fetchGroundStations();
  }, []);

  const onSubmit = async (values: ExclusionFormData) => {
    // The payload will have the following structure:
    // {
    //   mission: "SCISAT",
    //   angle_limit: 5,
    //   interfering_satellite: "OTHER SAT",
    //   satellite_id: "bd9aa11b-4502-4f2c-958d-140ccb750d96",
    //   gs_id: 1
    // }
    const payload = { ...values };

    console.log("Validated values:", values);

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/excones/",
        payload
      );
      console.log("Successfully submitted:", response.data);
      toast({
        title: "Submission Success",
        description: "Exclusion cone successfully created!",
        variant: "success",
        duration: 5000,
      });
      // Optionally reset the form.
      form.reset();
    } catch (error) {
      console.error("Error submitting exclusion cone:", error);
      toast({
        title: "Submission Error: " + error,
        description: "Failed to create exclusion cone!",
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
          <FormFieldWrapper<ExclusionFormData>
            control={form.control}
            name="interfering_satellite"
            label="Interfering Satellite"
            placeholder="Enter interfering satellite"
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
