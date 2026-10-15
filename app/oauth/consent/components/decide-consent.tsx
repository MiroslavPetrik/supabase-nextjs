"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  type PropsWithChildren,
  useActionState,
  useContext,
  useEffect,
} from "react";
import { useFormStatus } from "react-dom";
import { Alert } from "@/components/alert";
import { AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { decideConsent } from "../action";

type DecideConsentContextValue = {
  formAction: (formData: FormData) => void;
  isPending: boolean;
};

const DecideConsentContext = createContext<DecideConsentContextValue | null>(
  null,
);

export function useDecideConsent() {
  const context = useContext(DecideConsentContext);
  if (!context) {
    throw new Error("useDecideConsent must be used within DecideConsent");
  }
  return context;
}

export function DecideConsent({ children }: PropsWithChildren) {
  const [state, formAction, isPending] = useActionState(decideConsent, null);
  const router = useRouter();
  const redirectUrl = state?.redirectUrl;

  useEffect(() => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  }, [redirectUrl, router]);

  return (
    <DecideConsentContext value={{ formAction, isPending }}>
      <div className="flex w-full flex-col gap-3">
        {state?.error && (
          <Alert color="failure">
            <AlertTitle>Error</AlertTitle>
            <p>{state.error}</p>
          </Alert>
        )}
        <div className="flex justify-between gap-2">{children}</div>
      </div>
    </DecideConsentContext>
  );
}

export function ConsentSubmitButton({
  idleLabel,
  pendingLabel,
  variant,
  disabled,
}: {
  idleLabel: string;
  pendingLabel: string;
  variant: "default" | "outline";
  disabled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" variant={variant} disabled={disabled}>
      {pending ? pendingLabel : idleLabel}
    </Button>
  );
}
