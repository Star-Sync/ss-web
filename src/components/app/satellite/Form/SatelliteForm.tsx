// SatelliteForm.tsx
import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import { SatelliteFormSchema, SatelliteFormData } from "./SatelliteFormSchema";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const SatelliteForm: React.FC = () => {
    const form = useForm<SatelliteFormData>({
        resolver: zodResolver(SatelliteFormSchema),
        defaultValues: { satelliteName: "" },
      });

    const onSubmit = async (values: SatelliteFormData) => {
        const payload = {
            ...values,
        };

        console.log("Validated values:", values);

        // Send the request to the backend using axios
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL +'/api/v1/request/rf-time', payload);
            console.log('Successfully submitted:', response.data);
            // Handle success
            toast({
                title: "Submission Success",
                description: "Successfully sent!" + response.data,
                variant: "success",
                duration: 5000,
            });
        } catch (error) {
            console.error('Error submitting RFRequest:', error);
            // Handle errors
            toast({
                title: "Submission Error: " + error,
                description: "Failed to submit!",
                variant: "destructive",
                duration: 5000,
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
    console.log('Form errors:', errors);
  })} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
                    <FormFieldWrapper<SatelliteFormData>
                                control={form.control}
                                name="satelliteName"
                                label="Satellite Name"
                                placeholder="Enter satellite Name"
                            />
                </div>
                <Separator className="max-w-[50vw]" />
                {/* Submit Button */}
                <Button type="submit" className="w-full md:w-auto">
                    Submit
                </Button>

            </form>
        </FormProvider>            
    );
};

export default SatelliteForm;
