import type { PropsWithChildren, ReactNode } from "react";
import { LogoIcon } from "@/components/logo/LogoIcon";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ConsentCard({
  clientName,
  clientIcon,
  children,
}: PropsWithChildren<{
  clientIcon: ReactNode;
  clientName: ReactNode;
}>) {
  return (
    <>
      <CardHeader className="items-center space-y-4 text-center">
        <div className="flex items-center justify-center">
          <div className="flex size-12 items-center justify-center rounded-full border bg-muted font-medium">
            {clientIcon}
          </div>
          <div className="h-px w-8 bg-border" aria-hidden="true" />
          <LogoIcon dark />
        </div>
        <div className="space-y-1.5">
          <CardTitle className="font-medium text-lg tracking-normal">
            Authorize {clientName}
          </CardTitle>
          <CardDescription>Review what this client gets access to.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </>
  );
}
