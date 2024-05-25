"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { Button } from "./ui/button";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function LinkDeleteModal() {
    const [deleting, setDeleting] = useState(false);
    const [
        linkId,
        shortenedLink,
        isLinkDeleteModalOpen,
        setIsLinkDeleteModalOpen,
    ] = useAppStore((state) => [
        state.linkId,
        state.shortenedLink,
        state.isLinkDeleteModalOpen,
        state.setIsLinkDeleteModalOpen,
    ]);

    async function deleteLink(id: string) {
        setDeleting(true);
        await deleteDoc(doc(db, "links", id));
        setIsLinkDeleteModalOpen(false);
        setDeleting(false);
    }

    return (
        <Dialog
            open={isLinkDeleteModalOpen}
            onOpenChange={(isOpen) => setIsLinkDeleteModalOpen(isOpen)}
        >
            <DialogContent>
                <DialogHeader className="gap-4">
                    <DialogTitle>Delete Link?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete this link?
                    <br />
                    This shortened link will stop working after deletion:
                    <br />
                    <Link
                        className="text-teal-600 hover:underline dark:text-teal-500"
                        target="_blank"
                        href={
                            shortenedLink.split("/")[
                                shortenedLink.split("/").length - 1
                            ]
                        }
                    >
                        {shortenedLink}
                    </Link>{" "}
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={() => deleteLink(linkId)}
                    >
                        {deleting ? (
                            <Loader2 size={24} className="animate-spin" />
                        ) : (
                            <span>Delete</span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default LinkDeleteModal;
