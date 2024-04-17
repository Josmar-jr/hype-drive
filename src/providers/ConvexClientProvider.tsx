"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { dark } from "@clerk/themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#6366f1",
        },
        elements: {
          card: "rounded-xl border bg-card text-card-foreground shadow border-border p-6",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          dividerLine: "bg-border",
          dividerText: "text-muted-foreground",
          formFieldLabelRow: "mb-2",
          formFieldLabel:
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          formFieldInput:
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          formButtonPrimary:
            "inline-flex normal-case tracking-normal bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          socialButtonsBlockButton:
            "tracking-normal text-muted-foreground normal-case border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          socialButtonsProviderIcon: "invert",
          footerActionText: "text-muted-foreground",
          footerActionLink: "text-primary hover:text-primary",
          formFieldWarningText: "text-xs",
          formFieldSuccessText: "text-xs",
          organizationSwitcherTrigger: "border border-border",
          organizationPreviewMainIdentifier: "text-sm",
          identityPreviewEditButtonIcon: "text-foreground",
          formResendCodeLink: "text-muted-foreground",
          otpCodeFieldInput: "focus:border-primary",
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
