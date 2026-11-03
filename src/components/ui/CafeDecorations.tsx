import type { SVGProps } from "react";

/**
 * Line art is deliberately abstract and decorative.
 * The brand's own photographic assets can replace placeholders later.
 */
export function BotanicalSprig({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 170 260"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21 257C53 220 73 182 89 147c16-35 30-72 49-138" />
      <path d="M77 173c-30-4-50-20-61-42M95 137c20-17 42-26 65-24M111 97C92 83 86 64 87 43M125 53c15-6 27-18 34-35M57 207c-24 0-42-10-52-24M78 169c18 2 31 12 41 29" />
      <path d="M16 131C1 115-2 91 7 76c22 12 30 33 31 52M35 151C9 153 1 139 0 126c17-3 31 5 35 25M158 114c-2-25 7-45 24-53M95 133c26-17 42-11 51 2-16 17-35 18-51-2ZM87 45c-21-18-25-36-16-45 18 8 26 24 16 45ZM127 50c-5-19 0-34 19-42 4 20-3 34-19 42ZM57 208c-28 14-47 8-57-4 17-15 37-14 57 4ZM117 199c2-21-5-36-24-42-7 17 1 34 24 42Z" />
      <path d="M137 8c-8-11-8-20-1-27M61 199c-10-19-28-25-46-20 8 16 23 24 46 20M35 151c9-24 3-43-12-53-12 16-7 35 12 53" />
      <path d="M86 158c-4 14-7 26-11 35m11-35c-10-7-15-13-20-21" strokeWidth=".7" />
    </svg>
  );
}

export function CoffeeBeanRule({ className = "" }: { className?: string }) {
  return (
    <span className={["trc-bean-rule", className].filter(Boolean).join(" ")} aria-hidden="true">
      <span className="trc-bean-line" />
      <svg width="19" height="23" viewBox="0 0 20 24" fill="none" role="img">
        <path d="M10 1C4 1 1.2 6.2 1.2 12c0 5.9 3.1 11 8.8 11s8.8-5.1 8.8-11C18.8 6.2 16 1 10 1Z" fill="currentColor"/>
        <path d="M12 2.4C5.9 7.7 14.4 13 7.7 21.5" stroke="var(--cream)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="trc-bean-line" />
    </span>
  );
}

export function GoldenArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 12h16m-7-7 7 7-7 7"/>
    </svg>
  );
}
