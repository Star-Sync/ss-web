import React, { useState, useEffect } from 'react';
import { Button } from "@/components/app/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/app/ui/popover";
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/app/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { timezones } from "@/data/timezones";

interface TimezoneClockProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const TimezoneClock: React.FC<TimezoneClockProps> = ({ open, setOpen }) => {
    const [time, setTime] = useState<string>("");
    const [timezone, setTimezone] = useState<string>("UTC");

    useEffect(() => {
        // Only access localStorage on the client side
        const savedTimezone = typeof window !== "undefined" ? localStorage.getItem("timezone") : "UTC";
        if (savedTimezone) {
            setTimezone(savedTimezone);
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: timezone,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            });
            const formattedTime = formatter.format(now);
            const locationName = timezones.find((tz) => tz.value === timezone)?.name || "";
            setTime(`${formattedTime} - ${locationName}`);
        }, 1000);

        return () => clearInterval(timer);
    }, [timezone]);

    const handleTimezoneChange = (newTimezone: string) => {
        setTimezone(newTimezone);
        if (typeof window !== "undefined") {
            localStorage.setItem("timezone", newTimezone);
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between"
                    style={{ minWidth: '250px' }}
                >
                    {time}
                    <ChevronsUpDown className="ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput placeholder="Search timezone..." />
                    <CommandList>
                        <CommandEmpty>No timezone found.</CommandEmpty>
                        <CommandGroup>
                            {timezones.map((tz) => (
                                <CommandItem
                                    key={tz.value}
                                    value={tz.value}
                                    onSelect={() => handleTimezoneChange(tz.value)}
                                >
                                    {tz.label}
                                    <Check
                                        className={`ml-auto ${
                                            timezone === tz.value ? "opacity-100" : "opacity-0"
                                        }`}
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

export default TimezoneClock;
