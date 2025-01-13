import { z } from "zod";

export const SatelliteFormSchema = z.object({
    satelliteName: z.string().min(1, "Satellite name is required"),

});

export type SatelliteFormData = z.infer<typeof SatelliteFormSchema>;