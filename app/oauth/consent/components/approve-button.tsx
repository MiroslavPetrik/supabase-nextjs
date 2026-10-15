"use client";

import { Form } from "react-form-action/client";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "@/components/submit-button";

import { Value } from "./form";

export function ApproveButton({
  authorizationId,
}: {
  authorizationId: string;
}) {
  const { t } = useTranslation("oauth", { keyPrefix: "consent" });

  return (
    <Form>
      <Value name="authorizationId" value={authorizationId} />
      <Value name="action" value="approve" />
      <SubmitButton size="sm">
        {({ isPending, active }) =>
          isPending && active ? t("allowing") : t("allowAccess")
        }
      </SubmitButton>
    </Form>
  );
}
