import React, {useEffect} from "react";
import {locations} from "@/api/gs-locations";
import {Controller, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
            startTime: values.startTime.toISOString(),
            endTime: values.endTime.toISOString(),
            location: location.label,
        };
        console.log("Submitted Data for: ",location.label," ",payload);
    };

    const convertToUTC = (date: Date | null): Date | null => {
        if (!date) return null;
        return new Date(
            Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            )
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Start and End Time at the top */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Start Time */}
                    <div className="flex flex-col">
                        <FormLabel className="text-sm font-medium text-gray-700 mb-1">
                            Start Time
                        </FormLabel>
                        <FormControl>
                            <Controller
                                control={form.control}
                                name="startTime"
                                render={({field}) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(convertToUTC(date))}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="yyyy-MM-dd HH:mm 'UTC'"
                                        className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                                    />
                                )}
                            />
                        </FormControl>
                        <FormMessage/>
                    </div>
                    {/* End Time */}
                    <div className="flex flex-col">
                        <FormLabel className="text-sm font-medium text-gray-700 mb-1">
                            End Time
                        </FormLabel>
                        <FormControl>
                            <Controller
                                control={form.control}
                                name="endTime"
                                render={({field}) => (
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => field.onChange(convertToUTC(date))}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="yyyy-MM-dd HH:mm 'UTC'"
                                        className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
                                    />
                                )}
                            />
                        </FormControl>
                        <FormMessage/>
                    </div>
                </div>
                {/* Other fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="missionName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                    Mission Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter mission name"
                                        {...field}
                                        className="text-gray-900"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="satelliteId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                    Satellite ID
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter satellite ID"
                                        {...field}
                                        className="text-gray-900"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="uplinkTimeRequested"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                    Uplink Time Requested
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="any"
                                        min="0"
                                        {...field}
                                        className="text-gray-900"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="downlinkTime"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                    Downlink Time
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="any"
                                        min="0"
                                        {...field}
                                        className="text-gray-900"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="scienceTime"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                    Science Time
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="any"
                                        min="0"
                                        {...field}
                                        className="text-gray-900"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="minimumNumberOfPasses"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                    Minimum Number of Passes
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="1"
                                        min="1"
                                        {...field}
                                        className="text-gray-900"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
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
