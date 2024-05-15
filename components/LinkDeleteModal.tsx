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
import { ArrowRight } from "lucide-react";

function LinkDeleteModal() {
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
        await deleteDoc(doc(db, "links", id));
        setIsLinkDeleteModalOpen(false);
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
                        href={shortenedLink}
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
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default LinkDeleteModal;
