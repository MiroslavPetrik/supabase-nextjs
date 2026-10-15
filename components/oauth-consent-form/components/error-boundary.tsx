"use client";

import { catchError } from "next/error";
import { ConsentShell } from "./consent-shell";

export const AuthorizationErrorBoundary = catchError(() => (
  <ConsentShell>
    <p role="alert" className="text-destructive text-sm">
      Unable to load the authorization request. Start again from your OAuth
      client.
    </p>
  </ConsentShell>
));
