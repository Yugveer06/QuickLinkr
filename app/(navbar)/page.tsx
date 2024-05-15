"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion as m } from "framer-motion";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    return (
        <div className="relative">
            <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 4, delay: 0.1 },
                }}
                className="absolute left-1/4 top-1/2 z-[-1] h-64 w-64 bg-teal-600/30 blur-[128px] dark:bg-teal-400/50"
            ></m.div>
            <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 4, delay: 0.3 },
                }}
                className="absolute right-1/4 top-1/2 z-[-1] h-64 w-64 bg-red-600/30 blur-[128px] dark:bg-red-400/50"
            ></m.div>
            <main className="z-[1] mt-12 flex flex-col items-center justify-center p-8">
                <m.h1
                    initial={{ opacity: 0, y: -128 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.6,
                            delay: 0.2,
                            ease: [0, 0.75, 0.25, 1],
                        },
                    }}
                    exit={{ opacity: 0 }}
                    className="flex text-6xl font-bold"
                >
                    QuickLinkr
                </m.h1>
                <m.h3
                    initial={{ opacity: 0, y: -128 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.6,
                            delay: 0.1,
                            ease: [0, 0.75, 0.25, 1],
                        },
                    }}
                    exit={{ opacity: 0 }}
                    className="mt-2 flex gap-2 text-xl text-slate-600 dark:text-slate-300"
                >
                    Trimming the Web for You
                </m.h3>
                <m.p
                    initial={{ opacity: 0, y: -128 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.6,
                            ease: [0, 0.75, 0.25, 1],
                        },
                    }}
                    exit={{ opacity: 0 }}
                    className="mt-6 flex flex-wrap justify-center gap-x-2 text-center text-slate-500 dark:text-slate-400"
                >
                    Welcome to QuickLinkr, where long URLs meet short solutions.
                    <br />
                    Simplify your online presence with effortless link
                    shortening.
                    <br />
                    Try it today and your sharing experience.
                </m.p>
                <Button
                    variant="primary"
                    onClick={() => {
                        setLoading(!loading);
                        router.push("/dashboard");
                    }}
                    className="mt-8"
                    disabled={loading}
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <span>
                                <LoaderCircle
                                    size={24}
                                    className="animate-spin"
                                />
                            </span>
                        ) : (
                            <span className="flex gap-2 transition-[gap]">
                                Try for free <ArrowRight size={20} />
                            </span>
                        )}
                    </AnimatePresence>
                </Button>
            </main>
        </div>
    );
}
