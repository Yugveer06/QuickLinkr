import Link from "next/link";
import React from "react";

function notfound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">404</h1>
            <h3 className="text-xl">Page not found</h3>
            <Link href="/" className="mt-8 text-teal-600 hover:underline">
                Home
            </Link>
        </div>
    );
}

export default notfound;
