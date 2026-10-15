"use client";

import { ConsentSubmitButton, useDecideConsent } from "./decide-consent";

export function DenyButton({ authorizationId }: { authorizationId: string }) {
  const { formAction, isPending } = useDecideConsent();

  return (
    <form action={formAction}>
      <input type="hidden" name="authorizationId" value={authorizationId} />
      <input type="hidden" name="action" value="deny" />
      <ConsentSubmitButton
        idleLabel="Deny"
        pendingLabel="Denying..."
        variant="outline"
        disabled={isPending}
      />
    </form>
  );
}
