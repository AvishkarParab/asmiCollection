import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/login"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="  text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image
              src="/asmicollection_logo.png"
              alt="My Logo"
              width={100}
              height={100}
              className="size-6"
            />
          </div>
          Asmi Collection
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
