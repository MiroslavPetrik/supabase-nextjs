"use client";

import { Form } from "react-form-action/client";
import { SubmitButton } from "@/components/submit-button";

import { Value } from "./form";

export function ApproveButton({
  authorizationId,
}: {
  authorizationId: string;
}) {
  return (
    <Form>
      <Value name="authorizationId" value={authorizationId} />
      <Value name="action" value="approve" />
      <SubmitButton size="sm">
        {({ isPending, active }) =>
          isPending && active ? "Allowing..." : "Allow access"
        }
      </SubmitButton>
    </Form>
  );
}
