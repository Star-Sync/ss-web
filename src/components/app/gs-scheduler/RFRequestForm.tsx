    import React, {useEffect} from "react";
    import {locations} from "@/api/gs-locations";
    import {useForm} from "react-hook-form";
    import {Form, } from "@/components/ui/form";
    import {Button} from "@/components/ui/button";
    import {z} from "zod";
    import {zodResolver} from "@hookform/resolvers/zod";
    import "react-datepicker/dist/react-datepicker.css";
    import { Separator } from "@/components/ui/separator"
    import {TimePickerField} from "@/components/ui/timepickerfield";
    import FormFieldWrapper from "@/components/ui/formfieldwrapper";

    interface RFRequestFormProps {
        location: typeof locations[0];
    }

    const formSchema = z.object({
        missionName: z.string().min(1, "Mission Name is required"),
        satelliteId: z.string().min(1, "Satellite ID is required"),
        startTime: z.date({ required_error: "Start Time is required" }),
        endTime: z.date({ required_error: "End Time is required" }),
        uplinkTimeRequested: z.preprocess(
            (val) => Number(val),
            z.number().positive()
        ),
        downlinkTime: z.preprocess((val) => Number(val), z.number().positive()),
        scienceTime: z.preprocess((val) => Number(val), z.number().positive()),
        minimumNumberOfPasses: z.preprocess(
            (val) => Number(val),
            z.number().int().positive()
        ),
    });

    const RFRequestForm: React.FC<RFRequestFormProps> = ({ location }) => {
        useEffect(() => {
            console.log("RFRequestForm: Location updated to", location.label);
        }, [location]);

        const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                missionName: "",
                satelliteId: "",
                startTime: null,
                endTime: null,
                uplinkTimeRequested: 0,
                downlinkTime: 0,
                scienceTime: 0,
                minimumNumberOfPasses: 1,
            },
        });

        const onSubmit = (values: any) => {
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
            };
            console.log("Submitted Data for: ", location.label, " ", payload);
        };

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Start and End Time at the top */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center max-w-[28vw]">
                        {/* Start Time */}
                            <TimePickerField
                                name="startTime"
                                label="Start Time"
                                control={form.control}
                            />
                        {/* End Time */}
                            <TimePickerField
                                name="endTime"
                                label="End Time"
                                control={form.control}
                            />
                    </div>
                    <Separator className="max-w-[50vw]"/>
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
                            name="satelliteId"
                            label="Satellite ID"
                            placeholder="Enter satellite ID"
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
                    <Separator className="max-w-[50vw]"/>
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
