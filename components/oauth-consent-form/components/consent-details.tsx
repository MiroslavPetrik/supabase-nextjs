import { PropsWithChildren } from "react";
import type { OAuthAuthorizationDetails } from "@supabase/supabase-js";
import { CardContent } from "@/components/ui/card";

export function ConsentDetails({
  details,
}: {
  details: OAuthAuthorizationDetails;
}) {
  return (
    <CardContent className="space-y-6">
      <DetailsList>
        <DetailsItem>
          <DetailsLabel>Client</DetailsLabel>
          <DetailsValue>{details.client.name}</DetailsValue>
        </DetailsItem>
        <DetailsItem>
          <DetailsLabel>Redirects to</DetailsLabel>
          <DetailsValue>{details.redirect_uri}</DetailsValue>
        </DetailsItem>
        <DetailsItem>
          <DetailsLabel>Signed in as</DetailsLabel>
          <DetailsValue>{details.user.email}</DetailsValue>
        </DetailsItem>
        <DetailsItem>
          <DetailsLabel>Scopes</DetailsLabel>
          <DetailsValue>{details.scope.split(" ").join(", ")}</DetailsValue>
        </DetailsItem>
      </DetailsList>
      <p className="text-muted-foreground text-sm">
        Allow access only if you recognize this application. It can act on your
        behalf only within the requested permissions and the access you already
        have.
      </p>
    </CardContent>
  );
}

function DetailsList({ children }: PropsWithChildren) {
  return <dl className="divide-y rounded-lg border text-sm">{children}</dl>;
}

function DetailsItem({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-between gap-6 p-4">
      {children}
    </div>
  );
}

function DetailsLabel({ children }: PropsWithChildren) {
  return <dt className="text-muted-foreground">{children}</dt>;
}

function DetailsValue({ children }: PropsWithChildren) {
  return (
    <dd className="min-w-0 break-all text-right font-medium">{children}</dd>
  );
}
