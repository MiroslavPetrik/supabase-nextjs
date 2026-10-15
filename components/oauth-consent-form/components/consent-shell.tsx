import { Card, CardContent } from "@/components/ui/card";
import { ConsentHeader } from "./consent-header";

export function ConsentShell({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <ConsentHeader clientName="OAuth Client" productName="My App" />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
