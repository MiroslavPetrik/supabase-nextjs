import type { ReactNode } from "react";

export function DetailsItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 p-4">
      {children}
    </div>
  );
}

export function DetailsLabel({ children }: { children: ReactNode }) {
  return <dt className="text-muted-foreground">{children}</dt>;
}

export function DetailsValue({ children }: { children: ReactNode }) {
  return (
    <dd className="min-w-0 break-all text-right font-medium">{children}</dd>
  );
}

export function DetailsList({ children }: { children: ReactNode }) {
  return <dl className="divide-y rounded-lg border text-sm">{children}</dl>;
}
