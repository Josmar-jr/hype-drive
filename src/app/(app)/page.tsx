"use client";

import { useQuery } from "convex/react";
import { UploadButton } from "./_components/upload-button";
import { api } from "../../../convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { FileCard } from "./_components/file-card";

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

      <div className="grid grid-cols-4 gap-4">
        {allFiles?.map((file) => <FileCard key={file._id} file={file} />)}
      </div>
    </>
  );
}
