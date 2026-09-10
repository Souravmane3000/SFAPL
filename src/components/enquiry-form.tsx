"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { company } from "@/data/company";
import { publishedProducts } from "@/data/products";

const enquirySchema = z.object({
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

type FormValues = z.infer<typeof enquirySchema>;

const inputClass =
  "focus-ring min-h-12 w-full rounded-lg border border-stone-300 bg-white px-4 text-stone-900 placeholder:text-stone-400";

export function EnquiryForm({
  defaultProduct = "",
  compact = false,
}: {
  defaultProduct?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { productInterest: defaultProduct, website: "" },
  });

  async function onSubmit(data: FormValues) {
    setStatus("idle");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      return;
    }

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_company: data.company || "Not provided",
          reply_to: data.email,
          phone: data.phone,
          country: data.country || "Not provided",
          product_interest: data.productInterest,
          approximate_quantity: data.approximateQuantity || "Not specified",
          message: data.message || "No additional message",
        },
        { publicKey },
      );
      setStatus("success");
      reset({ productInterest: defaultProduct, website: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
        <Field label="Full name" error={errors.name?.message} required>
          <input className={inputClass} autoComplete="name" {...register("name")} aria-invalid={Boolean(errors.name)} />
        </Field>
        <Field label="Company / organisation" error={errors.company?.message}>
          <input className={inputClass} autoComplete="organization" {...register("company")} />
        </Field>
        <Field label="Email address" error={errors.email?.message} required>
          <input className={inputClass} type="email" autoComplete="email" {...register("email")} aria-invalid={Boolean(errors.email)} />
        </Field>
        <Field label="Phone number" error={errors.phone?.message} required>
          <input className={inputClass} type="tel" autoComplete="tel" {...register("phone")} aria-invalid={Boolean(errors.phone)} />
        </Field>
        <Field label="Country / location" error={errors.country?.message}>
          <input className={inputClass} autoComplete="country-name" {...register("country")} />
        </Field>
        <Field label="Product of interest" error={errors.productInterest?.message} required>
          <select className={inputClass} {...register("productInterest")} aria-invalid={Boolean(errors.productInterest)}>
            <option value="">Select an option</option>
            {publishedProducts.map((product) => <option key={product.id} value={product.name}>{product.name}</option>)}
            <option value="Wholesale partnership">Wholesale partnership</option>
            <option value="Distribution enquiry">Distribution enquiry</option>
          </select>
        </Field>
      </div>
      <Field label="Approximate quantity" error={errors.approximateQuantity?.message}>
        <input className={inputClass} placeholder="For example: 500 kg" {...register("approximateQuantity")} />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <textarea className={`${inputClass} min-h-32 py-3`} rows={4} {...register("message")} />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-7 text-sm font-bold text-forest-950 transition-colors hover:bg-amber-400 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Mail className="size-4" aria-hidden="true" />}
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </button>
      {status === "success" ? (
        <p className="flex items-center gap-2 rounded-lg bg-forest-50 p-4 text-sm font-semibold text-success" role="status">
          <CheckCircle2 className="size-5" aria-hidden="true" />
          Your enquiry was accepted for delivery. We will review it shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-error" role="alert">
          We could not send this enquiry. Email us directly at{" "}
          <a className="font-bold underline" href={`mailto:${company.contact.primaryEmail}`}>{company.contact.primaryEmail}</a>.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string | undefined;
  required?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-stone-800">
        {label}{required ? <span className="text-error"> *</span> : null}
      </span>
      {children}
      {error ? <span className="mt-2 block text-sm text-error" role="alert">{error}</span> : null}
    </label>
  );
}
