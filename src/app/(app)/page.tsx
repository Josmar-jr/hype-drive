"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const organizationQuery = useOrganization();
  const userQuery = useUser();

  let organizationId = null;

  if (organizationQuery.isLoaded && userQuery.isLoaded) {
    organizationId = organizationQuery.organization?.id ?? userQuery.user?.id;
  }

  const createFile = useMutation(api.files.createFile);
  const allFiles = useQuery(
    api.files.getFiles,
    organizationId
      ? {
          organizationId,
        }
      : "skip",
  );

  return (
    <>
      <ul>{allFiles?.map((file) => <li key={file._id}>{file.name}</li>)}</ul>

      <Button
        disabled={!organizationId}
        onClick={() => {
          if (!organizationId) return;

          createFile({
            name: "Hello word",
            organizationId: organizationId,
          });
        }}
      >
        MUTATION
      </Button>
    </>
  );
}
