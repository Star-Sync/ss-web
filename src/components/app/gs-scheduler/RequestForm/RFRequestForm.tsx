import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { Separator } from "@/components/ui/separator";
import { TimePickerField } from "@/components/ui/wrapper/timepickerfield";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import { RFRequestFormSchema, RFRequestFormData } from "./RFRequestFormSchema";
import Combobox from "@/components/ui/combobox";
import { getSatellitesSafe, Satellite } from "@/api/satellites";
import { formatToISOString } from "@/lib/formatToISOString";
import { toast } from "@/hooks/use-toast";
import {
    createRFTimeRequest,
    getApiErrorMessage,
    RFTimeRequest,
} from "@/api/rf-time";

interface RFRequestFormProps {
    closeTab: (tabId: string) => void;
    tabId: string;
}

const RFRequestForm = ({ closeTab, tabId }: RFRequestFormProps) => {
    const [satellites, setSatellites] = useState<Satellite[]>([]);
    const satelliteOptions = satellites.map((sat) => ({
        value: sat.id,
        label: `${sat.name} (${sat.id.slice(0, 5) + "..."})`,
    }));

    useEffect(() => {
        const fetchSatellites = async () => {
            const sats = await getSatellitesSafe();
            setSatellites(sats);
        };
        fetchSatellites();
    }, []);

    const form = useForm<RFRequestFormData>({
        resolver: zodResolver(RFRequestFormSchema),
        defaultValues: {
            missionName: "",
            satelliteId: "",
            startTime: undefined,
            endTime: undefined,
            uplinkTime: 0,
            downlinkTime: 0,
            scienceTime: 0,
            minimumNumberOfPasses: 1,
        },
    });

    const onSubmit = async (values: RFRequestFormData) => {
        if (!values.startTime || !values.endTime) {
            toast({
                title: "Validation Error",
                description: "Start time and end time are required",
                variant: "destructive",
                duration: 5000,
            });
            return;
        }

        const startTime = formatToISOString(values.startTime);
        const endTime = formatToISOString(values.endTime);

        if (!startTime || !endTime) {
            toast({
                title: "Validation Error",
                description: "Invalid date format",
                variant: "destructive",
                duration: 5000,
            });
            return;
        }

        const payload: RFTimeRequest = {
            missionName: values.missionName,
            satelliteId: values.satelliteId,
            startTime,
            endTime,
            uplinkTime: values.uplinkTime,
            downlinkTime: values.downlinkTime,
            scienceTime: values.scienceTime,
            minimumNumberOfPasses: values.minimumNumberOfPasses,
        };

        try {
            const response = await createRFTimeRequest(payload);
            console.log("Successfully submitted:", response);
            toast({
                title: "Success",
                description: `RF time request "${values.missionName}" was successfully created`,
                variant: "success",
                duration: 5000,
            });
            closeTab(tabId);
        } catch (error) {
            console.error("Error submitting RFRequest:", error);
            toast({
                title: "Submission Error",
                description: getApiErrorMessage(
                    error,
                    "Failed to create RF time request!"
                ),
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
                </div>

                <Separator className="max-w-[50vw]" />

                {/* Start and End Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center max-w-[28vw]">
                    <TimePickerField<RFRequestFormData>
                        name="startTime"
                        label="Start Time"
                    />
                    <TimePickerField<RFRequestFormData>
                        name="endTime"
                        label="End Time"
                    />
                </div>

                <Separator className="max-w-[50vw]" />

                {/* Other Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
                    <FormFieldWrapper<RFRequestFormData>
                        control={form.control}
                        name="missionName"
                        label="Mission Name"
                        placeholder="Enter mission name"
                    />
                    <FormFieldWrapper<RFRequestFormData>
                        control={form.control}
                        name="uplinkTime"
                        label="Uplink Time"
                        type="number"
                        step="any"
                        min="0"
                    />
                    <FormFieldWrapper<RFRequestFormData>
                        control={form.control}
                        name="downlinkTime"
                        label="Downlink Time"
                        type="number"
                        step="any"
                        min="0"
                    />
                    <FormFieldWrapper<RFRequestFormData>
                        control={form.control}
                        name="scienceTime"
                        label="Science Time"
                        type="number"
                        step="any"
                        min="0"
                    />
                    <FormFieldWrapper<RFRequestFormData>
                        control={form.control}
                        name="minimumNumberOfPasses"
                        label="Minimum Number of Passes"
                        type="number"
                        step="1"
                        min="1"
                    />
                </div>

                <Separator className="max-w-[50vw]" />

                {/* Submit Button */}
                <Button type="submit" className="w-full md:w-auto">
                    Submit RF Request
                </Button>
            </form>
        </FormProvider>
    );
};

export default RFRequestForm;
