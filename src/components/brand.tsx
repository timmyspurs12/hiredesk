import Link from "next/link";

export function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#f4f4f5" />
      <path
        d="M10 22V10h5.2c2.6 0 4.2 1.5 4.2 3.7 0 1.4-.7 2.5-1.9 3.1 1.5.5 2.4 1.7 2.4 3.4 0 2.4-1.8 3.8-4.6 3.8H10zm3.1-7.2h1.8c1.2 0 1.9-.6 1.9-1.5s-.7-1.4-1.9-1.4h-1.8v2.9zm0 5.2h2.2c1.3 0 2.1-.6 2.1-1.6s-.8-1.6-2.1-1.6h-2.2V20z"
        fill="#111"
      />
    </svg>
  );
}

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 tracking-[0.18em] text-[13px] font-semibold">
      <Mark />
      HIREDESK
    </Link>
  );
}
