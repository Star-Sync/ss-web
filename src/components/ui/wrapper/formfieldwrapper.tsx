import React from "react";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Control,
    FieldValues,
    Path,
    ControllerRenderProps,
    ControllerFieldState,
    UseFormStateReturn,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldWrapperProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label: string;
    placeholder?: string;
    type?: string;
    step?: string;
    min?: string;
    className?: string;
    onChange?: (e: any) => void;
    isMultiline?: boolean;  // New prop to toggle multiline
}

const FormFieldWrapper = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = "text",
    step,
    min,
    className = "text-gray-900",
    onChange,
    isMultiline = false,  // Default is single-line
}: FormFieldWrapperProps<TFieldValues>) => (
    <FormField
        control={control}
        name={name}
        render={({
            field,
            fieldState,
        }: {
            field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<TFieldValues>;
        }) => {
            const { error } = fieldState;

            return (
                <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                        {label}
                    </FormLabel>
                    <FormControl>
                        {isMultiline ? (
                            <Textarea
                                {...field}
                                placeholder={placeholder}
                                className={`${className} resize-none overflow-y-auto ${
                                    error ? "border-red-500" : "border-gray-300"
                                }`}
                                rows={4}  // Initial size
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (onChange) onChange(e);
                                }}
                            />
                        ) : (
                            <Input
                                {...field}
                                placeholder={placeholder}
                                type={type}
                                step={step}
                                min={min}
                                className={`${className} ${
                                    error ? "border-red-500" : "border-gray-300"
                                }`}
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (onChange) onChange(e);
                                }}
                            />
                        )}
                    </FormControl>
                    {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
            );
        }}
    />
);

export default FormFieldWrapper;
