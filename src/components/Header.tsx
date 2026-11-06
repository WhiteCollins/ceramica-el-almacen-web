"use client";

import React, { useId, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { Icon } from "@/components/Icon";
import { ModalDialog } from "@/components/ModalDialog";
import { CATALOG_PRODUCTS } from "@/data/catalog";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/showroom", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState("");

  const searchTitleId = useId();
  const mobileTitleId = useId();
  const quickSearchInputId = useId();

  const quickResults = useMemo(() => {
    const q = quickQuery.trim().toLowerCase();
    if (!q) return CATALOG_PRODUCTS.slice(0, 4);
    return CATALOG_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.finish.toLowerCase().includes(q) ||
        p.dimensionsLabel.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [quickQuery]);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickQuery.trim();
    setSearchOpen(false);
    router.push(
      trimmed ? `/catalogo?q=${encodeURIComponent(trimmed)}` : "/catalogo"
    );
  };

  return (
    <>
      {/* Barra Superior Institucional en flujo normal: desaparece suavemente al bajar */}
      <div className="bg-surface-container-high text-on-surface-variant text-center py-1.5 px-margin-mobile lg:px-margin-desktop font-label-caps text-label-caps uppercase flex items-center justify-center gap-2 border-b border-surface-container-highest">
        <Icon name="storefront" className="text-[15px] text-primary shrink-0" />
        <span className="sm:hidden truncate">
          San Pedro de Macorís • Lun–Sáb • {SITE_INFO.phoneDisplay}
        </span>
        <span className="hidden sm:inline truncate">
          Importadores directos en San Pedro de Macorís • Atención de Lunes a
          Sábado • Tel: {SITE_INFO.phoneDisplay}
        </span>
      </div>

      {/* Header Sticky Compacto (64px en móvil, 80px en escritorio) */}
      <header className="site-sticky-header w-full">
        <div className="site-sticky-bar bg-surface/95 backdrop-blur-md shadow-[0_1px_6px_rgba(0,0,0,0.04)] border-b border-surface-container-high">
          <div className="h-16 lg:h-20 w-full px-margin-mobile lg:px-margin-desktop max-w-7xl mx-auto flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-gutter">
            <div className="flex items-center justify-start">
              <Link
                href="/"
                className="inline-flex items-center min-h-[44px] py-1 rounded"
              >
                <BrandLogo />
              </Link>
            </div>

            <nav
              aria-label="Principal"
              className="hidden lg:flex items-center justify-center gap-8 xl:gap-10"
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "inline-flex items-center min-h-[44px] px-1 transition-colors text-primary font-label-lg text-label-lg font-semibold border-b-2 border-primary"
                        : "inline-flex items-center min-h-[44px] px-1 text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-colors"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-end gap-1 sm:gap-space-sm">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Buscar especificaciones y materiales"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors"
              >
                <Icon name="search" className="text-[22px]" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menú de navegación"
                className="lg:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-on-surface hover:bg-surface-container rounded transition-colors"
              >
                <Icon name="menu" className="text-[24px]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal de Búsqueda Rápida (<dialog> nativo con <search>) */}
      <ModalDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        labelledBy={searchTitleId}
        className="max-w-2xl"
      >
        <div className="p-space-lg sm:p-space-xl flex flex-col gap-space-md">
          <div className="flex items-center justify-between gap-2">
            <h2
              id={searchTitleId}
              className="font-headline-md text-headline-md text-on-surface"
            >
              Buscar en el Catálogo Técnico
            </h2>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Cerrar buscador"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded bg-surface-container text-secondary hover:text-on-surface transition-colors shrink-0"
            >
              <Icon name="close" className="text-[20px]" />
            </button>
          </div>

          <search>
            <form onSubmit={handleQuickSearchSubmit} className="relative">
              <label htmlFor={quickSearchInputId} className="sr-only">
                Buscar por nombre, formato, acabado o código SKU
              </label>
              <Icon
                name="search"
                className="absolute left-space-md top-1/2 -translate-y-1/2 text-secondary text-[20px]"
              />
              <input
                id={quickSearchInputId}
                type="search"
                name="q"
                autoFocus
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="Ej. 60×120, Sottovento, Oro Cepillado..."
                className="w-full min-h-[48px] bg-surface-container-low text-base text-on-surface pl-11 pr-28 py-3 rounded border border-outline-variant/50 focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[40px] bg-primary hover:bg-primary-container text-on-primary px-3 py-2 rounded font-label-md text-label-md uppercase"
              >
                Ver Todo
              </button>
            </form>
          </search>

          <div className="space-y-space-xs">
            <span className="font-label-caps text-label-caps text-secondary uppercase block">
              {quickQuery.trim()
                ? `Resultados (${quickResults.length})`
                : `Selección Destacada en Web (${CATALOG_PRODUCTS.length} piezas)`}
            </span>
            {quickResults.length === 0 ? (
              <p className="font-body-md text-body-md text-secondary py-space-md text-center">
                No encontramos coincidencias exactas. Consulta disponibilidad en
                almacén con nuestras asesoras.
              </p>
            ) : (
              <ul
                role="list"
                className="divide-y divide-surface-container max-h-72 overflow-y-auto"
              >
                {quickResults.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/catalogo/${product.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-space-md min-h-[56px] py-2.5 px-2 hover:bg-surface-container-low rounded transition-colors"
                    >
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        width={48}
                        height={60}
                        className="w-12 h-14 object-cover rounded bg-surface-container shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-headline-sm text-headline-sm text-on-surface truncate">
                          {product.name}
                        </p>
                        <p className="font-body-sm text-body-sm text-secondary truncate">
                          {product.dimensionsLabel} • {product.finish} • SKU:{" "}
                          {product.sku}
                        </p>
                      </div>
                      <Icon
                        name="arrow_forward"
                        className="text-[18px] text-primary shrink-0"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </ModalDialog>

      {/* Menú Móvil (<dialog> nativo deslizable) */}
      <ModalDialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        labelledBy={mobileTitleId}
        variant="drawer"
      >
        <div className="p-space-lg flex flex-col gap-space-md">
          <div className="flex items-center justify-between border-b border-surface-container pb-space-sm">
            <span id={mobileTitleId}>
              <BrandLogo showTagline />
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded bg-surface-container text-on-surface"
            >
              <Icon name="close" className="text-[20px]" />
            </button>
          </div>

          <nav aria-label="Móvil" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={
                    isActive
                      ? "min-h-[48px] px-space-md py-3 rounded bg-primary text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-between"
                      : "min-h-[48px] px-space-md py-3 rounded text-on-surface hover:bg-surface-container font-label-lg text-label-lg flex items-center justify-between"
                  }
                >
                  <span>{item.label}</span>
                  <Icon name="chevron_right" className="text-[18px]" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-space-sm border-t border-surface-container flex flex-col gap-space-sm">
            <a
              href={buildWhatsAppUrl(
                "Hola, deseo cotizar materiales con Cerámica El Almacén."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary py-3 rounded font-label-md text-label-md uppercase tracking-wider"
            >
              <Icon name="chat" className="text-[18px]" />
              <span>Cotizar por WhatsApp</span>
            </a>
            <a
              href={SITE_INFO.phoneHref}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-space-xs bg-surface-container text-on-surface py-3 rounded font-label-md text-label-md"
            >
              <Icon name="call" className="text-[18px] text-primary" />
              <span>Llamar: {SITE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </ModalDialog>
    </>
  );
}
