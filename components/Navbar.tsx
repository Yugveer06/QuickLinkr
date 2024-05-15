import {
    ClerkLoading,
    SignInButton,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { LinkIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggler } from "./ThemeToggler";

function Navbar() {
    return (
        <nav className="sticky left-0 top-0 z-50 flex w-full justify-center bg-white/60 backdrop-blur-lg dark:bg-slate-900/60">
            <div className="flex w-11/12 max-w-[960px] items-center justify-between p-2">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 transition-[gap] hover:gap-4"
                >
                    <LinkIcon size={20} />
                    <span>QuickLinkr</span>
                </Link>
                <div className="flex items-center gap-1">
                    <ThemeToggler />
                    <div className="flex items-center justify-center">
                        <UserButton afterSignOutUrl="/" />
                        <ClerkLoading>
                            <div>
                                <Loader2 size={24} className="animate-spin" />
                            </div>
                        </ClerkLoading>
                        <SignedOut>
                            <SignInButton
                                forceRedirectUrl="/dashboard"
                                mode="modal"
                            >
                                <Button
                                    variant="outline"
                                    className="h-8 bg-white px-2 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800"
                                >
                                    Sign in
                                </Button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
