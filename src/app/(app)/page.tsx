"use client";

import { useQuery } from "convex/react";
import { UploadButton } from "./_components/upload-button";
import { api } from "../../../convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

export default function Home() {
  const organizationQuery = useOrganization();

  let organizationId: string | undefined = undefined;

  if (organizationQuery.isLoaded) {
    organizationId = organizationQuery.organization?.id;
  }

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
      <div className="flex justify-between w-full">
        <h1 className="text-4xl font-bold">Your files</h1>

        <UploadButton />
      </div>

      <ul>{allFiles?.map((file) => <li key={file._id}>{file.name}</li>)}</ul>
    </>
  );
}
