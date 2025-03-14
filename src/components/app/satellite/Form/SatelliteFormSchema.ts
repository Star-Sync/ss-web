import { z } from "zod";

export const SatelliteFormSchema = z.object({
    name: z.string().min(1, "Satellite name is required"),
    tle: z.string().min(1, "TLE is required"),
    priority: z
        .coerce.number({
            required_error: "Priority is required",
            invalid_type_error: "Priority must be a number",
        })
        .min(1, "Priority must be at least 1"),
    uplink: z
        .coerce.number({
            required_error: "Uplink rate is required",
            invalid_type_error: "Uplink rate must be a number",
        })
        .positive("Uplink rate must be positive"),
    telemetry: z
        .coerce.number({
            required_error: "Telemetry rate is required",
            invalid_type_error: "Telemetry rate must be a number",
        })
        .positive("Telemetry rate must be positive"),
    science: z
        .coerce.number({
            required_error: "Science rate is required",
            invalid_type_error: "Science rate must be a number",
        })
        .positive("Science rate must be positive"),
});

export type SatelliteFormData = z.infer<typeof SatelliteFormSchema>;
