"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createComponents } from "react-form-action/client";
import { Alert } from "@/components/alert";
import { AlertTitle } from "@/components/ui/alert";
import { decideConsent } from "../action";

export const { Value, Failure, Success } = createComponents(decideConsent);

export function FailureAlert() {
  return (
    <Failure>
      {({ error }) => (
        <Alert color="failure">
          <AlertTitle>Error</AlertTitle>
          <p>{error.message}</p>
        </Alert>
      )}
    </Failure>
  );
}

function RedirectEffect({ redirect_url }: { redirect_url: string }) {
  const router = useRouter();

  useEffect(() => {
    if (redirect_url) {
      router.push(redirect_url);
    }
  }, [redirect_url, router]);

  return null;
}

export function SuccessRedirect() {
  return (
    <Success>
      {({ isSuccess, data }) => {
        return isSuccess && <RedirectEffect redirect_url={data.redirect_url} />;
      }}
    </Success>
  );
}
