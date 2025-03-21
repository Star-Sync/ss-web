import { z } from "zod";

export const ExclusionFormSchema = z.object({
  mission: z.string().min(1, "Mission is required"),
  angle_limit: z
    .coerce.number({
      required_error: "Angle limit is required",
      invalid_type_error: "Angle limit must be a number",
    })
    .positive("Angle limit must be positive"),
  interfering_satellite: z.string().min(1, "Interfering satellite is required"),
  satellite_id: z.string().min(1, "Satellite ID is required"),
  gs_id: z.coerce.number({
    required_error: "GS ID is required",
    invalid_type_error: "GS ID must be a number",
  }),
});

export type ExclusionFormData = z.infer<typeof ExclusionFormSchema>;
