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
import { getSatellitesSafe, Satellite } from "@/api/satellites";
import { getGroundStationsSafe, Ground } from "@/api/ground-stations";
import { formatToISOString } from "@/lib/formatToISOString";
import { toast } from "@/hooks/use-toast";
import { createContactRequest, getApiErrorMessage, ContactRequest } from "@/api/contact-requests";

const ContactRequestForm = ({ }) => {
   const [groundStations, setGroundStations] = useState<Ground[]>([]);
   const [satellites, setSatellites] = useState<Satellite[]>([]);
   
    // Transform ground stations into combobox format
    const groundStationOptions = groundStations.map((station) => ({
      value: station.id.toString(),
      label: station.name,
    }));

    const satelliteOptions = satellites.map((sat) => ({
      value: sat.id,
      label: `${sat.name} (${sat.id.slice(0, 5) + "..."})`,
    }));
  
    useEffect(() => {
      const fetchGroundStations = async () => {
        const stations = await getGroundStationsSafe();
        setGroundStations(stations);
      };
      fetchGroundStations();
    }, []);

    useEffect(() => {
      const fetchSatellites = async () => {
        const sats = await getSatellitesSafe();
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
      station_id: "",
      orbit: 0,
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
    if (!values.aosTime || !values.losTime || !values.rfOnTime || !values.rfOffTime) {
      toast({
        title: "Validation Error",
        description: "All time fields are required",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    const aosTime = formatToISOString(values.aosTime);
    const losTime = formatToISOString(values.losTime);
    const rfOnTime = formatToISOString(values.rfOnTime);
    const rfOffTime = formatToISOString(values.rfOffTime);

    if (!aosTime || !losTime || !rfOnTime || !rfOffTime) {
      toast({
        title: "Validation Error",
        description: "Invalid date format",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    const payload: ContactRequest = {
      missionName: values.missionName,
      satelliteId: values.satelliteId,
      station_id: values.station_id,
      orbit: values.orbit,
      uplink: values.uplink,
      telemetry: values.telemetry,
      science: values.science,
      aosTime,
      losTime,
      rfOnTime,
      rfOffTime,
    };

    try {
      const response = await createContactRequest(payload);
      console.log("Successfully submitted:", response);
      toast({
        title: "Success",
        description: `Contact request "${values.missionName}" was successfully created`,
        variant: "success",
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting ContactRequest:", error);
      toast({
        title: "Submission Error",
        description: getApiErrorMessage(error, "Failed to create contact request!"),
        variant: "destructive",
        duration: 5000,
      });
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
                      name="station_id"
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
            type="number"
            min="0"
            step="1"
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
