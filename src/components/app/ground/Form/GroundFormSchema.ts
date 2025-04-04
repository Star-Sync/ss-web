import { z } from "zod";

export const GroundFormSchema = z.object({
    groundStationName: z.string().min(1, "Ground station name is required"),
    // location: z.string().min(1, "Location is required"),
    // priority: z
    //     .number({
    //         required_error: "Priority is required",
    //         invalid_type_error: "Priority must be a number",
    //     })
    //     .min(1, "Priority must be at least 1"),

    latitude: z
        .number({
            required_error: "Latitude is required",
            invalid_type_error: "Latitude must be a number",
        })
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90"),

    longitude: z
        .number({
            required_error: "Longitude is required",
            invalid_type_error: "Longitude must be a number",
        })
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180"),

    height: z
        .number({
            required_error: "Height is required",
            invalid_type_error: "Height must be a number",
        })
        .nonnegative("Height must be a positive number"),

    mask: z
        .number({
            required_error: "Mask angle is required",
            invalid_type_error: "Mask must be a number",
        })
        .min(0, "Mask must be at least 0")
        .max(90, "Mask must be at most 90"),

    uplink: z
        .number({
            required_error: "Uplink frequency is required",
            invalid_type_error: "Uplink must be a number",
        })
        .positive("Uplink frequency must be positive"),

    downlink: z
        .number({
            required_error: "Downlink frequency is required",
            invalid_type_error: "Downlink must be a number",
        })
        .positive("Downlink frequency must be positive"),

    science: z
        .number({
            required_error: "Science parameter is required",
            invalid_type_error: "Science must be a number",
        })
        .nonnegative("Science parameter must be a positive number"),

    maintenanceWindow: z.string().optional(),
});

export type GroundFormData = z.infer<typeof GroundFormSchema>;
