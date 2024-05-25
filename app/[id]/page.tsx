"use client";
import { db } from "@/firebase";
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";

function Redirect() {
    const router = useRouter();
    const { id } = useParams();
    const [loaderText, setLoaderText] = useState<String | null>(null);

    useEffect(() => {
        getDocs(query(collection(db, "links"), where("shortId", "==", id)))
            .then((links) => {
                const data = links.docs.map((doc) => ({
                    id: doc.id,
                    shortId: doc.data().shortId,
                    url: doc.data().url,
                    author: doc.data().author,
                    visits: doc.data().visits,
                }));
                setLoaderText("Redirecting to " + data[0].url);
                updateDoc(doc(db, "links", data[0].id), {
                    visits: data[0].visits + 1,
                })
                    .then(() => {
                        router.push(data[0].url);
                    })
                    .catch(() => {});
            })
            .catch(() => {
                router.push("/not/found");
            });
    }, []);
    return (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
            <Loader2 size={48} className="animate-spin text-teal-600" />
            {loaderText && (
                <m.span
                    initial={{ opacity: 0, height: 0, marginTop: 0, y: 64 }}
                    animate={{
                        opacity: 1,
                        height: "auto",
                        marginTop: 16,
                        y: 0,
                        transition: {
                            ease: [0, 0.75, 0.25, 1],
                        },
                    }}
                >
                    {loaderText}
                </m.span>
            )}
        </div>
    );
}

export default Redirect;
