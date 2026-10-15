import type { PropsWithChildren } from "react";

export function DetailsList({ children }: PropsWithChildren) {
  return <dl className="divide-y rounded-lg border text-sm">{children}</dl>;
}

export function DetailsItem({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-between gap-6 p-4">
      {children}
    </div>
  );
}

export function DetailsLabel({ children }: PropsWithChildren) {
  return <dt className="text-muted-foreground">{children}</dt>;
}

export function DetailsValue({ children }: PropsWithChildren) {
  return (
    <dd className="min-w-0 break-all text-right font-medium">{children}</dd>
  );
}
