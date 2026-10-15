import { isAuthSessionMissingError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getBaseUrl } from "@/server/baseUrl";

export type OAuthConsentSearchParams = {
  authorization_id?: string;
};

export async function getAuthorizationDetails({
  authorization_id,
}: OAuthConsentSearchParams) {
  if (!authorization_id) {
    throw new Error("Authorization ID is required");
  }
  const supabase = await createClient();
  const { data, error } =
    await supabase.auth.oauth.getAuthorizationDetails(authorization_id);

  if (error) {
    if (isAuthSessionMissingError(error)) {
      redirect(withNextParam("/signin", getConsentUrl(authorization_id)));
    }

    throw new Error(error.message);
  }

  if (!("authorization_id" in data)) {
    redirect(data.redirect_url);
  }

  return data;
}

function getConsentUrl(authorization_id: string) {
  const url = new URL("/oauth/consent", getBaseUrl());
  const searchParams = new URLSearchParams(url.search);
  searchParams.set("authorization_id", authorization_id);
  url.search = searchParams.toString();
  return `${url.pathname}${url.search}${url.hash}`;
}

const withNextParam = (path: string, next: string) => {
  const url = new URL(path, getBaseUrl());
  const searchParams = new URLSearchParams(url.search);
  searchParams.set("next", next);
  url.search = searchParams.toString();
  return `${url.pathname}${url.search}${url.hash}`;
};
