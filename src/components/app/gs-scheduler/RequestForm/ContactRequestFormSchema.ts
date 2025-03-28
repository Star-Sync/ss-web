import { z } from "zod";

export const ContactRequestFormSchema = z.object({
    missionName: z.string().min(1, "Mission Name is required"),
    satelliteId: z.string().min(1, "Satellite is required"),
    station_id: z.string().min(1, "Ground Station is required"),
    orbit: z.number().min(0, "Orbit is required"),
    uplink: z.boolean(),
    telemetry: z.boolean(),
    science: z.boolean(),
    aosTime: z.date({required_error: "AOS Time is required"}),
    rfOnTime: z.date({required_error: "RF On Time is required"}),
    rfOffTime: z.date({required_error: "RF Off Time is required"}),
    losTime: z.date({required_error: "LOS Time is required"}),
})
    .refine(
        (data) => data.aosTime < data.losTime,
    {
        message: "AOS Time must be before LOS Time",
        path: ["aosTime"],
    })
    .refine(
        (data) => data.rfOnTime < data.rfOffTime,
    {
        message: "RF On Time must be before RF Off Time",
        path: ["rfOnTime"],
    });

export type ContactRequestFormData = z.infer<typeof ContactRequestFormSchema>;
