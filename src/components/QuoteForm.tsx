"use client";

import React, { useId, useState } from "react";
import { Icon } from "@/components/Icon";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

const PROJECT_TYPES = [
  "Residencial",
  "Comercial",
  "Remodelación",
  "Obra nueva",
] as const;

const PRODUCT_INTERESTS = [
  "Porcelanatos",
  "Grifería y ducha",
  "Tinas y sanitarios",
  "Revestimientos",
  "Lavamanos",
] as const;

const PRIMARY_LINK =
  "flex-1 min-h-[46px] inline-flex items-center justify-center gap-2 bg-on-surface hover:bg-[#6b1d22] text-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors";
const SECONDARY_LINK =
  "flex-1 min-h-[46px] inline-flex items-center justify-center gap-2 border border-outline bg-white hover:border-on-surface text-on-surface px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors";

function syncAriaInvalid(el: EventTarget | null) {
  if (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  ) {
    try {
      el.setAttribute(
        "aria-invalid",
        el.matches(":user-invalid") ? "true" : "false"
      );
    } catch {
      el.setAttribute("aria-invalid", el.checkValidity() ? "false" : "true");
    }
  }
}

export function QuoteForm() {
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const sqmId = useId();
  const detailsId = useId();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sqm, setSqm] = useState("");
  const [projectType, setProjectType] = useState<string>("Residencial");
  const [selectedLines, setSelectedLines] = useState<string[]>([
    "Porcelanatos",
  ]);
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");

  const toggleLine = (label: string) => {
    setSelectedLines((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const buildSummaryText = () => {
    const lines = [
      `Hola Cerámica El Almacén, solicito cotización para mi proyecto:`,
      `• Nombre: ${fullName}`,
      `• WhatsApp / Teléfono: ${phone}`,
      email.trim() ? `• Correo: ${email.trim()}` : null,
      sqm.trim() ? `• Metraje estimado: ${sqm.trim()} m²` : null,
      `• Tipo de proyecto: ${projectType}`,
      selectedLines.length > 0
        ? `• Productos de interés: ${selectedLines.join(", ")}`
        : null,
      details.trim() ? `• Mensaje: ${details.trim()}` : null,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const whatsappQuoteHref = buildWhatsAppUrl(buildSummaryText());

  const mailQuoteHref = `mailto:${SITE_INFO.email}?subject=${encodeURIComponent(
    `Solicitud de cotización (${projectType}) - ${fullName}`
  )}&body=${encodeURIComponent(buildSummaryText())}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as
      | HTMLButtonElement
      | null;
    const via = submitter?.value === "email" ? "email" : "whatsapp";
    if (via === "email") {
      window.location.href = mailQuoteHref;
    } else {
      window.open(whatsappQuoteHref, "_blank", "noopener,noreferrer");
    }
    setChannel(via);
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={(e) => syncAriaInvalid(e.target)}
      onInput={(e) => syncAriaInvalid(e.target)}
      className="space-y-6"
    >
      {/* Fila 1: Nombre y WhatsApp (ambos obligatorios) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor={nameId}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface block"
          >
            Nombre *
          </label>
          <input
            id={nameId}
            name="fullName"
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (submitted) setSubmitted(false);
            }}
            placeholder="Tu nombre o estudio"
            className="atelier-input w-full min-h-[44px] bg-white text-sm text-on-surface px-3.5 py-2.5 rounded-sm border border-outline focus:outline-none focus:border-on-surface placeholder:text-secondary/70 transition-colors"
          />
          <p className="field-error hidden items-center gap-1 text-error text-xs">
            <span>Ingresa tu nombre.</span>
          </p>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={phoneId}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface block"
          >
            WhatsApp / Teléfono *
          </label>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (submitted) setSubmitted(false);
            }}
            placeholder="809-000-0000"
            className="atelier-input w-full min-h-[44px] bg-white text-sm text-on-surface px-3.5 py-2.5 rounded-sm border border-outline focus:outline-none focus:border-on-surface placeholder:text-secondary/70 transition-colors"
          />
          <p className="field-error hidden items-center gap-1 text-error text-xs">
            <span>Ingresa un número de contacto.</span>
          </p>
        </div>
      </div>

      {/* Fila 2: Correo y m² (ambos opcionales) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor={emailId}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface block"
          >
            Correo electrónico{" "}
            <span className="text-secondary font-normal lowercase tracking-normal">
              (opcional)
            </span>
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (submitted) setSubmitted(false);
            }}
            placeholder="correo@ejemplo.com"
            className="w-full min-h-[44px] bg-white text-sm text-on-surface px-3.5 py-2.5 rounded-sm border border-outline focus:outline-none focus:border-on-surface placeholder:text-secondary/70 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={sqmId}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface block"
          >
            Metros cuadrados{" "}
            <span className="text-secondary font-normal lowercase tracking-normal">
              (opcional)
            </span>
          </label>
          <input
            id={sqmId}
            name="sqm"
            type="text"
            inputMode="decimal"
            value={sqm}
            onChange={(e) => {
              setSqm(e.target.value);
              if (submitted) setSubmitted(false);
            }}
            placeholder="Ej. 180 m²"
            className="w-full min-h-[44px] bg-white text-sm text-on-surface px-3.5 py-2.5 rounded-sm border border-outline focus:outline-none focus:border-on-surface placeholder:text-secondary/70 transition-colors"
          />
        </div>
      </div>

      {/* Fila 3: Tipo de proyecto */}
      <fieldset className="space-y-2.5">
        <legend className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface block">
          Tipo de proyecto
        </legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type) => (
            <label key={type} className="cursor-pointer">
              <input
                type="radio"
                name="project_type"
                value={type}
                checked={projectType === type}
                onChange={() => setProjectType(type)}
                className="peer sr-only"
              />
              <span className="inline-flex items-center justify-center min-h-[38px] px-4 py-2 border border-outline bg-white text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface peer-checked:bg-on-surface peer-checked:text-white peer-checked:border-on-surface peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Fila 4: Productos de interés */}
      <fieldset className="space-y-2.5">
        <legend className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface block">
          Productos de interés
        </legend>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_INTERESTS.map((label) => {
            const checked = selectedLines.includes(label);
            return (
              <label key={label} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="finish_lines"
                  value={label}
                  checked={checked}
                  onChange={() => toggleLine(label)}
                  className="peer sr-only"
                />
                <span className="inline-flex items-center justify-center min-h-[38px] px-4 py-2 border border-outline bg-white text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface peer-checked:bg-[#6b1d22] peer-checked:text-white peer-checked:border-[#6b1d22] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary transition-colors">
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Fila 5: Mensaje */}
      <div className="space-y-1.5">
        <label
          htmlFor={detailsId}
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface block"
        >
          Mensaje{" "}
          <span className="text-secondary font-normal lowercase tracking-normal">
            (opcional)
          </span>
        </label>
        <textarea
          id={detailsId}
          name="details"
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Cuéntanos medidas, acabados o ubicación de la obra..."
          className="w-full bg-white text-sm text-on-surface p-3.5 rounded-sm border border-outline focus:outline-none focus:border-on-surface placeholder:text-secondary/70 transition-colors"
        />
      </div>

      {/* Fila 6: Envío por WhatsApp o por correo */}
      <div className="flex flex-col gap-3.5 pt-2">
        <p className="text-xs text-secondary">
          ¿Tienes planos? Adjúntalos en el chat o en el correo que se abrirá
          con tu solicitud.
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
          <button
            type="submit"
            name="via"
            value="whatsapp"
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-on-surface hover:bg-[#6b1d22] text-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
          >
            <Icon name="chat" className="text-[16px]" />
            <span>Enviar por WhatsApp</span>
          </button>
          <button
            type="submit"
            name="via"
            value="email"
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 border border-outline bg-white hover:border-on-surface text-on-surface px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
          >
            <Icon name="mail" className="text-[16px] text-[#6b1d22]" />
            <span>Enviar por correo</span>
          </button>
        </div>
      </div>

      {/* Confirmación sobria */}
      <div aria-live="polite">
        {submitted ? (
          <div className="p-5 bg-surface-container-low rounded-sm border border-outline/60 space-y-4">
            {channel === "whatsapp" ? (
              <p className="text-sm text-on-surface">
                Abrimos WhatsApp con tu solicitud redactada. Pulsa{" "}
                <strong>Enviar</strong> en el chat para que llegue a nuestras
                asesoras. ¿No se abrió?
              </p>
            ) : (
              <p className="text-sm text-on-surface">
                Abrimos tu programa de correo con la solicitud redactada. Pulsa{" "}
                <strong>Enviar</strong> para que llegue a nuestras asesoras. Si
                no se abrió, escríbenos a{" "}
                <strong className="select-all">{SITE_INFO.email}</strong>.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappQuoteHref}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  channel === "whatsapp" ? PRIMARY_LINK : SECONDARY_LINK
                }
              >
                <Icon name="chat" className="text-[16px]" />
                <span>
                  {channel === "whatsapp"
                    ? "Abrir WhatsApp de nuevo"
                    : "Enviar por WhatsApp"}
                </span>
              </a>
              <a
                href={mailQuoteHref}
                className={channel === "email" ? PRIMARY_LINK : SECONDARY_LINK}
              >
                <Icon name="mail" className="text-[16px]" />
                <span>
                  {channel === "email"
                    ? "Abrir el correo de nuevo"
                    : "Enviar por correo"}
                </span>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
