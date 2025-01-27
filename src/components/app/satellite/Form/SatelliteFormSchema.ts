import { z } from "zod";

export const SatelliteFormSchema = z.object({
    satelliteName: z.string().min(1, "Satellite name is required"),
    TLE: z.string().min(1, "TLE is required"),
    priority: z
        .number({
            required_error: "Priority is required",
            invalid_type_error: "Priority must be a number",
        })
        .min(1, "Priority must be at least 1"),

    uplinkRate: z
        .number({
            required_error: "Uplink rate is required",
            invalid_type_error: "Uplink rate must be a number",
        })
        .positive("Uplink rate must be positive"),

    downlinkRate: z
        .number({
            required_error: "Downlink rate is required",
            invalid_type_error: "Downlink rate must be a number",
        })
        .positive("Downlink rate must be positive"),

    scienceDownlinkRate: z
        .number({
            required_error: "Science downlink rate is required",
            invalid_type_error: "Science downlink rate must be a number",
        })
        .positive("Science downlink rate must be positive"),

    exclusionCone: z.string().optional(),
});

export type SatelliteFormData = z.infer<typeof SatelliteFormSchema>;
