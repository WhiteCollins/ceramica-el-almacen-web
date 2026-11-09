import React from "react";

interface BrandLogoProps {
  showTagline?: boolean;
  className?: string;
}

export function BrandLogo({
  showTagline = false,
  className = "",
}: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 105 84"
        fill="none"
        aria-hidden="true"
        className="h-8 w-auto shrink-0"
      >
        <g fill="#8B1E1E">
          <polygon points="34.5,10.5 49.5,25.5 34.5,40.5 19.5,25.5" />
          <polygon points="18,27 33,42 18,57 3,42" />
          <polygon points="34.5,43.5 49.5,58.5 34.5,73.5 19.5,58.5" />
          <polygon points="54,27 69,42 54,57 39,42" />
          <polygon points="70.5,10.5 85.5,25.5 70.5,40.5 55.5,25.5" />
          <polygon points="87,27 102,42 87,57 72,42" />
        </g>
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-xs sm:text-sm uppercase tracking-[0.18em] text-primary font-semibold">
          Cerámica El Almacén
        </span>
        {showTagline ? (
          <span className="text-[10px] uppercase tracking-[0.18em] text-secondary mt-0.5">
            La Perfección en Cerámica
          </span>
        ) : null}
      </span>
    </span>
  );
}
