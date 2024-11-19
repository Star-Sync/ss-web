"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxItem {
    value: string;
    label: string;
    icon?: React.ReactNode; // Icon for the item
}

interface ComboboxProps {
    items: ComboboxItem[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
                                               items,
                                               value,
                                               onChange,
                                               placeholder = "Select an option...",
                                               className = "",
                                           }) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (currentValue: string) => {
        if (currentValue.trim() === "" || currentValue === value) {
            setOpen(false); // Close the dropdown without changing the value
            return;
        }
        onChange(currentValue);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "justify-between items-center px-0 hover:bg-transparent hover:text-black",
                        className
                    )}
                >
                    <div className="flex items-center space-x-2">
                        {/* Render Icon for Selected Item */}
                        {value
                            ? items.find((item) => item.value === value)?.icon
                            : null}
                        <span>
                            {value
                                ? items.find((item) => item.value === value)?.label
                                : placeholder}
                        </span>
                    </div>
                    <ChevronsUpDown
                        className={cn(
                            "ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity"
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("p-0", className)}>
                <Command>
                    <CommandInput placeholder={`Search ${placeholder.toLowerCase()}`} />
                    <CommandList>
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={handleSelect}
                                >
                                    <div className="flex items-center space-x-2">
                                        {/* Render Icon in Dropdown */}
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === item.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default Combobox;
