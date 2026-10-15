import { Link } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/auth/sign-up" className="underline underline-offset-4">
        Sign up
      </Link>
    </div>
  );
}
