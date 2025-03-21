import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Combobox from "@/components/ui/combobox";

export interface Option {
  value: string;
  label: string;
}

interface FormComboboxProps {
  name: string;
  label: string;
  items: Option[];
  placeholder?: string;
  className?: string;
}

const FormCombobox: React.FC<FormComboboxProps> = ({
  name,
  label,
  items,
  placeholder = "Select an option",
  className,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Combobox
            items={items}
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            className={className}
          />
        )}
      />
      {errorMessage && (
        <span className="text-xs text-red-600 mt-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormCombobox;
