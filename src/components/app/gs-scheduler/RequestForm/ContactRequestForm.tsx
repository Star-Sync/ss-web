import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { Separator } from "@/components/ui/separator";
import { TimePickerField } from "@/components/ui/wrapper/timepickerfield";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import CheckboxFieldWrapper from "@/components/ui/wrapper/checkboxfieldwrapper";
import {
  ContactRequestFormSchema,
  ContactRequestFormData,
} from "./ContactRequestFormSchema";
import Combobox from "@/components/ui/combobox";
import { getSatellites, Satellite } from "@/api/gs-satellites";
import { getLocations, Location } from "@/api/gs-locations";
import { formatToISOString } from "@/lib/formatToISOString";
import apiClient from "@/lib/api";
import { toast } from "@/hooks/use-toast";



const ContactRequestForm = ({ }) => {
   const [groundStations, setGroundStations] = useState<Location[]>([]);
   const [satellites, setSatellites] = useState<Satellite[]>([]);
   
    // Transform ground stations into combobox format
    const groundStationOptions = groundStations.map((station) => ({
      value: station.id.toString(),
      label: station.name,
    }));

    const satelliteOptions = satellites.map((sat) => ({
      value: sat.id.toString(),
      label: sat.name,
    }));
  
    useEffect(() => {
      const fetchGroundStations = async () => {
        const stations = await getLocations();
        setGroundStations(stations);
      };
      fetchGroundStations();
    }, []);

    useEffect(() => {
      const fetchSatellites = async () => {
        const sats = await getSatellites();
        setSatellites(sats);
      };
      fetchSatellites();
    }
, []);

  const form = useForm<ContactRequestFormData>({
    resolver: zodResolver(ContactRequestFormSchema),
    defaultValues: {
      missionName: "",
      satelliteId: "",
      groundStationId: "",
      orbit: "",
      uplink: false,
      telemetry: false,
      science: false,
      aosTime: undefined,
      rfOnTime: undefined,
      rfOffTime: undefined,
      losTime: undefined,
    },
  });

  const onSubmit = async (values: ContactRequestFormData) => {
    const payload = {
      ...values,
      aosTime: formatToISOString(values.aosTime),
      rfOnTime: formatToISOString(values.rfOnTime),
      rfOffTime: formatToISOString(values.rfOffTime),
      losTime: formatToISOString(values.losTime),
    };
    // Send the request to the backend using apiClient
    try {
      const response = await apiClient.post("/api/v1/request/contact", payload);
      console.log("Successfully submitted:", response.data);

      // Handle success
      toast({
        title: "Submission Success",
        description: "Successfully sent!",
        variant: "success",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error submitting ContactRequest:", error);
      // Handle errors
      toast({
        title: "Submission Error: " + error,
        description:
          "There was an error submitting the contact request. Please try again.",
        variant: "destructive",
        duration: 5000,
        
      });
      console.log(payload);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Satellite Combobox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[25vw]">
          <Controller
            name="satelliteId"
            control={form.control}
            render={({ field }) => (
              <Combobox
                items={satelliteOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select a Satellite"
                className="text-black"
              />
            )}
          />
                  {/* Ground Station Combobox */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[25vw]">
                    <Controller
                      name="groundStationId"
                      control={form.control}
                      render={({ field }) => (
                        <Combobox
                          items={groundStationOptions}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select a Ground Station"
                          className="text-black"
                        />
                      )}
                    />
                  </div>
        </div>
        

        <Separator className="max-w-[50vw]" />

        {/* Time Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[28vw]">
          <TimePickerField name="aosTime" label="AOS Time" />
          <TimePickerField name="losTime" label="LOS Time" />
          <TimePickerField name="rfOnTime" label="RF On Time" />
          <TimePickerField name="rfOffTime" label="RF Off Time" />
        </div>

        <Separator className="max-w-[50vw]" />

        {/* Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
          <FormFieldWrapper<ContactRequestFormData>
            control={form.control}
            name="missionName"
            label="Mission Name"
            placeholder="Enter mission name"
          />
          <FormFieldWrapper<ContactRequestFormData>
            control={form.control}
            name="orbit"
            label="Orbit"
            placeholder="Enter orbit number"
          />
        </div>

        <Separator className="max-w-[50vw]" />

        {/* Boolean Flags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[50vw]">
          <CheckboxFieldWrapper
            control={form.control}
            name="uplink"
            label="Uplink"
          />
          <CheckboxFieldWrapper
            control={form.control}
            name="telemetry"
            label="Telemetry"
          />
          <CheckboxFieldWrapper
            control={form.control}
            name="science"
            label="Science"
          />
        </div>

        <Separator className="max-w-[50vw]" />

        {/* Submit Button */}
        <Button type="submit" className="w-full md:w-auto">
          Submit Contact Request
        </Button>
      </form>
    </FormProvider>
  );
};

export default ContactRequestForm;
