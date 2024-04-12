import Link from "next/link";
import { Logo } from "./logo";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";
import { OrganizationSwitcher } from "@clerk/nextjs";

export function Header() {
  return (
    <div className="border-b px-6 flex justify-between items-center h-[72px]">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Logo width={44} />
        </Link>

        <Separator orientation="vertical" className="h-5 -ml-2" />

        <span className="pt-1.5">
          <OrganizationSwitcher />
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Feedback
        </Button>
        <Separator orientation="vertical" className="h-5" />
        <nav className="*:text-sm *:text-muted-foreground flex items-center space-x-6">
          <Link
            href="/examples/dashboard"
            className="transition-colors hover:text-primary"
          >
            Changelog
          </Link>
          <Link
            href="/examples/dashboard"
            className="transition-colors hover:text-primary"
          >
            Help
          </Link>
          <Link
            href="/examples/dashboard"
            className="transition-colors hover:text-primary"
          >
            Docs
          </Link>

          <Separator orientation="vertical" className="h-5" />

          <UserNav />
        </nav>
      </div>
    </div>
  );
}
