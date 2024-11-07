import React, { useState, useEffect, useCallback } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { timezones } from "@/data/timezones";

const Header: React.FC = () => {
    const [time, setTime] = useState<string>("");
    const [timezone, setTimezone] = useState<string>("UTC");
    const [open, setOpen] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<number>(1);
    const [hover, setHover] = useState<boolean>(false);

    const adjustOpacity = useCallback(() => {
        if (open || hover) {
            setOpacity(1);
        } else {
            const scrollY = window.scrollY;
            const newOpacity = Math.max(1 - scrollY / 300, 0.5);
            setOpacity(newOpacity);
        }
    }, [open, hover]);

    useEffect(() => {
        adjustOpacity();
    }, [open, hover, adjustOpacity]);

    useEffect(() => {
        const handleScroll = () => {
            adjustOpacity();
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [open, hover, adjustOpacity]);

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
        <header
            className="bg-white p-4 text-black sticky top-0 z-10"
            style={{ opacity }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="relative flex items-center w-full header-content">
                {/* Left Side */}
                <div className="absolute left-0 flex items-center">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 ml-3" />
                </div>

                {/* Centered Combo Box with Clock */}
                <div className="mx-auto">
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
                </div>
            </div>
        </header>
    );
};

export default Header;