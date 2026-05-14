import { z } from "zod";

export const reservationSchema = z.object({
  name:         z.string().min(2, "Name is required").max(100).transform(s => s.trim()),
  email:        z.string().email("Valid email required").max(200).transform(s => s.trim().toLowerCase()),
  phone:        z.string().max(30).optional(),
  country:      z.string().min(1, "Country is required").max(100).transform(s => s.trim()),
  organisation: z.string().max(200).optional().transform(s => s?.trim()),
  version:      z.enum(["essential", "business", "executive", "exclusive", "silicon-valley", "dealer"]),
  message:      z.string().max(2000).optional().transform(s => s?.trim()),
  locale:       z.enum(["fr", "en"]).default("fr"),
  gdpr:         z.literal(true, { errorMap: () => ({ message: "GDPR consent required" }) }),
});

export const waitlistSchema = z.object({
  name:   z.string().min(2, "Name is required").max(100).transform(s => s.trim()),
  email:  z.string().email("Valid email required").max(200).transform(s => s.trim().toLowerCase()),
  locale: z.enum(["fr", "en"]).default("fr"),
});

export const dealerApplicationSchema = z.object({
  name:         z.string().min(2, "Name is required").max(100).transform(s => s.trim()),
  email:        z.string().email("Valid email required").max(200).transform(s => s.trim().toLowerCase()),
  phone:        z.string().max(30).optional(),
  country:      z.string().min(1, "Country is required").max(100).transform(s => s.trim()),
  organisation: z.string().min(1, "Organisation is required").max(200).transform(s => s.trim()),
  message:      z.string().max(2000).optional().transform(s => s?.trim()),
  locale:       z.enum(["fr", "en"]).default("fr"),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type DealerApplicationInput = z.infer<typeof dealerApplicationSchema>;
