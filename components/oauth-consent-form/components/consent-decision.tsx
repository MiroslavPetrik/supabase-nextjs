"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { decideConsent } from "../action";

export function ConsentDecision({
  authorizationId,
}: {
  authorizationId: string;
}) {
  const [state, formAction, isPending] = useActionState(decideConsent, null);

  return (
    <CardFooter className="flex w-full flex-col gap-3">
      {state?.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <form action={formAction}>
          <input type="hidden" name="authorizationId" value={authorizationId} />
          <input type="hidden" name="action" value="deny" />
          <SubmitButton
            label="Deny"
            pendingLabel="Denying..."
            variant="outline"
            disabled={isPending}
          />
        </form>
        <form action={formAction}>
          <input type="hidden" name="authorizationId" value={authorizationId} />
          <input type="hidden" name="action" value="approve" />
          <SubmitButton
            label="Allow access"
            pendingLabel="Allowing..."
            variant="default"
            disabled={isPending}
          />
        </form>
      </div>
    </CardFooter>
  );
}

export function SubmitButton({
  label,
  pendingLabel,
  variant,
  disabled,
}: {
  label: string;
  pendingLabel: string;
  variant: "default" | "outline";
  disabled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" variant={variant} disabled={disabled}>
      {pending ? pendingLabel : label}
    </Button>
  );
}
