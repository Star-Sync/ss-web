import {FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";
import React from "react";

interface CheckboxFieldWrapperProps {
    control: any;
    name: string;
    label: string;
}

const CheckboxFieldWrapper: React.FC<CheckboxFieldWrapperProps> = ({control, name, label}) => (
    <FormField
        control={control}
        name={name}
        render={({field}) => (
            <FormItem className="flex items-center space-x-2">
                <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked: boolean) => field.onChange(checked)}
                />
                <FormLabel className="text-gray-700">{label}</FormLabel>
            </FormItem>
        )}
    />
);

export default CheckboxFieldWrapper;
