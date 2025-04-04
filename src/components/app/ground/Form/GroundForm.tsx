import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import { GroundFormSchema, GroundFormData } from "./GroundFormSchema";
import { toast } from "@/hooks/use-toast";
import { createGroundStation, getApiErrorMessage } from "@/api/ground-stations";

const GroundForm: React.FC = () => {
    const form = useForm<GroundFormData>({
        resolver: zodResolver(GroundFormSchema),
        defaultValues: {
            groundStationName: "",
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

    const onSubmit = async (values: GroundFormData) => {
        const payload = {
            name: values.groundStationName,
            lat: values.latitude ? String(values.latitude) : "0",
            lon: values.longitude ? String(values.longitude) : "0",
            height: values.height ? String(values.height) : "0",
            mask: values.mask ? Number(values.mask) : 0,
            uplink: values.uplink ? String(values.uplink) : "0",
            downlink: values.downlink ? String(values.downlink) : "0",
            science: values.science ? String(values.science) : "0",
        };

        try {
            await createGroundStation(payload);
            toast({
                title: "Submission Success",
                description: "Ground station successfully created!",
                variant: "success",
                duration: 5000,
            });
            form.reset();
        } catch (error) {
            console.error("Error submitting ground station:", error);
            toast({
                title: "Submission Error",
                description: getApiErrorMessage(error, "Failed to create ground station!"),
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
