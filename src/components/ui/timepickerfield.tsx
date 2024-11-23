// TimePickerField.tsx
import React from "react";
import { Controller, FieldValues, Path } from "react-hook-form";
import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import DatePicker from "react-datepicker";

interface TimePickerFieldProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    label: string;
}

export const TimePickerField = <TFieldValues extends FieldValues>({
                                                                      name,
                                                                      label,
                                                                  }: TimePickerFieldProps<TFieldValues>) => {
    return (
        <FormItem>
            <FormLabel className="block text-gray-700 mb-1">{label}</FormLabel>
            <FormControl>
                <Controller
                    name={name}
                    render={({ field, fieldState }) => {
                        const { error } = fieldState;
                        return (
                            <>
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"

                                    dateFormat="yyyy-MM-dd HH:mm 'UTC'"

                                    className={`w-[13vw] border rounded-md p-2 text-gray-900 ${
                                        error ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                                )}
                            </>
                        );
                    }}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};
