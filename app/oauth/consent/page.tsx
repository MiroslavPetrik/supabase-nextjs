import { Suspense } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { ApproveButton } from "./components/approve-button";
import { ConsentHeader, ConsentDetails } from "./components/consent-card";
import { DecideConsent } from "./components/decide-consent";
import { DenyButton } from "./components/deny-button";

import {
  getAuthorizationDetails,
  type OAuthConsentSearchParams,
} from "./cache";

export default function ConsentPage({
  searchParams,
}: {
  searchParams: Promise<OAuthConsentSearchParams>;
}) {
  return (
    <main className="flex items-center justify-center">
      <div className="flex w-full flex-col gap-6">
        <Suspense fallback={<p>Loading consent details...</p>}>
          <AuthorizationDetails searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function AuthorizationDetails({
  searchParams,
}: {
  searchParams: Promise<OAuthConsentSearchParams>;
}) {
  const { authorization_id } = await searchParams;
  const details = await getAuthorizationDetails({ authorization_id });

  return (
    <Card>
      <ConsentHeader productName="My App" clientName={details.client.name} />
      <ConsentDetails details={details} />
      <DecideConsent>
        <DenyButton authorizationId={details.authorization_id} />
        <ApproveButton authorizationId={details.authorization_id} />
      </DecideConsent>
    </Card>
  );
}
