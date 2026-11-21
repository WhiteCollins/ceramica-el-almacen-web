"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { Icon } from "@/components/Icon";
import { ModalDialog } from "@/components/ModalDialog";
import { CATALOG_PRODUCTS, CATEGORY_FILTERS, FINISH_FILTERS } from "@/data/catalog";
import { SITE_INFO, buildWhatsAppUrl } from "@/data/site";
import { SPACES } from "@/data/spaces";

interface NavItem {
  href: string;
  label: string;
  hasMegaMenu?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo", hasMegaMenu: true },
  { href: "/showroom", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

const SPACE_SLUGS = new Set(SPACES.map((s) => s.slug));

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState("");

  const mobileTitleId = useId();
  const quickSearchInputId = useId();
  const megaMenuId = useId();

  const searchPanelId = useId();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const closeMenuTimerRef = useRef<number | null>(null);

  // Al navegar, el megamenú se cierra sin animación para no desvanecerse
  // encima de la página nueva.
  const [closingInstantly, setClosingInstantly] = useState(false);

  const closeMegaMenuNow = () => {
    if (closeMenuTimerRef.current !== null) {
      window.clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }
    setClosingInstantly(true);
    setCatalogMenuOpen(false);
  };

  useEffect(() => {
    if (!closingInstantly) return;
    const id = window.setTimeout(() => setClosingInstantly(false), 60);
    return () => window.clearTimeout(id);
  }, [closingInstantly]);

  useEffect(() => {
    closeMegaMenuNow();
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) {
      const id = window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
      return () => window.clearTimeout(id);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen]);

  const openMegaMenu = () => {
    if (closeMenuTimerRef.current !== null) {
      window.clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }
    setSearchOpen(false);
    setCatalogMenuOpen(true);
  };

  const scheduleCloseMegaMenu = () => {
    if (closeMenuTimerRef.current !== null) {
      window.clearTimeout(closeMenuTimerRef.current);
    }
    closeMenuTimerRef.current = window.setTimeout(() => {
      setCatalogMenuOpen(false);
    }, 130);
  };

  const quickResults = useMemo(() => {
    const q = quickQuery.trim().toLowerCase();
    if (!q) return [];
    return CATALOG_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.finish.toLowerCase().includes(q) ||
        p.dimensionsLabel.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [quickQuery]);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickQuery.trim();
    setSearchOpen(false);
    router.push(
      trimmed ? `/catalogo?q=${encodeURIComponent(trimmed)}` : "/catalogo"
    );
  };

  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const isCatalogOrSpaceRoute =
    pathname === "/catalogo" ||
    pathname.startsWith("/catalogo/") ||
    SPACE_SLUGS.has(firstSegment);

  const catalogCategoryLinks = CATEGORY_FILTERS.filter((c) => c.id !== "all");

  return (
    <>
      {/* Cortina oscura editorial (estilo Manolo Blahnik) cuando se despliega el megamenú o el buscador */}
      <div
        aria-hidden="true"
        onClick={() => {
          setCatalogMenuOpen(false);
          setSearchOpen(false);
        }}
        className={`fixed inset-0 z-30 bg-black/25 ${
          closingInstantly
            ? ""
            : "transition-opacity duration-200 ease-out motion-reduce:transition-none"
        } ${
          catalogMenuOpen || searchOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Header Sticky Editorial */}
      <header
        onMouseLeave={scheduleCloseMegaMenu}
        onKeyDown={(e) => {
          if (e.key === "Escape" && catalogMenuOpen) {
            setCatalogMenuOpen(false);
          }
        }}
        className="site-sticky-header w-full"
      >
        <div
          ref={searchContainerRef}
          className="site-sticky-bar relative bg-white/95 backdrop-blur-md border-b border-outline/60"
        >
          <div className="h-16 lg:h-[74px] w-full px-margin-mobile lg:px-margin-desktop max-w-7xl mx-auto flex items-center justify-between lg:grid lg:grid-cols-12 gap-2">
            {/* Navegación Izquierda (5 cols) */}
            <nav
              aria-label="Principal"
              className="hidden lg:flex lg:col-span-5 items-center justify-start gap-6 xl:gap-8 h-full"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = item.hasMegaMenu
                  ? isCatalogOrSpaceRoute
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                if (item.hasMegaMenu) {
                  return (
                    <div
                      key={item.href}
                      onMouseEnter={openMegaMenu}
                      onFocusCapture={openMegaMenu}
                      onBlurCapture={(e) => {
                        if (
                          !e.currentTarget.contains(e.relatedTarget as Node)
                        ) {
                          scheduleCloseMegaMenu();
                        }
                      }}
                      className="relative flex items-center h-full"
                    >
                      <Link
                        href={item.href}
                        aria-expanded={catalogMenuOpen}
                        aria-controls={megaMenuId}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                        className={`inline-flex items-center gap-1.5 h-full text-xs uppercase tracking-[0.2em] transition-colors border-b-2 ${
                          isActive || catalogMenuOpen
                            ? "text-on-surface font-semibold border-[#6b1d22]"
                            : "text-on-surface/80 hover:text-on-surface border-transparent"
                        }`}
                      >
                        <span>{item.label}</span>
                        <Icon
                          name="expand_more"
                          className={`text-[15px] transition-transform duration-300 ${
                            catalogMenuOpen ? "rotate-180 text-[#6b1d22]" : ""
                          }`}
                        />
                      </Link>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setCatalogMenuOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`inline-flex items-center h-full text-xs uppercase tracking-[0.2em] transition-colors border-b-2 ${
                      isActive
                        ? "text-on-surface font-semibold border-[#6b1d22]"
                        : "text-on-surface/80 hover:text-on-surface border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Logotipo Protagonista Centrado (En móvil a la izquierda, en escritorio centrado col-span-4) */}
            <div className="flex items-center justify-start lg:justify-center lg:col-span-4">
              <Link
                href="/"
                className="inline-flex items-center min-h-[44px] py-1 whitespace-nowrap"
              >
                <BrandLogo />
              </Link>
            </div>

            {/* Utilidades Derecha (3 cols): Botón de búsqueda + Cotizar + Menú móvil */}
            <div className="flex items-center justify-end gap-2 lg:col-span-3">
              <button
                type="button"
                onClick={() => {
                  closeMegaMenuNow();
                  setSearchOpen((prev) => !prev);
                }}
                aria-expanded={searchOpen}
                aria-controls={searchPanelId}
                aria-label={
                  searchOpen ? "Cerrar búsqueda" : "Abrir barra de búsqueda"
                }
                className={`min-h-[42px] min-w-[42px] inline-flex items-center justify-center transition-colors ${
                  searchOpen
                    ? "bg-on-surface text-white"
                    : "text-on-surface hover:text-[#6b1d22]"
                }`}
              >
                <Icon
                  name={searchOpen ? "close" : "search"}
                  className="text-[20px]"
                />
              </button>

              <Link
                href="/contacto"
                className="hidden xl:inline-flex items-center justify-center min-h-[38px] px-4 border border-on-surface text-on-surface hover:bg-on-surface hover:text-white text-[11px] uppercase tracking-[0.2em] font-medium transition-colors whitespace-nowrap"
              >
                Cotizar
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menú de navegación"
                className="lg:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
              >
                <Icon name="menu" className="text-[24px]" />
              </button>
            </div>
          </div>

          {/* Panel de Búsqueda Desplegable de Ancho Completo debajo del Header (sin tapar el logotipo) */}
          <div
            id={searchPanelId}
            aria-hidden={!searchOpen}
            inert={!searchOpen}
            className={`absolute inset-x-0 top-full z-40 bg-white border-t border-outline/60 border-b border-outline/60 shadow-xl transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
              searchOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="max-w-3xl mx-auto px-margin-mobile lg:px-margin-desktop py-5 space-y-4">
              <search>
                <form
                  onSubmit={handleQuickSearchSubmit}
                  className="flex items-center gap-2.5"
                >
                  <label htmlFor={quickSearchInputId} className="sr-only">
                    Buscar por nombre, formato, acabado o código SKU
                  </label>
                  <div className="relative flex-1 min-w-0">
                    <Icon
                      name="search"
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[18px]"
                    />
                    <input
                      ref={searchInputRef}
                      id={quickSearchInputId}
                      type="search"
                      name="q"
                      value={quickQuery}
                      onChange={(e) => setQuickQuery(e.target.value)}
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      tabIndex={searchOpen ? 0 : -1}
                      placeholder="Buscar porcelanato, acabado, 60×120, SKU..."
                      className="w-full h-11 bg-surface text-base lg:text-sm tracking-wide text-on-surface pl-10 pr-9 border border-outline focus:border-on-surface focus:outline-none transition-colors"
                    />
                    {quickQuery ? (
                      <button
                        type="button"
                        onClick={() => {
                          setQuickQuery("");
                          searchInputRef.current?.focus();
                        }}
                        aria-label="Limpiar texto de búsqueda"
                        tabIndex={searchOpen ? 0 : -1}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center text-secondary hover:text-on-surface"
                      >
                        <Icon name="close" className="text-[16px]" />
                      </button>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    tabIndex={searchOpen ? 0 : -1}
                    className="h-11 px-5 shrink-0 bg-on-surface hover:bg-[#6b1d22] text-white text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors"
                  >
                    Buscar
                  </button>
                </form>
              </search>

              {quickQuery.trim().length > 0 ? (
                <div className="border-t border-outline/50 pt-3">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">
                      Resultados ({quickResults.length})
                    </span>
                    <Link
                      href={`/catalogo?q=${encodeURIComponent(
                        quickQuery.trim()
                      )}`}
                      onClick={() => setSearchOpen(false)}
                      className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b1d22] hover:underline"
                    >
                      Ver todos →
                    </Link>
                  </div>

                  {quickResults.length === 0 ? (
                    <p className="text-xs text-secondary py-4 text-center">
                      No encontramos piezas con ese término. Presiona Buscar
                      para explorar el catálogo completo.
                    </p>
                  ) : (
                    <ul
                      role="list"
                      className="divide-y divide-outline/40 max-h-64 overflow-y-auto"
                    >
                      {quickResults.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/catalogo/${product.id}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center gap-3.5 py-2.5 px-2 hover:bg-surface-container-low transition-colors"
                          >
                            <Image
                              src={product.image}
                              alt={product.imageAlt}
                              width={44}
                              height={44}
                              className="w-11 h-11 object-cover bg-surface-container shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface truncate">
                                {product.name}
                              </p>
                              <p className="text-[11px] text-secondary truncate">
                                {product.dimensionsLabel} · {product.finish}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* Megamenú Editorial Desplegable estilo Manolo Blahnik (Columnas con guion "–" + 4 Tarjetas Visuales de Espacio).
              Se superpone a la página (absolute) en lugar de empujarla, y se anima solo con
              opacidad y desplazamiento, que el navegador compone sin recalcular el diseño. */}
          <div
            id={megaMenuId}
            onMouseEnter={openMegaMenu}
            onMouseLeave={scheduleCloseMegaMenu}
            aria-hidden={!catalogMenuOpen}
            inert={!catalogMenuOpen}
            className={`hidden lg:block absolute inset-x-0 top-full bg-white border-t border-outline/60 shadow-xl ${
              closingInstantly
                ? ""
                : "transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none"
            } ${
              catalogMenuOpen
                ? "visible opacity-100 translate-y-0"
                : "invisible opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              <div className="max-w-7xl mx-auto px-margin-desktop py-8 grid grid-cols-12 gap-8 items-start">
                {/* Columnas de Navegación por Línea y Acabado con microinteracción "–" (4 cols) */}
                <div className="col-span-4 grid grid-cols-2 gap-6 border-r border-outline/50 pr-6">
                  <div className="space-y-3">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-on-surface pb-1 border-b border-outline/50">
                      Colecciones
                    </span>
                    <ul role="list" className="space-y-1.5">
                      {catalogCategoryLinks.map((cat) => (
                        <li key={cat.id}>
                          <Link
                            href={`/catalogo?categoria=${cat.id}`}
                            onClick={closeMegaMenuNow}
                            className="group/item flex items-center text-xs tracking-wider text-secondary hover:text-on-surface py-1 transition-colors"
                          >
                            <span className="inline-block w-0 overflow-hidden opacity-0 group-hover/item:w-3.5 group-hover/item:opacity-100 text-[#6b1d22] transition-all duration-200">
                              –
                            </span>
                            <span>{cat.label}</span>
                          </Link>
                        </li>
                      ))}
                      <li className="pt-2">
                        <Link
                          href="/catalogo"
                          onClick={closeMegaMenuNow}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b1d22] hover:underline"
                        >
                          <span>Ver todo el catálogo</span>
                          <Icon name="arrow_forward" className="text-[13px]" />
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-on-surface pb-1 border-b border-outline/50">
                      Acabados
                    </span>
                    <ul role="list" className="space-y-1.5">
                      {FINISH_FILTERS.map((finish) => (
                        <li key={finish}>
                          <Link
                            href={`/catalogo?acabado=${encodeURIComponent(
                              finish
                            )}`}
                            onClick={closeMegaMenuNow}
                            className="group/item flex items-center text-xs tracking-wider text-secondary hover:text-on-surface py-1 transition-colors"
                          >
                            <span className="inline-block w-0 overflow-hidden opacity-0 group-hover/item:w-3.5 group-hover/item:opacity-100 text-[#6b1d22] transition-all duration-200">
                              –
                            </span>
                            <span>{finish}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4 Tarjetas Visuales de Espacio a la derecha (8 cols) */}
                <div className="col-span-8 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
                      Explorar por espacio arquitectónico
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {SPACES.map((space) => (
                      <Link
                        key={space.slug}
                        href={space.catalogHref}
                        onClick={closeMegaMenuNow}
                        className="group relative block aspect-[4/3] w-full overflow-hidden bg-surface-container-low"
                      >
                        <Image
                          src={space.image}
                          alt={space.imageAlt}
                          fill
                          quality={95}
                          sizes="640px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          style={
                            space.imagePosition
                              ? { objectPosition: space.imagePosition }
                              : undefined
                          }
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-3.5 text-center">
                          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
                            {space.label}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center bg-surface-container text-on-surface"
            >
              <Icon name="close" className="text-[20px]" />
            </button>
          </div>

          <nav aria-label="Móvil" className="flex flex-col divide-y divide-outline/40">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              return (
                <div key={item.href} className="flex flex-col py-1">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[48px] px-2 py-3 text-xs uppercase tracking-[0.2em] flex items-center justify-between ${
                      isActive
                        ? "text-[#6b1d22] font-semibold"
                        : "text-on-surface"
                    }`}
                  >
                    <span>{item.label}</span>
                    <Icon name="chevron_right" className="text-[18px]" />
                  </Link>

                  {item.hasMegaMenu ? (
                    <div className="grid grid-cols-2 gap-2 pb-3 pt-1">
                      {SPACES.map((space) => (
                        <Link
                          key={space.slug}
                          href={space.catalogHref}
                          onClick={() => setMobileMenuOpen(false)}
                          className="relative aspect-[16/10] overflow-hidden group"
                        >
                          <Image
                            src={space.image}
                            alt={space.imageAlt}
                            fill
                            quality={95}
                            sizes="45vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                          <span className="absolute bottom-2 inset-x-0 text-center text-[11px] uppercase tracking-[0.18em] text-white font-medium">
                            {space.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="pt-space-sm border-t border-surface-container flex flex-col gap-2.5">
            <a
              href={buildWhatsAppUrl(
                "Hola, deseo cotizar materiales con Cerámica El Almacén."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 bg-on-surface hover:bg-[#6b1d22] text-white py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
            >
              <Icon name="chat" className="text-[16px]" />
              <span>Cotizar por WhatsApp</span>
            </a>
            <a
              href={SITE_INFO.phoneHref}
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 border border-on-surface text-on-surface py-3 text-xs uppercase tracking-[0.18em]"
            >
              <Icon name="call" className="text-[16px] text-[#6b1d22]" />
              <span>{SITE_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </ModalDialog>
    </>
  );
}
