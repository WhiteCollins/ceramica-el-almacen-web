"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { Icon } from "@/components/Icon";
import { ModalDialog } from "@/components/ModalDialog";
import { CATALOG_PRODUCTS } from "@/data/catalog";
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

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const closeMenuTimerRef = useRef<number | null>(null);

  // Cierra el megamenú y el buscador al cambiar de ruta
  useEffect(() => {
    setCatalogMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Enfoca el input al abrir la barra de búsqueda desplegable
  useEffect(() => {
    if (searchOpen) {
      const id = window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
      return () => window.clearTimeout(id);
    }
  }, [searchOpen]);

  // Cierra la barra de búsqueda al hacer clic fuera o presionar Escape
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
    setCatalogMenuOpen(true);
  };

  const scheduleCloseMegaMenu = () => {
    if (closeMenuTimerRef.current !== null) {
      window.clearTimeout(closeMenuTimerRef.current);
    }
    closeMenuTimerRef.current = window.setTimeout(() => {
      setCatalogMenuOpen(false);
    }, 120);
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

  return (
    <>
      {/* Header Sticky con expansión fluida de megamenú al pasar el puntero sobre "Catálogo" */}
      <header
        onMouseLeave={scheduleCloseMegaMenu}
        onKeyDown={(e) => {
          if (e.key === "Escape" && catalogMenuOpen) {
            setCatalogMenuOpen(false);
          }
        }}
        className="site-sticky-header w-full"
      >
        <div className="site-sticky-bar bg-surface/95 backdrop-blur-md shadow-[0_1px_6px_rgba(0,0,0,0.04)] border-b border-surface-container-high">
          <div className="h-16 lg:h-20 w-full px-margin-mobile lg:px-margin-desktop max-w-7xl mx-auto flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-gutter">
            {/* Logo */}
            <div className="flex items-center justify-start">
              <Link
                href="/"
                className="inline-flex items-center min-h-[44px] py-1 rounded"
              >
                <BrandLogo />
              </Link>
            </div>

            {/* Navegación Principal Centrada */}
            <nav
              aria-label="Principal"
              className="hidden lg:flex items-center justify-center gap-8 xl:gap-10"
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
                      className="relative flex items-center"
                    >
                      <Link
                        href={item.href}
                        aria-expanded={catalogMenuOpen}
                        aria-controls={megaMenuId}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                        className={
                          isActive || catalogMenuOpen
                            ? "inline-flex items-center gap-1 min-h-[44px] px-1 transition-colors text-primary font-label-lg text-label-lg font-semibold border-b-2 border-primary"
                            : "inline-flex items-center gap-1 min-h-[44px] px-1 text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-colors"
                        }
                      >
                        <span>{item.label}</span>
                        <Icon
                          name="expand_more"
                          className={`text-[18px] transition-transform duration-300 ${
                            catalogMenuOpen ? "rotate-180 text-primary" : ""
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

            {/* Buscador desplegable hacia la izquierda de la lupa + botón menú móvil */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2">
              <div
                ref={searchContainerRef}
                className="relative flex items-center justify-end"
              >
                <search className="flex items-center">
                  <form
                    onSubmit={handleQuickSearchSubmit}
                    className="flex items-center"
                  >
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${
                        searchOpen
                          ? "w-[210px] sm:w-[270px] lg:w-[300px] opacity-100 mr-1.5"
                          : "w-0 opacity-0 mr-0 pointer-events-none"
                      }`}
                    >
                      <label htmlFor={quickSearchInputId} className="sr-only">
                        Buscar por nombre, formato, acabado o código SKU
                      </label>
                      <div className="relative w-full">
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
                          placeholder="Buscar acabado, medida, SKU..."
                          className="w-full h-10 bg-white text-sm text-on-surface pl-3.5 pr-8 rounded-full border border-outline focus:border-primary focus:outline-none transition-colors shadow-sm"
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
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded-full text-secondary hover:text-on-surface"
                          >
                            <Icon name="close" className="text-[16px]" />
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (searchOpen && quickQuery.trim()) {
                          router.push(
                            `/catalogo?q=${encodeURIComponent(
                              quickQuery.trim()
                            )}`
                          );
                          setSearchOpen(false);
                        } else {
                          setSearchOpen((prev) => !prev);
                        }
                      }}
                      aria-expanded={searchOpen}
                      aria-label={
                        searchOpen
                          ? "Ejecutar o cerrar búsqueda"
                          : "Abrir barra de búsqueda"
                      }
                      className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full transition-colors ${
                        searchOpen
                          ? "bg-primary text-white"
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      <Icon name="search" className="text-[22px]" />
                    </button>
                  </form>
                </search>

                {/* Sugerencias rápidas cuando el usuario escribe en el buscador */}
                {searchOpen && quickQuery.trim().length > 0 ? (
                  <div className="absolute right-0 top-full mt-2 w-[300px] sm:w-[360px] rounded-xl bg-white border border-outline shadow-lg p-3 z-50">
                    <div className="flex items-center justify-between px-2 pb-2 border-b border-outline/60">
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                        Resultados ({quickResults.length})
                      </span>
                      <Link
                        href={`/catalogo?q=${encodeURIComponent(
                          quickQuery.trim()
                        )}`}
                        onClick={() => setSearchOpen(false)}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Ver todos →
                      </Link>
                    </div>
                    {quickResults.length === 0 ? (
                      <p className="text-xs text-secondary py-4 px-2 text-center">
                        No encontramos piezas con ese término. Presiona Enter
                        para explorar el catálogo completo.
                      </p>
                    ) : (
                      <ul
                        role="list"
                        className="divide-y divide-outline/40 max-h-64 overflow-y-auto mt-1"
                      >
                        {quickResults.map((product) => (
                          <li key={product.id}>
                            <Link
                              href={`/catalogo/${product.id}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center gap-3 py-2 px-2 hover:bg-surface-container-low rounded-lg transition-colors"
                            >
                              <Image
                                src={product.image}
                                alt={product.imageAlt}
                                width={40}
                                height={40}
                                className="w-10 h-10 object-cover rounded bg-surface-container shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-on-surface truncate">
                                  {product.name}
                                </p>
                                <p className="text-xs text-secondary truncate">
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

          {/* Megamenú Desplegable de Catálogo con tarjetas visuales (animación fluida hacia abajo) */}
          <div
            id={megaMenuId}
            onMouseEnter={openMegaMenu}
            onMouseLeave={scheduleCloseMegaMenu}
            aria-hidden={!catalogMenuOpen}
            inert={!catalogMenuOpen}
            className={`hidden lg:grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
              catalogMenuOpen
                ? "grid-rows-[1fr] opacity-100 border-t border-surface-container-high"
                : "grid-rows-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              <div className="max-w-7xl mx-auto px-margin-desktop py-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-xl text-on-surface">
                      Explora por categoría y espacio
                    </p>
                  </div>
                  <Link
                    href="/catalogo"
                    onClick={() => setCatalogMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    <span>Ver todo el catálogo</span>
                    <Icon name="arrow_forward" className="text-[16px]" />
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-5">
                  {SPACES.map((space) => (
                    <Link
                      key={space.slug}
                      href={`/${space.slug}`}
                      onClick={() => setCatalogMenuOpen(false)}
                      className="group relative block aspect-[16/10] w-full rounded-xl overflow-hidden bg-surface-container-low shadow-sm hover:shadow-md transition-all"
                    >
                      <Image
                        src={space.image}
                        alt={space.imageAlt}
                        fill
                        sizes="25vw"
                        quality={90}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        style={
                          space.imagePosition
                            ? { objectPosition: space.imagePosition }
                            : undefined
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                        <span className="font-serif text-xl font-normal">
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
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              return (
                <div key={item.href} className="flex flex-col">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
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

                  {item.hasMegaMenu ? (
                    <div className="grid grid-cols-2 gap-2 pl-3 pr-1 py-2">
                      {SPACES.map((space) => (
                        <Link
                          key={space.slug}
                          href={`/${space.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="relative aspect-[16/10] rounded-lg overflow-hidden group"
                        >
                          <Image
                            src={space.image}
                            alt={space.imageAlt}
                            fill
                            sizes="45vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                          <span className="absolute bottom-2 left-2.5 font-serif text-sm text-white">
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
