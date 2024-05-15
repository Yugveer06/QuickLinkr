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
import { Clipboard } from "lucide-react";
import Link from "next/link";

function LinkCreatedModal() {
    const [shortenedLink, isLinkCreatedModalOpen, setIsLinkCreatedModalOpen] =
        useAppStore((state) => [
            state.shortenedLink,
            state.isLinkCreatedModalOpen,
            state.setIsLinkCreatedModalOpen,
        ]);

    return (
        <Dialog
            open={isLinkCreatedModalOpen}
            onOpenChange={(isOpen) => setIsLinkCreatedModalOpen(isOpen)}
        >
            <DialogContent>
                <DialogHeader className="gap-4">
                    <DialogTitle>Link Shortened</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Your shortened link has been created successfully.
                    <br />
                    Here is the link:{" "}
                    <Link
                        className="text-teal-600 hover:underline dark:text-teal-500"
                        target="_blank"
                        href={shortenedLink}
                    >
                        {shortenedLink}
                    </Link>
                </DialogDescription>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(shortenedLink);
                        }}
                        className="flex gap-2"
                    >
                        <span>Copy Link</span> <Clipboard size={16} />
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">Ok</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default LinkCreatedModal;
