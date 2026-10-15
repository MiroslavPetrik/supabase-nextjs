import { type PageSuspend, suspend, withSuspend } from "next-suspend";
import { SkeletonAvatar } from "@/components/skeleton/skeleton-avatar";
import { SkeletonLine } from "@/components/skeleton/skeleton-line";
import { CardFooter } from "@/components/ui/card";
import { ApproveButton } from "./components/approve-button";
import { ConsentCard } from "./components/consent-card";
import { DecideConsent } from "./components/decide-consent";
import { DenyButton } from "./components/deny-button";
import {
  DetailsItem,
  DetailsLabel,
  DetailsList,
  DetailsValue,
} from "./components/details-item";
import { getAuthorizationDetails } from "./cache";

const getInitial = (value: string) =>
  value.trim().charAt(0).toUpperCase() || "?";

const { Suspend } = suspend(getAuthorizationDetails, {
  fallback: <SkeletonLine className="min-w-28" />,
});

export default withSuspend({ Suspend })(ConsentPage);

async function ConsentPage({
  Suspend: OAuthDetails,
}: PageSuspend<typeof Suspend>) {
  return (
    <main className="flex items-center justify-center">
      <div className="flex w-full flex-col gap-6">
        <ConsentCard
          clientIcon={
            <OAuthDetails fallback={<SkeletonAvatar className="size-12" />}>
              {(details) => (
                <div className="flex size-12 items-center justify-center rounded-full border bg-muted font-medium">
                  {getInitial(details.client.name)}
                </div>
              )}
            </OAuthDetails>
          }
          clientName={
            <OAuthDetails
              fallback={
                <SkeletonLine className="inline-block w-30 pt-2" as="span" />
              }
            >
              {(details) => <dfn>{details.client.name}</dfn>}
            </OAuthDetails>
          }
        >
          <DetailsList>
            <DetailsItem>
              <DetailsLabel>Client</DetailsLabel>
              <DetailsValue>
                <OAuthDetails>
                  {(details) => <span>{details.client.name}</span>}
                </OAuthDetails>
              </DetailsValue>
            </DetailsItem>
            <DetailsItem>
              <DetailsLabel>Redirects to</DetailsLabel>
              <DetailsValue>
                <OAuthDetails>
                  {(details) => <span>{details.redirect_uri}</span>}
                </OAuthDetails>
              </DetailsValue>
            </DetailsItem>
            <DetailsItem>
              <DetailsLabel>Signed in as</DetailsLabel>
              <DetailsValue>
                <OAuthDetails>
                  {(details) => <span>{details.user.email}</span>}
                </OAuthDetails>
              </DetailsValue>
            </DetailsItem>
            <DetailsItem>
              <DetailsLabel>Scopes</DetailsLabel>
              <DetailsValue>
                <OAuthDetails>
                  {(details) => (
                    <span>{details.scope.split(" ").join(", ")}</span>
                  )}
                </OAuthDetails>
              </DetailsValue>
            </DetailsItem>
          </DetailsList>
          <p className="text-muted-foreground text-sm">
            Allow access only if you recognize this application. It can act on
            your behalf only within the requested permissions and the access you
            already have.
          </p>
        </ConsentCard>
        <CardFooter className="justify-end">
          <OAuthDetails fallback={<></>}>
            {(details) => (
              <DecideConsent>
                <DenyButton authorizationId={details.authorization_id} />
                <ApproveButton authorizationId={details.authorization_id} />
              </DecideConsent>
            )}
          </OAuthDetails>
        </CardFooter>
      </div>
    </main>
  );
}
