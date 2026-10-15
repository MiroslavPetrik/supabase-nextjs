"use client";

import { catchError } from "next/error";
import { ConsentShell } from "./components/consent-shell";

export const AuthorizationErrorBoundary = catchError(function () {
  return (
    <ConsentShell>
      <p role="alert" className="text-sm text-destructive">
        Unable to load the authorization request. Start again from your OAuth
        client.
      </p>
    </ConsentShell>
  );
});
