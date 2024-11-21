import React from "react";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import {Separator} from "@/components/ui/separator";
import {TimePickerField} from "@/components/ui/timepickerfield";
import {locations} from "@/api/gs-locations";
import FormFieldWrapper from "@/components/ui/formfieldwrapper";
import CheckboxFieldWrapper from "@/components/ui/checkboxfieldwrapper";

interface ContactRequestFormProps {
    location: typeof locations[0];
}

const formSchema = z.object({
    missionName: z.string().min(1, "Mission Name is required"),
    satelliteName: z.string().min(1, "Satellite Name is required"),
    station: z.string().min(1, "Station is required"),
    orbit: z.number().positive("Orbit must be a positive number"),
    uplink: z.boolean(),
    telemetry: z.boolean(),
    science: z.boolean(),
    aosTime: z.date({required_error: "AOS Time is required"}),
    rfOnTime: z.date({required_error: "RF On Time is required"}),
    rfOffTime: z.date({required_error: "RF Off Time is required"}),
    losTime: z.date({required_error: "LOS Time is required"}),
});

const ContactRequestForm: React.FC<ContactRequestFormProps> = ({location}: ContactRequestFormProps) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            missionName: "",
            satelliteName: "",
            station: "",
            orbit: 0,
            uplink: false,
            telemetry: false,
            science: false,
            aosTime: null,
            rfOnTime: null,
            rfOffTime: null,
            losTime: null,
        },
    });

    const onSubmit = (values: any) => {
        const payload = {
            ...values,
            aosTime: values.aosTime.toISOString(),
            rfOnTime: values.rfOnTime.toISOString(),
            rfOffTime: values.rfOffTime.toISOString(),
            losTime: values.losTime.toISOString(),
        };
        console.log("Submitted Contact Request: ", payload);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                <Separator className="max-w-[50vw]"/>

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
                        name="satelliteName"
                        label="Satellite Name"
                        placeholder="Enter satellite name"
                    />
                    <FormFieldWrapper
                        control={form.control}
                        name="station"
                        label="Station"
                        placeholder="Enter station"
                    />
                    <FormFieldWrapper
                        control={form.control}
                        name="orbit"
                        label="Orbit"
                        placeholder="Enter orbit number"
                        type="number"
                        onChange={(e) => form.setValue("orbit", parseInt(e.target.value) || 0)}
                    />
                </div>

                <Separator className="max-w-[50vw]"/>
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

                <Separator className="max-w-[50vw]"/>

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
