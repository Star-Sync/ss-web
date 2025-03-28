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
    // Simple hash function to convert string to a number
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = (hash << 5) - hash + id.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }

    // Use the hash to pick from a predefined color palette
    const colors = [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#F033FF",
        "#FF3333",
        "#33FFF3",
        "#F3FF33",
        "#FF33A1",
        "#33A1FF",
        "#A1FF33",
    ];

    const index = Math.abs(hash) % colors.length;
    return colors[index];
}
