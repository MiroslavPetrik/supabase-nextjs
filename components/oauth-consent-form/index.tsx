import { isAuthSessionMissingError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { ConsentDecision } from "./components/consent-decision";
import { ConsentDetails } from "./components/consent-details";
import { ConsentHeader } from "./components/consent-header";
import { ConsentShell } from "./components/consent-shell";
import { AuthorizationErrorBoundary } from "./components/error-boundary";

type Props = {
  authorizationId: Promise<string>;
};

export function AuthorizationDetailsForm({ authorizationId }: Props) {
  return (
    <AuthorizationErrorBoundary>
      <Suspense
        fallback={
          <ConsentShell>
            <p>Loading authorization request...</p>
          </ConsentShell>
        }
      >
        <AuthorizationDetails authorizationId={authorizationId} />
      </Suspense>
    </AuthorizationErrorBoundary>
  );
}

async function AuthorizationDetails({ authorizationId }: Props) {
  const details = await getAuthorizationDetails(await authorizationId);

  return (
    <Card>
      <ConsentHeader productName="My App" clientName={details.client.name} />
      <ConsentDetails details={details} />
      <ConsentDecision authorizationId={details.authorization_id} />
    </Card>
  );
}

async function getAuthorizationDetails(authorizationId: string) {
  const supabase = await createClient();
  const { data, error } =
    await supabase.auth.oauth.getAuthorizationDetails(authorizationId);

  if (error) {
    if (isAuthSessionMissingError(error)) {
      redirect(
        withSearchParams("/auth/login", {
          next: getConsentUrl(authorizationId),
        }),
      );
    }

    throw error;
  }

  if (!("authorization_id" in data)) {
    redirect(data.redirect_url);
  }

  return data;
}

function getConsentUrl(authorization_id: string) {
  return withSearchParams("/oauth/consent", { authorization_id });
}

const withSearchParams = (path: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(Object.entries(params));
  const queryString = searchParams.toString();
  return `${path}?${queryString}`;
};
