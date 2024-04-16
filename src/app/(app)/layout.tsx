import { ReactNode } from "react";

import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@/providers/QueryClientProvider";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider>
      <div className="bg-background min-h-screen">
        <Header />

        <main className="p-6 container mx-auto">{children}</main>

        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
