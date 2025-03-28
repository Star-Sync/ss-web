import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import { GroundFormSchema, GroundFormData } from "./GroundFormSchema";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const GroundForm: React.FC = () => {
    const form = useForm<GroundFormData>({
        resolver: zodResolver(GroundFormSchema),
        defaultValues: {
            groundStationName: "",
            // location: "",
            // priority: undefined,
            latitude: undefined,
            longitude: undefined,
            height: undefined,
            mask: undefined,
            uplink: undefined,
            downlink: undefined,
            science: undefined,
            maintenanceWindow: "",
        },
    });
    console.log("Form Errors:", form.formState.errors);

    const onSubmit = async (values: GroundFormData) => {
        console.log(" Form submitted!"); //  Step 1: Debugging

        const payload = {
            name: values.groundStationName,  //  Ensure correct key
            lat: values.latitude ? Number(values.latitude) : undefined,   // Match API schema
            lon: values.longitude ? Number(values.longitude) : undefined,
            height: values.height ? Number(values.height) : undefined,
            mask: values.mask ? Number(values.mask) : undefined,
            uplink: values.uplink ? Number(values.uplink) : undefined,
            downlink: values.downlink ? Number(values.downlink) : undefined,
            science: values.science ? Number(values.science) : undefined,
        };

        console.log(" Sending request with payload:", payload); //  Step 2: Debug API request

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/v1/gs/";
            console.log("API URL:", apiUrl); // Step 2: Confirm URL is correct

            const response = await axios.post(apiUrl, payload);
            console.log(" Successfully submitted:", response.data); //  Step 2: Log response

            toast({
                title: "Submission Success",
                description: "Successfully sent!",
                variant: "success",
                duration: 5000,
            });
        } catch (error) {
            console.error("Error submitting GroundRequest:", error);
            toast({
                title: "Submission Error",
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
                    <FormFieldWrapper<GroundFormData>
                        control={form.control}
                        name="groundStationName"
                        label="Ground Station Name"
                        placeholder="Enter ground station name"
                    />
                </div>
                <Separator className="max-w-[50vw]" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
                    <Controller
                        name="latitude"
                        control={form.control}
                        render={({ field }) => (
                            <FormFieldWrapper<GroundFormData>
                                {...field}
                                control={form.control}
                                label="Latitude"
                                placeholder="Enter latitude"
                                type="number"
                                step="any"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                    <Controller
                        name="longitude"
                        control={form.control}
                        render={({ field }) => (
                            <FormFieldWrapper<GroundFormData>
                                {...field}
                                control={form.control}
                                label="Longitude"
                                placeholder="Enter longitude"
                                type="number"
                                step="any"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                </div>
                <Separator className="max-w-[50vw]" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
                    <Controller
                        name="height"
                        control={form.control}
                        render={({ field }) => (
                            <FormFieldWrapper<GroundFormData>
                                {...field}
                                control={form.control}
                                label="Height"
                                placeholder="Enter height"
                                type="number"
                                step="any"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                    <Controller
                        name="mask"
                        control={form.control}
                        render={({ field }) => (
                            <FormFieldWrapper<GroundFormData>
                                {...field}
                                control={form.control}
                                label="Mask"
                                placeholder="Enter mask value"
                                type="number"
                                step="any"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                </div>
                <Separator className="max-w-[50vw]" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
                    <Controller
                        name="uplink"
                        control={form.control}
                        render={({ field }) => (
                            <FormFieldWrapper<GroundFormData>
                                {...field}
                                control={form.control}
                                label="Uplink"
                                placeholder="Enter uplink rate"
                                type="number"
                                step="any"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                    <Controller
                        name="downlink"
                        control={form.control}
                        render={({ field }) => (
                            <FormFieldWrapper<GroundFormData>
                                {...field}
                                control={form.control}
                                label="Downlink"
                                placeholder="Enter downlink rate"
                                type="number"
                                step="any"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
                    />
                </div>
                <Separator className="max-w-[50vw]" />

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-[50vw]">
                    <Controller
                        name="science"
                        control={form.control}
                        render={({ field }) => (
                            <FormFieldWrapper<GroundFormData>
                                {...field}
                                control={form.control}
                                label="Science Data Rate"
                                placeholder="Enter science data rate"
                                type="number"
                                step="any"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                        )}
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

export default GroundForm;
