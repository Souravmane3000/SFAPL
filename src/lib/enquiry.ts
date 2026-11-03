import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  company: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Enter a valid phone number."),
  country: z.string().trim().optional(),
  productInterest: z.string().min(1, "Select a product or enquiry type."),
  approximateQuantity: z.string().trim().optional(),
  message: z.string().trim().max(500, "Keep the message under 500 characters.").optional(),
  website: z.string().max(0, "Unable to submit."),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;

export function enquiryDeliveryStatus(configured: boolean, accepted: boolean) {
  return configured && accepted ? "success" : "error";
}
