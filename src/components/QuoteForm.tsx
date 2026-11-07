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
  const fileId = useId();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sqm, setSqm] = useState("");
  const [projectType, setProjectType] = useState<string>("Residencial");
  const [selectedLines, setSelectedLines] = useState<string[]>([
    "Porcelanatos",
  ]);
  const [details, setDetails] = useState("");
  const [attachedFileName, setAttachedFileName] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

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
      attachedFileName ? `• Planos / archivo: ${attachedFileName}` : null,
      details.trim() ? `• Mensaje: ${details.trim()}` : null,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappQuoteHref = buildWhatsAppUrl(buildSummaryText());
  const mailQuoteHref = `mailto:${SITE_INFO.email}?subject=${encodeURIComponent(
    `Solicitud de cotización (${projectType}) - ${fullName}`
  )}&body=${encodeURIComponent(buildSummaryText())}`;

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
            className="text-sm font-medium text-on-surface block"
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
            className="atelier-input w-full min-h-[44px] bg-white text-base text-on-surface px-3.5 py-2.5 rounded-lg border border-outline focus:outline-none focus:border-primary placeholder:text-secondary/70 transition-colors"
          />
          <p className="field-error hidden items-center gap-1 text-error text-xs">
            <span>Ingresa tu nombre.</span>
          </p>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={phoneId}
            className="text-sm font-medium text-on-surface block"
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
            className="atelier-input w-full min-h-[44px] bg-white text-base text-on-surface px-3.5 py-2.5 rounded-lg border border-outline focus:outline-none focus:border-primary placeholder:text-secondary/70 transition-colors"
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
            className="text-sm font-medium text-on-surface block"
          >
            Correo electrónico{" "}
            <span className="text-secondary font-normal">(opcional)</span>
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
            className="w-full min-h-[44px] bg-white text-base text-on-surface px-3.5 py-2.5 rounded-lg border border-outline focus:outline-none focus:border-primary placeholder:text-secondary/70 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={sqmId}
            className="text-sm font-medium text-on-surface block"
          >
            Metros cuadrados{" "}
            <span className="text-secondary font-normal">(opcional)</span>
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
            className="w-full min-h-[44px] bg-white text-base text-on-surface px-3.5 py-2.5 rounded-lg border border-outline focus:outline-none focus:border-primary placeholder:text-secondary/70 transition-colors"
          />
        </div>
      </div>

      {/* Fila 3: Tipo de proyecto (pills con el mismo estilo de seleccionado) */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-on-surface block">
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
              <span className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full border border-outline bg-white text-sm font-medium text-on-surface peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Fila 4: Productos de interés (pills con el mismo estilo vino #6A020A) */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-on-surface block">
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
                <span className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full border border-outline bg-white text-sm font-medium text-on-surface peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary transition-colors">
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
          className="text-sm font-medium text-on-surface block"
        >
          Mensaje{" "}
          <span className="text-secondary font-normal">(opcional)</span>
        </label>
        <textarea
          id={detailsId}
          name="details"
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Cuéntanos medidas, acabados o ubicación de la obra..."
          className="w-full bg-white text-base text-on-surface p-3.5 rounded-lg border border-outline focus:outline-none focus:border-primary placeholder:text-secondary/70 transition-colors"
        />
      </div>

      {/* Fila 6: Adjuntar planos (opcional) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <label
          htmlFor={fileId}
          className="cursor-pointer min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-outline bg-white hover:bg-surface-container-low text-sm font-medium text-on-surface transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-primary"
        >
          <span>
            {attachedFileName
              ? `Archivo: ${attachedFileName}`
              : "Adjuntar planos (opcional)"}
          </span>
          <input
            id={fileId}
            name="blueprint"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.dwg,.xlsx"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setAttachedFileName(f ? f.name : "");
            }}
            className="sr-only"
          />
        </label>

        <button
          type="submit"
          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          Enviar solicitud
        </button>
      </div>

      {/* Confirmación sobria sin colores extra */}
      {submitted ? (
        <div
          aria-live="polite"
          className="p-5 bg-surface-container-low rounded-lg space-y-4"
        >
          <p className="text-sm text-on-surface">
            Solicitud lista. Elige por dónde prefieres enviarla a nuestras
            asesoras:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappQuoteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              <Icon name="chat" className="text-[16px]" />
              <span>Enviar por WhatsApp</span>
            </a>
            <a
              href={mailQuoteHref}
              className="flex-1 min-h-[44px] inline-flex items-center justify-center border border-outline bg-white hover:bg-surface text-on-surface px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <span>Enviar por correo</span>
            </a>
          </div>
        </div>
      ) : null}
    </form>
  );
}
