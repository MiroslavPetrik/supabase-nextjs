import { AuthorizationDetailsForm } from "@/components/oauth-consent-form";
type Props = {
  searchParams: Promise<{
    authorization_id?: string;
  }>;
};

export default function ConsentPage({ searchParams }: Props) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthorizationDetailsForm
          authorizationId={searchParams.then((params) => {
            if (!params.authorization_id) {
              throw new Error("Authorization ID is required");
            }

            return params.authorization_id;
          })}
        />
      </div>
    </div>
  );
}
