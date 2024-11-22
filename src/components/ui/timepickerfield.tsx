import React from "react";
import { Controller } from "react-hook-form";
import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import DatePicker from "react-datepicker";

interface TimePickerFieldProps {
    name: string;
    label: string;
    control: any;
    datePickerProps?: any;
}

export const TimePickerField: React.FC<TimePickerFieldProps> = ({
                                                                    name,
                                                                    label,
                                                                    control,
                                                                    datePickerProps,
                                                                }) => {
    return (
        <FormItem>
            <FormLabel className="block text-gray-700 mb-1">{label}</FormLabel>
            <FormControl>
                <Controller
                    control={control}
                    name={name}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <DatePicker
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                showTimeSelect
                                dateFormat="yyyy-MM-dd HH:mm 'UTC'"
                                className={`w-[13vw] border rounded-md p-2 text-gray-900 ${
                                    error ? "border-red-500" : "border-gray-300"
                                }`}
                                {...datePickerProps}
                            />
                            {error && (
                                <p className="text-red-500 text-sm mt-1">{error.message}</p>
                            )}
                        </>
                    )}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};
