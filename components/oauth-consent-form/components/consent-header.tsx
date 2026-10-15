import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const getInitial = (value: string) =>
  value.trim().charAt(0).toUpperCase() || "?";

export function ConsentHeader({
  clientName,
  productName,
}: {
  productName: string;
  clientName: string;
}) {
  return (
    <CardHeader className="items-center space-y-4 text-center">
      <div className="flex items-center justify-center">
        <div className="flex size-12 items-center justify-center rounded-full border bg-muted font-medium">
          {getInitial(clientName)}
        </div>
        <div className="h-px w-8 bg-border" aria-hidden="true" />
        <div className="flex size-12 items-center justify-center rounded-full border bg-muted font-medium">
          {getInitial(productName)}
        </div>
      </div>
      <div className="space-y-1.5">
        <CardTitle className="font-medium text-lg tracking-normal">
          Authorize {clientName}
        </CardTitle>
        <CardDescription>
          Review what this client gets access to.
        </CardDescription>
      </div>
    </CardHeader>
  );
}
