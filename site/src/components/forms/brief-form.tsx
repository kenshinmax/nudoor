"use client";

import Script from "next/script";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { track } from "@/components/layout/analytics";
import { submitBrief } from "@/app/(site)/contact/actions";
import {
  briefFieldOrder,
  briefInputFromFormData,
  budgetOptions,
  businessTypeOptions,
  initialBriefState,
  interestOptions,
  processorOptions,
  timelineOptions,
  validateBrief,
  volumeOptions,
  type BriefField,
  type BriefFieldErrors,
} from "@/lib/brief";
import { publicEnv } from "@/lib/public-env";

const fieldId = (name: BriefField) => `brief-${name}`;
const errorId = (name: BriefField) => `brief-${name}-error`;

function FieldError({ name, errors }: { name: BriefField; errors: BriefFieldErrors }) {
  const message = errors[name]?.[0];
  if (!message) return null;
  return (
    <p id={errorId(name)} className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

function Field({ name, label, optional, errors, children }: { name: BriefField; label: string; optional?: boolean; errors: BriefFieldErrors; children: ReactNode }) {
  return (
    <div>
      <Label htmlFor={fieldId(name)} className="mb-1.5 text-sm font-semibold">
        {label}
        {optional ? <span className="font-normal text-slate-500"> (optional)</span> : null}
      </Label>
      {children}
      <FieldError name={name} errors={errors} />
    </div>
  );
}

function SelectField({ name, label, placeholder, options, errors }: { name: BriefField; label: string; placeholder: string; options: { value: string; label: string }[]; errors: BriefFieldErrors }) {
  const invalid = Boolean(errors[name]?.length);
  return (
    <Field name={name} label={label} errors={errors}>
      <Select name={name}>
        <SelectTrigger
          id={fieldId(name)}
          className="w-full bg-white data-[size=default]:h-11"
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId(name) : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}

export function BriefForm() {
  const [state, formAction, pending] = useActionState(submitBrief, initialBriefState);
  const [clientErrors, setClientErrors] = useState<BriefFieldErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors: BriefFieldErrors = clientErrors ?? (state.status === "error" ? state.fieldErrors ?? {} : {});

  useEffect(() => {
    if (state.status === "success") track("brief_submitted");
  }, [state.status]);

  function focusFirstError(fieldErrors: BriefFieldErrors) {
    const first = briefFieldOrder.find((f) => fieldErrors[f]?.length);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${fieldId(first)}`)?.focus();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    // Submitting through the transition (instead of the native action) keeps typed values after a server-side error.
    event.preventDefault();
    if (pending) return;
    const formData = new FormData(event.currentTarget);
    const result = validateBrief(briefInputFromFormData(formData));
    if (!result.ok) {
      setClientErrors(result.fieldErrors);
      focusFirstError(result.fieldErrors);
      return;
    }
    setClientErrors(null);
    startTransition(() => formAction(formData));
  }

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-6" data-testid="brief-success">
        <CheckCircle2Icon aria-hidden className="size-6 text-emerald-600" />
        <h3 className="mt-2 text-lg font-bold">Brief sent</h3>
        <p className="mt-1 text-slate-700">{state.message}</p>
      </div>
    );
  }

  const invalid = (name: BriefField) => Boolean(errors[name]?.length) || undefined;
  const describedBy = (name: BriefField) => (errors[name]?.length ? errorId(name) : undefined);
  const hasErrors = Object.values(errors).some((v) => v?.length);

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="brief-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" errors={errors}>
          <Input id={fieldId("name")} name="name" autoComplete="name" className="h-11 bg-white" aria-invalid={invalid("name")} aria-describedby={describedBy("name")} />
        </Field>
        <Field name="email" label="Work email" errors={errors}>
          <Input id={fieldId("email")} name="email" type="email" autoComplete="email" className="h-11 bg-white" aria-invalid={invalid("email")} aria-describedby={describedBy("email")} />
        </Field>
        <Field name="company" label="Company" errors={errors}>
          <Input id={fieldId("company")} name="company" autoComplete="organization" className="h-11 bg-white" aria-invalid={invalid("company")} aria-describedby={describedBy("company")} />
        </Field>
        <Field name="website" label="Website" optional errors={errors}>
          <Input id={fieldId("website")} name="website" inputMode="url" placeholder="example.com" className="h-11 bg-white" aria-invalid={invalid("website")} aria-describedby={describedBy("website")} />
        </Field>
        <SelectField name="businessType" label="Business type" placeholder="Choose one" options={businessTypeOptions} errors={errors} />
        <SelectField name="processor" label="Current processor" placeholder="Choose one" options={processorOptions} errors={errors} />
        <SelectField name="volume" label="Monthly volume" placeholder="Choose a range" options={volumeOptions} errors={errors} />
        <SelectField name="timeline" label="Timeline" placeholder="Choose one" options={timelineOptions} errors={errors} />
        <SelectField name="budget" label="Budget" placeholder="Choose a range" options={budgetOptions} errors={errors} />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">
          Interested in <span className="font-normal text-slate-500">(optional)</span>
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {interestOptions.map((o, i) => (
            <div key={o.value} className="flex items-center gap-2.5">
              <Checkbox id={i === 0 ? fieldId("interests") : `brief-interest-${o.value}`} name="interests" value={o.value} />
              <Label htmlFor={i === 0 ? fieldId("interests") : `brief-interest-${o.value}`} className="font-normal">
                {o.label}
              </Label>
            </div>
          ))}
        </div>
        <FieldError name="interests" errors={errors} />
      </fieldset>

      <Field name="notes" label="Anything else?" optional errors={errors}>
        <Textarea id={fieldId("notes")} name="notes" rows={4} maxLength={2000} className="bg-white" aria-invalid={invalid("notes")} aria-describedby={describedBy("notes")} />
      </Field>

      {publicEnv.turnstileSiteKey ? (
        <>
          <div className="cf-turnstile" data-sitekey={publicEnv.turnstileSiteKey} />
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
        </>
      ) : null}

      <div id="brief-status" aria-live="polite" className="text-sm">
        {hasErrors ? <p className="text-destructive">Please fix the highlighted fields.</p> : null}
        {!hasErrors && state.status === "error" ? <p className="text-destructive">{state.message}</p> : null}
      </div>

      <Button type="submit" size="pill" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Send project brief"}
      </Button>
    </form>
  );
}
