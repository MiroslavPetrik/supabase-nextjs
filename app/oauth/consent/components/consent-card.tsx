import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DetailsItem,
  DetailsLabel,
  DetailsList,
  DetailsValue,
} from "./details-item";

import type { OAuthAuthorizationDetails } from "@supabase/supabase-js";

const getInitial = (value: string) =>
  value.trim().charAt(0).toUpperCase() || "?";

export function ConsentHeader({
  clientName,
  productName,
}: {
  productName: string;
  clientName: string;
}) {
  return (
    <CardHeader className="items-center space-y-4 text-center">
      <div className="flex items-center justify-center">
        <div className="flex size-12 items-center justify-center rounded-full border bg-muted font-medium">
          {getInitial(clientName)}
        </div>
        <div className="h-px w-8 bg-border" aria-hidden="true" />
        <div className="flex size-12 items-center justify-center rounded-full border bg-muted font-medium">
          {getInitial(productName)}
        </div>
      </div>
      <div className="space-y-1.5">
        <CardTitle className="font-medium text-lg tracking-normal">
          Authorize {clientName}
        </CardTitle>
        <CardDescription>
          Review what this client gets access to.
        </CardDescription>
      </div>
    </CardHeader>
  );
}

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
          <DetailsValue>
            <span>{details.client.name}</span>
          </DetailsValue>
        </DetailsItem>
        <DetailsItem>
          <DetailsLabel>Redirects to</DetailsLabel>
          <DetailsValue>
            <span>{details.redirect_uri}</span>
          </DetailsValue>
        </DetailsItem>
        <DetailsItem>
          <DetailsLabel>Signed in as</DetailsLabel>
          <DetailsValue>
            <span>{details.user.email}</span>
          </DetailsValue>
        </DetailsItem>
        <DetailsItem>
          <DetailsLabel>Scopes</DetailsLabel>
          <DetailsValue>
            <span>{details.scope.split(" ").join(", ")}</span>
          </DetailsValue>
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
