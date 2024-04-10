import Link from "next/link";
import { Logo } from "./logo";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="border-b px-6 flex justify-between items-center h-16">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Logo width={36} />
        </Link>

        <Separator orientation="vertical" className="h-5 -ml-2" />

        <nav className="flex items-center space-x-6">
          <NavLink href="/">Desafios</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/monitoring">Monitoring</NavLink>
          <NavLink href="/settings">Settings</NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Feedback
        </Button>
        <Separator orientation="vertical" className="h-5" />
        <nav className="flex items-center space-x-6">
          <Link
            href="/examples/dashboard"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Changelog
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Help
          </Link>
          <Link
            href="/examples/dashboard"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
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
