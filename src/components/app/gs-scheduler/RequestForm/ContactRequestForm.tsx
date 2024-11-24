import React, {useEffect} from "react";
import {Controller, FormProvider, useForm} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { Separator } from "@/components/ui/separator";
import { TimePickerField } from "@/components/ui/wrapper/timepickerfield";
import { locations } from "@/api/gs-locations";
import FormFieldWrapper from "@/components/ui/wrapper/formfieldwrapper";
import CheckboxFieldWrapper from "@/components/ui/wrapper/checkboxfieldwrapper";
import { ContactRequestFormSchema, ContactRequestFormData } from "./ContactRequestFormSchema";
import Combobox from "@/components/ui/combobox";
import { satellites } from "@/api/gs-satellites";
import {formatToISOString} from "@/lib/formatToISOString";
import axios from "axios";
import {toast} from "@/hooks/use-toast";

interface ContactRequestFormProps {
    location: typeof locations[0];
}

const satelliteOptions = satellites
    .filter(sat => sat.satellite_id && sat.label)
    .map((sat) => ({
        value: sat.satellite_id.toString(),
        label: sat.label,
    }));

const ContactRequestForm: React.FC<ContactRequestFormProps> = ({ location }) => {
    useEffect(() => {
        console.log("ContactRequestForm: Location updated to", location.label);
    }, [location]);

    const form = useForm<ContactRequestFormData>({
        resolver: zodResolver(ContactRequestFormSchema),
        defaultValues: {
            missionName: "",
            satelliteId: satelliteOptions[0]?.value || "",
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
            location: location.label,
            satellite_id: values.satelliteId,
        };
        // Send the request to the backend using axios
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/request/contact', payload);
            console.log('Successfully submitted:', response.data);
            // Handle success
            toast({
                title: "Submission Success",
                description: "Sucessfully sent!",
                variant: "success",
            });
        } catch (error) {
            console.error('Error submitting ContactRequest:', error);
            // Handle errors
            toast({
                title: "Submission Error: " + error,
                description: "There was an error submitting the contact request. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleError = (errors: any) => {
        console.error("Validation Errors:", errors);
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, handleError)} className="space-y-6">
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

                {/* Time Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[28vw]">
                    <TimePickerField
                        name="aosTime"
                        label="AOS Time"
                    />
                    <TimePickerField
                        name="losTime"
                        label="LOS Time"
                    />
                    <TimePickerField
                        name="rfOnTime"
                        label="RF On Time"
                    />
                    <TimePickerField
                        name="rfOffTime"
                        label="RF Off Time"
                    />
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

                <p className="text-sm text-gray-600">Location: {location.label}</p>

                {/* Submit Button */}
                <Button type="submit" className="w-full md:w-auto">
                    Submit Contact Request
                </Button>
            </form>
        </FormProvider>
    );
};

export default ContactRequestForm;
