"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const createFile = useMutation(api.files.createFile);
  const allFiles = useQuery(api.files.getFiles, {});

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ul>{allFiles?.map((file) => <li key={file._id}>{file.name}</li>)}</ul>

      <Button
        onClick={() => {
          createFile({
            name: "Hello word",
          });
        }}
      >
        MUTATION
      </Button>
    </div>
  );
}
