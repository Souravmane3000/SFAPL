"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Mail } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { company } from "@/data/company";
import { publishedProducts } from "@/data/products";
import { enquiryDeliveryStatus, enquirySchema, type EnquiryValues } from "@/lib/enquiry";

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
    control,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { productInterest: defaultProduct, website: "" },
  });

  async function onSubmit(data: EnquiryValues) {
    setStatus("idle");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus(enquiryDeliveryStatus(false, false));
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
      setStatus(enquiryDeliveryStatus(true, true));
      reset({ productInterest: defaultProduct, website: "" });
    } catch {
      setStatus(enquiryDeliveryStatus(true, false));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
        <Field id="enquiry-name" label="Full name" error={errors.name?.message} required>
          <input id="enquiry-name" className={inputClass} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "enquiry-name-error" : undefined} {...register("name")} />
        </Field>
        <Field id="enquiry-company" label="Company / organisation" error={errors.company?.message}>
          <input id="enquiry-company" className={inputClass} autoComplete="organization" aria-describedby={errors.company ? "enquiry-company-error" : undefined} {...register("company")} />
        </Field>
        <Field id="enquiry-email" label="Email address" error={errors.email?.message} required>
          <input id="enquiry-email" className={inputClass} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "enquiry-email-error" : undefined} {...register("email")} />
        </Field>
        <Field id="enquiry-phone" label="Phone number" error={errors.phone?.message} required>
          <input id="enquiry-phone" className={inputClass} type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "enquiry-phone-error" : undefined} {...register("phone")} />
        </Field>
        <Field id="enquiry-country" label="Country / location" error={errors.country?.message}>
          <input id="enquiry-country" className={inputClass} autoComplete="country-name" aria-describedby={errors.country ? "enquiry-country-error" : undefined} {...register("country")} />
        </Field>
        <Field id="enquiry-product" label="Product of interest" error={errors.productInterest?.message} required>
          <Controller name="productInterest" control={control} render={({ field }) => (
            <select id="enquiry-product" className={inputClass} aria-invalid={Boolean(errors.productInterest)} aria-describedby={errors.productInterest ? "enquiry-product-error" : undefined} {...field}>
            <option value="">Select an option</option>
            {publishedProducts.map((product) => <option key={product.id} value={product.name}>{product.name}</option>)}
            <option value="Wholesale partnership">Wholesale partnership</option>
            <option value="Distribution enquiry">Distribution enquiry</option>
          </select>
          )} />
        </Field>
      </div>
      <Field id="enquiry-quantity" label="Approximate quantity" error={errors.approximateQuantity?.message}>
        <input id="enquiry-quantity" className={inputClass} placeholder="For example: 500 kg" aria-describedby={errors.approximateQuantity ? "enquiry-quantity-error" : undefined} {...register("approximateQuantity")} />
      </Field>
      <Field id="enquiry-message" label="Message" error={errors.message?.message}>
        <textarea id="enquiry-message" className={`${inputClass} min-h-32 py-3`} rows={4} aria-describedby={errors.message ? "enquiry-message-error" : undefined} {...register("message")} />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-7 text-sm font-bold text-forest-950 transition-colors hover:bg-amber-400 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Mail className="size-4" aria-hidden="true" />}
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </button>
      <div role="status" aria-live="polite">
        {status === "success" ? (
          <p className="flex items-center gap-2 rounded-lg bg-forest-50 p-4 text-sm font-semibold text-success">
            <CheckCircle2 className="size-5" aria-hidden="true" />
            Your enquiry was accepted for delivery. We will review it shortly.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="rounded-lg bg-red-50 p-4 text-sm text-error">
            We could not send this enquiry. Email us directly at{" "}
            <a className="font-bold underline" href={`mailto:${company.contact.primaryEmail}`}>{company.contact.primaryEmail}</a>.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  required?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-stone-800">
        {label}{required ? <span className="text-error"> *</span> : null}
      </label>
      {children}
      {error ? <p id={`${id}-error`} className="mt-2 text-sm text-error">{error}</p> : null}
    </div>
  );
}
