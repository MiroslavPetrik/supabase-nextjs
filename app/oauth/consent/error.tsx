"use client";

import { useEffect } from "react";
import { Alert } from "@/components/alert";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <Alert color="failure">
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    </div>
  );
}
