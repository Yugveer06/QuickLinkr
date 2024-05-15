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
import { useEffect } from "react";
function Redirect() {
    const router = useRouter();
    const { id } = useParams();

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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 size={48} className="animate-spin text-teal-600" />
        </div>
    );
}

export default Redirect;
