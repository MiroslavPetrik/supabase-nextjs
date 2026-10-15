"use client";

import { Form } from "react-form-action/client";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "@/components/submit-button";

import { Value } from "./form";

export function DenyButton({ authorizationId }: { authorizationId: string }) {
  const { t } = useTranslation("oauth", { keyPrefix: "consent" });

  return (
    <Form>
      <Value name="authorizationId" value={authorizationId} />
      <Value name="action" value="deny" />
      <SubmitButton size="sm" color="light">
        {({ isPending, active }) =>
          isPending && active ? t("denying") : t("deny")
        }
      </SubmitButton>
    </Form>
  );
}
