import React from "react";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormFieldWrapperProps {
    control: any;
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    step?: string;
    min?: string;
    className?: string;
    onChange?: (e: any) => void;
}

const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
                                                               control,
                                                               name,
                                                               label,
                                                               placeholder,
                                                               type = "text",
                                                               step,
                                                               min,
                                                               className = "text-gray-900",
                                                               onChange,
                                                           }) => (
    <FormField
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
            <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                    {label}
                </FormLabel>
                <FormControl>
                    <Input
                        {...field}
                        placeholder={placeholder}
                        type={type}
                        step={step}
                        min={min}
                        className={`${className} ${error ? "border-red-500" : "border-gray-300"}`}
                        onChange={(e) => {
                            field.onChange(e);
                            if (onChange) {
                                onChange(e);
                            }
                        }}
                    />
                </FormControl>
                {error && <FormMessage>{error.message}</FormMessage>}
            </FormItem>
        )}
    />
);

export default FormFieldWrapper;
