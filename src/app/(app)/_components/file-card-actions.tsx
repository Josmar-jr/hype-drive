import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileIcon, MoreVertical, Pencil, Star, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";

interface FileCardActions {
  file: Doc<"files">;
}

export function FileCardActions({ file }: FileCardActions) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { toast } = useToast();
  const deleteFile = useMutation(api.files.deleteFile);

  function handleDeleteFile() {
    try {
      deleteFile({
        fileId: file._id,
      });

      toast({
        variant: "success",
        title: "File deleted",
        description: "Your file is now gone from the system",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "This file could not be delete, try again later",
      });
    }
  }

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the file for our deletion process. Files are
              deleted periodically
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFile}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger className="grid place-items-center absolute size-6 top-3 right-3 rounded-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          <MoreVertical className="shrink size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex gap-1 items-center">
            <Pencil className="size-4" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-1 items-center">
            <FileIcon className="size-4" /> Download
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-1 items-center">
            <Star className="size-4" /> Add Favorite
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setIsConfirmOpen(true)}
            className="flex gap-1 items-center text-red-500"
          >
            <Trash className="size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
