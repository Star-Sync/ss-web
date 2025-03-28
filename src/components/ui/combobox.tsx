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

export interface ComboboxItem {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

export interface ComboboxProps {
    items: ComboboxItem[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    error?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
    items,
    value,
    onChange,
    placeholder = "Select an option...",
    className = "",
    error,
}) => {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredItems = React.useMemo(() => {
        const term = searchTerm.toLowerCase();
        return items.filter(
            (item) =>
                item.label.toLowerCase().includes(term) || // Match against label
                item.value.toLowerCase().includes(term) // Match against value
        );
    }, [items, searchTerm]);

    const handleSelect = (selectedValue: string) => {
        if (selectedValue.trim() === "" || selectedValue === value) {
            setOpen(false);
            return;
        }
        onChange(selectedValue);
        setOpen(false);
    };

    return (
        <div className="flex flex-col gap-1.5">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "justify-between items-center px-2 hover:bg-transparent hover:text-black",
                            error ? "border-red-500" : "",
                            className
                        )}
                    >
                        <div className="flex items-center space-x-2">
                            {value
                                ? items.find((item) => item.value === value)?.icon
                                : null}
                            <span>
                                {value
                                    ? items.find((item) => item.value === value)?.label ||
                                    items.find((item) => item.value === value)?.value
                                    : placeholder}
                            </span>
                        </div>
                        <ChevronsUpDown
                            className={cn(
                                "ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity shrink-0"
                            )}
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn("p-0", className)}>
                    <Command>
                        <CommandInput
                            placeholder={`Search`}
                            value={searchTerm}
                            onValueChange={setSearchTerm}
                        />
                        <CommandList>
                            {filteredItems.length > 0 ? (
                                <CommandGroup>
                                    {filteredItems.map((item) => (
                                        <CommandItem
                                            key={item.value}
                                            value={item.label}
                                            onSelect={() => handleSelect(item.value)}
                                        >
                                            <div className="flex items-center space-x-2">
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
                            ) : (
                                <CommandEmpty>No options found.</CommandEmpty>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {error && (
                <span className="text-sm text-red-500">{error}</span>
            )}
        </div>
    );
};

export default Combobox;
