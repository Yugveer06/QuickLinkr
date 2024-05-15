"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ShortUniqueId from "short-unique-id";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { LinkType } from "@/typings";
import LinksWrapper from "@/components/LinksWrapper";
import { useAuth, useUser } from "@clerk/nextjs";
import isURL from "validator/lib/isURL";
import { useCollection } from "react-firebase-hooks/firestore";
import LinkCreatedModal from "@/components/LinkCreatedModal";
import { useAppStore } from "@/store/store";
import { Loader2 } from "lucide-react";

function Dashboard() {
    const domain = window.location.host;

    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const { userId } = useAuth();
    const { user } = useUser();

    const [links, setLinks] = useState<LinkType[]>([]);
    const [input, setInput] = useState("");
    const [invalidInput, setInvalidInput] = useState(false);
    const [loading, setLoading] = useState(true);

    const [docs] = useCollection(
        user && query(collection(db, "links"), where("author", "==", userId)),
    );

    useEffect(() => {
        if (docs) {
            const data = docs.docs.map((doc) => ({
                id: doc.id,
                shortId: doc.data().shortId,
                url: doc.data().url,
                author: doc.data().author,
                visits: doc.data().visits,
            }));
            setLinks(data);
            setLoading(false);
        }
    }, [docs]);

    const [setShortenedLink, setIsLinkCreatedModalOpen] = useAppStore(
        (state) => [state.setShortenedLink, state.setIsLinkCreatedModalOpen],
    );

    async function addLink() {
        // add the link to the database
        if (isURL(input, { require_protocol: true })) {
            setInvalidInput(false);
            const shortId = randomUUID();
            await addDoc(collection(db, "links"), {
                shortId: shortId,
                url: input,
                author: userId,
                visits: 0,
            });
            setInput("");
            setShortenedLink(domain + "/" + shortId);
            setIsLinkCreatedModalOpen(true);
        } else {
            setInvalidInput(true);
            console.log("Invalid URL");
        }
    }

    useEffect(() => {
        if (input !== "") {
            if (isURL(input, { require_protocol: true })) {
                setInvalidInput(false);
            } else {
                setInvalidInput(true);
            }
        }
    }, [input]);

    return (
        <>
            <LinkCreatedModal />
            <div className="relative flex w-full max-w-[960px] flex-col gap-4 p-2">
                <div className="flex flex-col gap-2">
                    <m.h1
                        initial={{ opacity: 0, y: -64 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 0.2,
                                ease: [0, 0.75, 0.25, 1],
                            },
                        }}
                        className="mt-4 text-2xl font-bold"
                    >
                        Shorten your link
                    </m.h1>
                    <m.div
                        initial={{ opacity: 0, y: -64 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 0.15,
                                ease: [0, 0.75, 0.25, 1],
                            },
                        }}
                        className="overflow-clip rounded-2xl bg-slate-100 p-4 dark:bg-slate-800"
                    >
                        <div className="flex gap-2">
                            <Input
                                type="url"
                                className="rounded-xl p-2"
                                placeholder="Enter long link here..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <Button
                                onClick={addLink}
                                variant="primary"
                                className="rounded-xl"
                            >
                                Go
                            </Button>
                        </div>
                        <AnimatePresence>
                            {invalidInput && (
                                <m.p
                                    initial={{
                                        opacity: 0,
                                        height: 0,
                                        marginTop: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        height: "auto",
                                        marginTop: 8,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        height: 0,
                                        marginTop: 0,
                                    }}
                                    className="text-red-500 dark:text-red-400"
                                >
                                    Invalid URL
                                </m.p>
                            )}
                        </AnimatePresence>
                    </m.div>
                </div>
                <div>
                    <m.h1
                        initial={{ opacity: 0, y: -64 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 0.05,
                                ease: [0, 0.75, 0.25, 1],
                            },
                        }}
                        className="mt-4 text-2xl font-bold"
                    >
                        Your Links
                    </m.h1>
                    {loading && (
                        <div className="mt-8 flex justify-center">
                            <Loader2 size={32} className="animate-spin" />
                        </div>
                    )}
                    {!loading && links.length > 0 && (
                        <LinksWrapper links={links} />
                    )}
                    {!loading && links.length === 0 && (
                        <div className="mt-8 flex justify-center">
                            <span className="text-slate-400">
                                No Links Found
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
