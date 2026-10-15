"use client";

import { ConsentSubmitButton, useDecideConsent } from "./decide-consent";

export function ApproveButton({
  authorizationId,
}: {
  authorizationId: string;
}) {
  const { formAction, isPending } = useDecideConsent();

  return (
    <form action={formAction}>
      <input type="hidden" name="authorizationId" value={authorizationId} />
      <input type="hidden" name="action" value="approve" />
      <ConsentSubmitButton
        idleLabel="Allow access"
        pendingLabel="Allowing..."
        variant="default"
        disabled={isPending}
      />
    </form>
  );
}
