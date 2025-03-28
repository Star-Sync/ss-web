import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Generates a consistent color based on a unique ID
 * @param id The unique identifier
 * @returns A CSS color string (hex, hsl, or rgb)
 */
export function getColorFromId(id: string): string {
    // Convert the id to a number and get a value between 0 and 360 for hue
    const hue = parseInt(id.slice(-4), 16) % 360;
    
    // Use high lightness (80-90%) and medium saturation (60-70%) for pastel colors
    return `hsl(${hue}, 65%, 85%)`;
}
