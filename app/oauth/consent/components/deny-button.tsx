"use client";

import { Form } from "react-form-action/client";
import { SubmitButton } from "@/components/submit-button";

import { Value } from "./form";

export function DenyButton({ authorizationId }: { authorizationId: string }) {
  return (
    <Form>
      <Value name="authorizationId" value={authorizationId} />
      <Value name="action" value="deny" />
      <SubmitButton size="sm" color="light">
        {({ isPending, active }) =>
          isPending && active ? "Denying..." : "Deny"
        }
      </SubmitButton>
    </Form>
  );
}
