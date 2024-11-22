import React, { useEffect } from "react";
import { locations } from "@/api/gs-locations";
import { useForm, Controller } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { Separator } from "@/components/ui/separator";
import { TimePickerField } from "@/components/ui/timepickerfield";
import FormFieldWrapper from "@/components/ui/formfieldwrapper";
import { RFRequestFormSchema, RFRequestFormData } from "./RFRequestFormSchema";
import Combobox from "@/components/ui/combobox";
import { satellites } from "@/api/gs-satellites";

interface RFRequestFormProps {
    location: typeof locations[0];
}

const satelliteOptions = satellites
    .filter((sat) => sat.satellite_id && sat.label)
    .map((sat) => ({
        value: sat.satellite_id.toString(),
        label: sat.label,
    }));

const RFRequestForm: React.FC<RFRequestFormProps> = ({ location }) => {
    useEffect(() => {
        console.log("RFRequestForm: Location updated to", location.label);
    }, [location]);

    const form = useForm<RFRequestFormData>({
        resolver: zodResolver(RFRequestFormSchema),
        defaultValues: {
            missionName: "",
            satelliteId: "",
            startTime: undefined,
            endTime: undefined,
            uplinkTimeRequested: 0,
            downlinkTime: 0,
            scienceTime: 0,
            minimumNumberOfPasses: 1,
        },
    });

    const onSubmit = (values: RFRequestFormData) => {
        const payload = {
            ...values,
            startTime: new Date(
                Date.UTC(
                    values.startTime.getFullYear(),
                    values.startTime.getMonth(),
                    values.startTime.getDate(),
                    values.startTime.getHours(),
                    values.startTime.getMinutes(),
                    values.startTime.getSeconds()
                )
            ).toISOString(),
            endTime: new Date(
                Date.UTC(
                    values.endTime.getFullYear(),
                    values.endTime.getMonth(),
                    values.endTime.getDate(),
                    values.endTime.getHours(),
                    values.endTime.getMinutes(),
                    values.endTime.getSeconds()
                )
            ).toISOString(),
            location: location.label,
            satellite_id: values.satelliteId,
        };
        console.log("Submitted RFRequest for: ", location.label, " ", payload);
    };

    return (
        <Form {...form}>
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

                {/* Start and End Time at the top */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center max-w-[28vw]">
                    <TimePickerField
                        name="startTime"
                        label="Start Time"
                        control={form.control}
                    />
                    <TimePickerField
                        name="endTime"
                        label="End Time"
                        control={form.control}
                    />
                </div>

                <Separator className="max-w-[50vw]" />

                {/* Other fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
                    <FormFieldWrapper
                        control={form.control}
                        name="missionName"
                        label="Mission Name"
                        placeholder="Enter mission name"
                    />
                    <FormFieldWrapper
                        control={form.control}
                        name="uplinkTimeRequested"
                        label="Uplink Time Requested"
                        type="number"
                        step="any"
                        min="0"
                    />
                    <FormFieldWrapper
                        control={form.control}
                        name="downlinkTime"
                        label="Downlink Time"
                        type="number"
                        step="any"
                        min="0"
                    />
                    <FormFieldWrapper
                        control={form.control}
                        name="scienceTime"
                        label="Science Time"
                        type="number"
                        step="any"
                        min="0"
                    />
                    <FormFieldWrapper
                        control={form.control}
                        name="minimumNumberOfPasses"
                        label="Minimum Number of Passes"
                        type="number"
                        step="1"
                        min="1"
                    />
                </div>

                <Separator className="max-w-[50vw]" />

                {/* Location Display */}
                <p className="text-sm text-gray-600">Location: {location.label}</p>

                {/* Submit Button */}
                <Button type="submit" className="w-full md:w-auto">
                    Submit RF Request
                </Button>
            </form>
        </Form>
    );
};

export default RFRequestForm;
