// SatelliteForm.tsx
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import { ExclusionFormSchema, ExclusionFormData } from "@/components/app/exclusioncones/Form/ExclusionFormSchema";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const ExclusionForm: React.FC = () => {
    const form = useForm<ExclusionFormData>({
        resolver: zodResolver(ExclusionFormSchema),
        defaultValues: {
            name: "",
            tle: "",
            uplink: 0,
            telemetry: 0,
            science: 0,
            priority: 1,
        },
    });

    const onSubmit = async (values: ExclusionFormData) => {
        const payload = { ...values };

        console.log("Validated values:", values);

        try {
            const response = await axios.post(
                process.env.NEXT_PUBLIC_API_URL + "/api/v1/satellites/",
                payload
            );
            console.log("Successfully submitted:", response.data);
            toast({
                title: "Submission Success",
                description: "Successfully sent! " + response.data,
                variant: "success",
                duration: 5000,
            });
        } catch (error) {
            console.error("Error submitting Satellite:", error);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
                    <FormFieldWrapper<ExclusionFormData>
                        control={form.control}
                        name="name"
                        label="Satellite Name"
                        placeholder="Enter satellite name"
                    />
                    <FormFieldWrapper<ExclusionFormData>
                        control={form.control}
                        name="priority"
                        label="Priority"
                        placeholder="Enter priority"
                        type="number"
                    />
                </div>
                <Separator className="max-w-[50vw]" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[50vw]">
                    <FormFieldWrapper<ExclusionFormData>
                        control={form.control}
                        name="uplink"
                        label="Uplink Rate"
                        placeholder="Enter uplink rate"
                        type="number"
                    />
                    <FormFieldWrapper<ExclusionFormData>
                        control={form.control}
                        name="telemetry"
                        label="Telemetry Downlink Rate"
                        placeholder="Enter downlink rate"
                        type="number"
                    />
                    <FormFieldWrapper<ExclusionFormData>
                        control={form.control}
                        name="science"
                        label="Science Downlink Rate"
                        placeholder="Enter science downlink rate"
                        type="number"
                    />
                </div>
                <Separator className="max-w-[50vw]" />
                <div className="grid grid-cols-1 gap-4 max-w-[50vw]">
                    <FormFieldWrapper<ExclusionFormData>
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

export default ExclusionForm;
