import { LinkType } from "@/typings";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { motion as m } from "framer-motion";
import Link from "next/link";
import { useAppStore } from "@/store/store";

function LinksWrapper({ links }: { links: LinkType[] }) {
    const domain = window.location.host;

    const [setLinkId, setShortenedLink, setIsLinkDeleteModalOpen] = useAppStore(
        (state) => [
            state.setLinkId,
            state.setShortenedLink,
            state.setIsLinkDeleteModalOpen,
        ],
    );

    return (
        <m.div
            initial={{ opacity: 0, y: -64 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    ease: [0, 0.75, 0.25, 1],
                },
            }}
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No.</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Shortened Url</TableHead>
                        <TableHead>Visits</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {links.map((link, i) => {
                        return (
                            <TableRow key={link.shortId}>
                                <TableCell className="text-center font-medium">
                                    {i + 1}
                                </TableCell>
                                <TableCell className="w-16">
                                    {link.url}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        className="text-teal-600 hover:underline dark:text-teal-500"
                                        target="_blank"
                                        href={link.shortId}
                                    >
                                        {domain + "/" + link.shortId}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center">
                                    {link.visits}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="destructive"
                                        className="p-2 dark:bg-red-500 dark:hover:bg-red-600"
                                        onClick={() => {
                                            setShortenedLink(
                                                domain + "/" + link.shortId,
                                            );
                                            setLinkId(link.id);
                                            setIsLinkDeleteModalOpen(true);
                                        }}
                                    >
                                        <Trash size={20} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </m.div>
    );
}

export default LinksWrapper;
