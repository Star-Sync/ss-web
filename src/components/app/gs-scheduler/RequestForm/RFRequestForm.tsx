import React, { useEffect } from "react";
import { locations } from "@/api/gs-locations";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { Separator } from "@/components/ui/separator";
import { TimePickerField } from "@/components/ui/wrapper/timepickerfield";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import { RFRequestFormSchema, RFRequestFormData } from "./RFRequestFormSchema";
import Combobox from "@/components/ui/combobox";
import { gsFetchSatellites, Satellite } from "@/api/gs-satellites";
import axios from "axios";
import { formatToISOString } from "@/lib/formatToISOString";
import { toast } from "@/hooks/use-toast";

interface RFRequestFormProps {
    location: typeof locations[0];
}

const RFRequestForm: React.FC<RFRequestFormProps> = ({ location }) => {
    const [satelliteOptions, setSatelliteOptions] = React.useState<{ value: string; label: string; }[]>([]);

    useEffect(() => {
        const fetchSatellites = async () => {
            try {
                console.log('Fetching satellites...');
                const satellites = await gsFetchSatellites();
                console.log('Received satellites:', satellites);
                const options = satellites
                    .filter((sat: Satellite) => sat.id && sat.name)
                    .map((sat: Satellite) => ({
                        value: sat.id,
                        label: sat.name,
                    }));
                console.log('Processed satellite options:', options);
                setSatelliteOptions(options);
            } catch (error) {
                console.error('Error fetching satellites:', error);
                toast({
                    title: "Error",
                    description: "Failed to load satellites",
                    variant: "destructive",
                });
            }
        };
        fetchSatellites();
    }, []);

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
            uplinkTime: 0,
            downlinkTime: 0,
            scienceTime: 0,
            minimumNumberOfPasses: 1,
        },
    });

    // Update form when satellites are loaded
    useEffect(() => {
        if (satelliteOptions.length > 0 && !form.getValues('satelliteId')) {
            form.setValue('satelliteId', satelliteOptions[0].value);
        }
    }, [satelliteOptions, form]);

    const onSubmit = async (values: RFRequestFormData) => {
        const payload = {
            ...values,
            startTime: formatToISOString(values.startTime),
            endTime: formatToISOString(values.endTime),
        };

        // Send the request to the backend using axios
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/v1/request/rf-time', payload);
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
