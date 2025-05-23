// SatelliteForm.tsx
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import { SatelliteFormSchema, SatelliteFormData } from "./SatelliteFormSchema";
import { toast } from "@/hooks/use-toast";
import { createSatellite, getApiErrorMessage } from "@/api/satellites";

interface SatelliteFormProps {
  closeTab: (tabId: string) => void;
  tabId: string;
}

const SatelliteForm: React.FC<SatelliteFormProps> = ({ closeTab, tabId }) => {
  const form = useForm<SatelliteFormData>({
    resolver: zodResolver(SatelliteFormSchema),
    defaultValues: {
      name: "",
      tle: "",
      uplink: 0,
      telemetry: 0,
      science: 0,
      priority: 1,
    },
  });

  const onSubmit = async (values: SatelliteFormData) => {
    try {
      await createSatellite(values);
      toast({
        title: "Submission Success",
        description: "Satellite successfully created!",
        variant: "success",
        duration: 5000,
      });
      closeTab(tabId);
    } catch (error) {
      console.error("Error submitting satellite:", error);
      toast({
        title: "Submission Error",
        description: getApiErrorMessage(error, "Failed to create satellite!"),
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
          <FormFieldWrapper<SatelliteFormData>
            control={form.control}
            name="name"
            label="Satellite Name"
            placeholder="Enter satellite name"
          />
          <FormFieldWrapper<SatelliteFormData>
            control={form.control}
            name="priority"
            label="Priority"
            placeholder="Enter priority"
            type="number"
          />
        </div>
        <Separator className="max-w-[50vw]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[50vw]">
          <FormFieldWrapper<SatelliteFormData>
            control={form.control}
            name="uplink"
            label="Uplink Rate"
            placeholder="Enter uplink rate"
            type="number"
          />
          <FormFieldWrapper<SatelliteFormData>
            control={form.control}
            name="telemetry"
            label="Telemetry Downlink Rate"
            placeholder="Enter downlink rate"
            type="number"
          />
          <FormFieldWrapper<SatelliteFormData>
            control={form.control}
            name="science"
            label="Science Downlink Rate"
            placeholder="Enter science downlink rate"
            type="number"
          />
        </div>
        <Separator className="max-w-[50vw]" />
        <div className="grid grid-cols-1 gap-4 max-w-[50vw]">
          <FormFieldWrapper<SatelliteFormData>
            control={form.control}
            name="tle"
            label="Two Line Element (TLE)"
            placeholder="Enter TLE"
            isMultiline={true}
            className="h-auto resize-none max-h-[5vw]"
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

export default SatelliteForm;
