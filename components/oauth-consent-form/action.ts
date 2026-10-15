"use server";

import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
export type ConsentState = {
  error?: string;
} | null;

export async function decideConsent(
  _state: ConsentState,
  formData: FormData,
): Promise<ConsentState> {
  const authorizationId = String(formData.get("authorizationId") ?? "");
  const decision = formData.get("action");

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { error: "You must be signed in to continue." };
  }

  const { data, error } =
    decision === "approve"
      ? await supabase.auth.oauth.approveAuthorization(authorizationId, {
          skipBrowserRedirect: true,
        })
      : await supabase.auth.oauth.denyAuthorization(authorizationId, {
          skipBrowserRedirect: true,
        });

  if (error) {
    return { error: error.message };
  }

  if (!data.redirect_url) {
    return {
      error:
        "The server did not return a redirect. Start again from your OAuth client.",
    };
  }

  redirect(data.redirect_url);
}
