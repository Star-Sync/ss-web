import { z } from "zod";

export const RFRequestFormSchema = z.object({
    missionName: z.string().min(1, "Mission Name is required"),
    satelliteId: z.string().min(1, "Satellite is required"),
    startTime: z.date({ required_error: "Start Time is required" }),
    endTime: z.date({ required_error: "End Time is required" }),
    uplinkTimeRequested: z.preprocess(
        (val) => Number(val),
        z.number().positive("Uplink Time must be a positive number")
    ),
    downlinkTime: z.preprocess(
        (val) => Number(val),
        z.number().positive("Downlink Time must be a positive number")
    ),
    scienceTime: z.preprocess(
        (val) => Number(val),
        z.number().positive("Science Time must be a positive number")
    ),
    minimumNumberOfPasses: z.preprocess(
        (val) => Number(val),
        z.number().int("Must be an integer").positive("Minimum Number of Passes must be at least 1")
    ),
})
    .refine(
        (data) => data.startTime < data.endTime,
        {
            message: "Start Time must be before End Time",
            path: ["startTime"],
        }
    );

export type RFRequestFormData = z.infer<typeof RFRequestFormSchema>;
