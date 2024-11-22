import React, {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { Separator } from "@/components/ui/separator";
import { TimePickerField } from "@/components/ui/timepickerfield";
import { locations } from "@/api/gs-locations";
import FormFieldWrapper from "@/components/ui/formfieldwrapper";
import CheckboxFieldWrapper from "@/components/ui/checkboxfieldwrapper";
import { ContactRequestFormSchema, ContactRequestFormData } from "./ContactRequestFormSchema";
import Combobox from "@/components/ui/combobox";
import { satellites } from "@/api/gs-satellites";

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
    }, []);

    const form = useForm<ContactRequestFormData>({
        resolver: zodResolver(ContactRequestFormSchema),
        defaultValues: {
            missionName: "",
            satelliteId: satelliteOptions[0]?.value || "",
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

    const onSubmit = (values: ContactRequestFormData) => {
        const payload = {
            ...values,
            aosTime: values.aosTime?.toISOString(),
            rfOnTime: values.rfOnTime?.toISOString(),
            rfOffTime: values.rfOffTime?.toISOString(),
            losTime: values.losTime?.toISOString(),
            location: location.label,
            satellite_id: values.satelliteId,
        };
        console.log("Submitted Contact Request for: ", location.label, payload);
    };

    const handleError = (errors: any) => {
        console.error("Validation Errors:", errors);
    };

    return (
        <Form {...form}>
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
                        control={form.control}
                    />
                    <TimePickerField
                        name="losTime"
                        label="LOS Time"
                        control={form.control}
                    />
                    <TimePickerField
                        name="rfOnTime"
                        label="RF On Time"
                        control={form.control}
                    />
                    <TimePickerField
                        name="rfOffTime"
                        label="RF Off Time"
                        control={form.control}
                    />
                </div>

                <Separator className="max-w-[50vw]" />

                {/* Text Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[50vw]">
                    <FormFieldWrapper
                        control={form.control}
                        name="missionName"
                        label="Mission Name"
                        placeholder="Enter mission name"
                    />
                    <FormFieldWrapper
                        control={form.control}
                        name="orbit"
                        label="Orbit"
                        placeholder="Enter orbit number"
                        type="number"
                        onChange={(e) =>
                            form.setValue("orbit", parseInt(e.target.value) || 0)
                        }
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
        </Form>
    );
};

export default ContactRequestForm;
