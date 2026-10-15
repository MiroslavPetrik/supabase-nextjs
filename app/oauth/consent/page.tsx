import { locale } from "next/root-params";
import { type PageSuspend, suspend, withSuspend } from "next-suspend";
import { Action } from "react-form-action/client";
import { SkeletonAvatar } from "@/components/skeleton/skeleton-avatar";
import { SkeletonLine } from "@/components/skeleton/skeleton-line";
import { CardFooter } from "@/components/ui/card";
import { decideConsent } from "./action";
import { t } from "./cache";
import { ApproveButton } from "./components/approve-button";
import { ConsentCard } from "./components/consent-card";
import { DenyButton } from "./components/deny-button";
import {
  DetailsItem,
  DetailsLabel,
  DetailsList,
  DetailsValue,
} from "./components/details-item";
import { FailureAlert, SuccessRedirect } from "./components/form";

const getInitial = (value: string) =>
  value.trim().charAt(0).toUpperCase() || "?";

import { getAuthorizationDetails } from "./cache";

const { Suspend } = suspend(getAuthorizationDetails, {
  fallback: <SkeletonLine className="min-w-28" />,
});

export default withSuspend({ Suspend })(ConsentPage);

async function ConsentPage({
  Suspend: OAuthDetails,
}: PageSuspend<typeof Suspend>) {
  const currentLocale = await locale();

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
              <DetailsLabel>{await t("client")}</DetailsLabel>
              <DetailsValue>
                <OAuthDetails>
                  {(details) => <span>{details.client.name}</span>}
                </OAuthDetails>
              </DetailsValue>
            </DetailsItem>
            <DetailsItem>
              <DetailsLabel>{await t("redirectsTo")}</DetailsLabel>
              <DetailsValue>
                <OAuthDetails>
                  {(details) => <span>{details.redirect_uri}</span>}
                </OAuthDetails>
              </DetailsValue>
            </DetailsItem>
            <DetailsItem>
              <DetailsLabel>{await t("signedInAs")}</DetailsLabel>
              <DetailsValue>
                <OAuthDetails>
                  {(details) => <span>{details.user.email}</span>}
                </OAuthDetails>
              </DetailsValue>
            </DetailsItem>
            <DetailsItem>
              <DetailsLabel>{await t("scopes")}</DetailsLabel>
              <DetailsValue>
                <OAuthDetails>
                  {(details) => (
                    <span>{details.scope.split(" ").join(", ")}</span>
                  )}
                </OAuthDetails>
              </DetailsValue>
            </DetailsItem>
          </DetailsList>
          <p className="text-muted-foreground text-sm">{await t("notice")}</p>
        </ConsentCard>
        <CardFooter className="justify-end">
          <OAuthDetails fallback={<></>}>
            {(details) => (
              <Action
                args={[currentLocale]}
                action={decideConsent}
                initialData={null as never}
              >
                <SuccessRedirect />
                <div className="flex w-full flex-col gap-3">
                  <FailureAlert />
                  <div className="flex justify-between gap-2">
                    <DenyButton authorizationId={details.authorization_id} />
                    <ApproveButton authorizationId={details.authorization_id} />
                  </div>
                </div>
              </Action>
            )}
          </OAuthDetails>
        </CardFooter>
      </div>
    </main>
  );
}
