import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  organisation: z.string().optional(),
  version: z.enum(["essential", "business", "executive", "exclusive"]),
  message: z.string().optional(),
  locale: z.enum(["fr", "en"]).default("fr"),
  gdpr: z.literal(true, { errorMap: () => ({ message: "GDPR consent required" }) }),
});

export const waitlistSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  locale: z.enum(["fr", "en"]).default("fr"),
});

export const dealerApplicationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  organisation: z.string().min(1, "Organisation is required"),
  message: z.string().optional(),
  locale: z.enum(["fr", "en"]).default("fr"),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type DealerApplicationInput = z.infer<typeof dealerApplicationSchema>;
