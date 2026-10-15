"use server";

import { z } from "zod";
import { authorizedAction } from "@/lib/supabase/auth";

const consentSchema = z.object({
  authorizationId: z.string(),
  action: z.enum(["approve", "deny"]),
});

export const decideConsent = authorizedAction
  .input(consentSchema)
  .run(async ({ ctx: { auth }, input: { action, authorizationId } }) => {
    const { data, error } =
      action === "approve"
        ? await auth.oauth.approveAuthorization(authorizationId, {
            skipBrowserRedirect: true,
          })
        : await auth.oauth.denyAuthorization(authorizationId, {
            skipBrowserRedirect: true,
          });

    if (error) {
      throw error;
    }

    if (!data.redirect_url) {
      throw new Error(
        "The server did not return a redirect. Start again from your OAuth client.",
      );
    }

    return data;
  });
