"use client";

import React, { useId, useState } from "react";
import { Icon } from "@/components/Icon";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

const PROJECT_TYPES = [
  { value: "Residencial", label: "Residencial" },
  { value: "Comercial", label: "Comercial" },
  { value: "Remodelación", label: "Remodelación" },
  { value: "Obra Nueva", label: "Obra Nueva" },
] as const;

const FINISH_LINES = [
  {
    id: "porcelanatos",
    label: "Porcelanatos Españoles / Italianos",
    icon: "grid_view",
  },
  { id: "griferia", label: "Grifería & Ducha IMEX", icon: "shower" },
  { id: "tinas", label: "Tinas Exentas & Sanitarios", icon: "bathtub" },
  {
    id: "revestimientos",
    label: "Revestimientos Cerámicos de Pared",
    icon: "countertops",
  },
  { id: "otros", label: "Otros Acabados", icon: "more_horiz" },
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
    "Porcelanatos Españoles / Italianos",
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
      `Hola Cerámica El Almacén, solicito presupuesto formal de obra:`,
      `• Nombre / Firma: ${fullName}`,
      `• Teléfono / WhatsApp: ${phone}`,
      `• Correo: ${email}`,
      sqm ? `• Metraje estimado: ${sqm} m²` : null,
      `• Tipo de proyecto: ${projectType}`,
      selectedLines.length > 0
        ? `• Líneas de interés: ${selectedLines.join(", ")}`
        : null,
      attachedFileName
        ? `• Plano/Listado de referencia: ${attachedFileName} (lo adjunto a continuación)`
        : null,
      details.trim() ? `• Especificaciones: ${details.trim()}` : null,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappQuoteHref = buildWhatsAppUrl(buildSummaryText());
  const mailQuoteHref = `mailto:${SITE_INFO.email}?subject=${encodeURIComponent(
    `Solicitud de Cotización (${projectType}) - ${fullName}`
  )}&body=${encodeURIComponent(buildSummaryText())}`;

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={(e) => syncAriaInvalid(e.target)}
      onInput={(e) => syncAriaInvalid(e.target)}
      className="space-y-space-md"
    >
      {/* Fila 1: Nombre & Teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div className="space-y-1">
          <label
            htmlFor={nameId}
            className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block"
          >
            Nombre Completo o Razón Social *
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
            placeholder="Ej. Ing. Carlos Mendoza / Arq. Estudio"
            className="atelier-input w-full min-h-[48px] bg-surface-container-low text-base text-on-surface p-3 rounded border border-surface-container-highest focus:bg-surface-container-lowest focus:outline-none focus:border-primary placeholder:text-secondary transition-colors"
          />
          <p className="field-error hidden items-center gap-1 text-error font-body-sm text-body-sm">
            <Icon name="error" className="text-[15px]" />
            <span>Ingresa tu nombre o razón social.</span>
          </p>
        </div>

        <div className="space-y-1">
          <label
            htmlFor={phoneId}
            className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block"
          >
            Teléfono / WhatsApp *
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
            placeholder="+1 (809) 000-0000"
            className="atelier-input w-full min-h-[48px] bg-surface-container-low text-base text-on-surface p-3 rounded border border-surface-container-highest focus:bg-surface-container-lowest focus:outline-none focus:border-primary placeholder:text-secondary transition-colors"
          />
          <p className="field-error hidden items-center gap-1 text-error font-body-sm text-body-sm">
            <Icon name="error" className="text-[15px]" />
            <span>Ingresa un teléfono o WhatsApp válido.</span>
          </p>
        </div>
      </div>

      {/* Fila 2: Correo & Metros Cuadrados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        <div className="space-y-1">
          <label
            htmlFor={emailId}
            className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block"
          >
            Correo Electrónico *
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (submitted) setSubmitted(false);
            }}
            placeholder="ejemplo@constructora.com"
            className="atelier-input w-full min-h-[48px] bg-surface-container-low text-base text-on-surface p-3 rounded border border-surface-container-highest focus:bg-surface-container-lowest focus:outline-none focus:border-primary placeholder:text-secondary transition-colors"
          />
          <p className="field-error hidden items-center gap-1 text-error font-body-sm text-body-sm">
            <Icon name="error" className="text-[15px]" />
            <span>Ingresa un correo electrónico válido.</span>
          </p>
        </div>

        <div className="space-y-1">
          <label
            htmlFor={sqmId}
            className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block"
          >
            Metros Cuadrados Estimados (m²)
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
            placeholder="Ej. 250 m² de piso / pared"
            className="w-full min-h-[48px] bg-surface-container-low text-base text-on-surface p-3 rounded border border-surface-container-highest focus:bg-surface-container-lowest focus:outline-none focus:border-primary placeholder:text-secondary transition-colors"
          />
        </div>
      </div>

      {/* Fila 3: Tipo de Proyecto (<fieldset> + radios accesibles con sr-only) */}
      <fieldset className="space-y-1.5">
        <legend className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block mb-1">
          Tipo de Proyecto *
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
          {PROJECT_TYPES.map((type) => (
            <label key={type.value} className="cursor-pointer">
              <input
                type="radio"
                name="project_type"
                value={type.value}
                checked={projectType === type.value}
                onChange={() => setProjectType(type.value)}
                className="peer sr-only"
              />
              <span className="flex items-center justify-center min-h-[44px] p-3 bg-surface-container-low peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary text-on-surface text-center rounded font-label-md text-label-md transition-all">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Fila 4: Líneas de Acabado (<fieldset> + checkboxes multiselect) */}
      <fieldset className="space-y-1.5">
        <legend className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block mb-1">
          Líneas de Acabado Requeridas (Selecciona una o más)
        </legend>
        <div className="flex flex-wrap gap-space-xs">
          {FINISH_LINES.map((line) => {
            const checked = selectedLines.includes(line.label);
            return (
              <label key={line.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="finish_lines"
                  value={line.label}
                  checked={checked}
                  onChange={() => toggleLine(line.label)}
                  className="peer sr-only"
                />
                <span className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 bg-surface-container-low text-on-surface peer-checked:bg-inverse-surface peer-checked:text-inverse-on-surface peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary rounded font-label-md text-label-md transition-all">
                  <Icon name={line.icon} className="text-[16px]" />
                  <span>{line.label}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Fila 5: Especificación o Consulta */}
      <div className="space-y-1">
        <label
          htmlFor={detailsId}
          className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block"
        >
          Detalles de la Especificación o Consulta
        </label>
        <textarea
          id={detailsId}
          name="details"
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Indica formatos deseados (ej. 60×120 cm, mate/pulido), ubicación de la obra y si necesitas transporte incluido."
          className="w-full bg-surface-container-low text-base text-on-surface p-3 rounded border border-surface-container-highest focus:bg-surface-container-lowest focus:outline-none focus:border-primary placeholder:text-secondary transition-colors"
        />
      </div>

      {/* Fila 6: Referencia de Planos / PDF (sr-only accesible, no display:none) */}
      <div className="p-space-md bg-surface-container rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border border-surface-container-highest">
        <div className="flex items-center gap-space-sm min-w-0">
          <Icon
            name="upload_file"
            className="text-primary text-[24px] shrink-0"
          />
          <div className="min-w-0">
            <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
              {attachedFileName
                ? `Archivo seleccionado: ${attachedFileName}`
                : "¿Cuentas con planos o listado de materiales?"}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Formatos admitidos: PDF, JPG, DWG o envíalos directo al WhatsApp
              comercial
            </p>
          </div>
        </div>
        <label
          htmlFor={fileId}
          className="cursor-pointer min-h-[44px] inline-flex items-center justify-center bg-surface-container-lowest hover:bg-surface text-on-surface px-space-md py-2.5 rounded font-label-md text-label-md uppercase tracking-wider shadow-sm transition-colors shrink-0 text-center focus-within:outline focus-within:outline-2 focus-within:outline-primary"
        >
          <span>{attachedFileName ? "Cambiar" : "Adjuntar"}</span>
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
      </div>

      {/* Acción de Envío */}
      <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
          <Icon name="lock" className="text-[16px] text-emerald-700" />
          <span>Respuesta en menos de 24 horas laborables.</span>
        </p>
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary px-space-xl py-3.5 rounded font-label-lg text-label-lg uppercase tracking-wider font-semibold transition-colors shadow-md"
        >
          <span>Generar Solicitud de Cotización</span>
          <Icon name="send" className="text-[18px]" />
        </button>
      </div>

      {/* Confirmación Interactiva con Envío Directo a WhatsApp y Correo */}
      {submitted ? (
        <div
          aria-live="polite"
          className="p-space-lg bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 space-y-space-md"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-space-xs font-semibold text-emerald-900">
              <Icon name="check_circle" className="text-emerald-600" />
              <span>¡Presupuesto estructurado listo para enviar!</span>
            </div>
            <p className="font-body-sm text-body-sm text-emerald-800">
              Envía tu ficha de especificación con un clic para que{" "}
              <strong>Dally Moreno</strong> o <strong>Margarita Báez</strong> la
              reciban de inmediato con prioridad de obra:
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-space-sm">
            <a
              href={whatsappQuoteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#0c6b5e] text-white px-space-lg py-3 rounded font-label-md text-label-md uppercase tracking-wider shadow-sm transition-colors"
            >
              <Icon name="chat" className="text-[18px]" />
              <span>Enviar Ahora por WhatsApp</span>
            </a>
            <a
              href={mailQuoteHref}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-surface-container-lowest hover:bg-surface text-on-surface border border-emerald-300 px-space-lg py-3 rounded font-label-md text-label-md uppercase tracking-wider transition-colors"
            >
              <Icon name="mail" className="text-[18px] text-primary" />
              <span>Enviar por Correo Electrónico</span>
            </a>
          </div>
        </div>
      ) : null}
    </form>
  );
}
