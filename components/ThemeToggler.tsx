"use client";

import * as React from "react";
import { Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggler() {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                    <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className="flex cursor-pointer items-center justify-between px-2 py-1 duration-0"
                    onClick={() => setTheme("light")}
                >
                    <span>Light</span>
                    {theme === "light" && <Check size={16} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex cursor-pointer items-center justify-between px-2 py-1 duration-0"
                    onClick={() => setTheme("dark")}
                >
                    <span>Dark</span>
                    {theme === "dark" && <Check size={16} />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex cursor-pointer items-center justify-between px-2 py-1 duration-0"
                    onClick={() => setTheme("system")}
                >
                    <span>System</span>
                    {theme === "system" && <Check size={16} />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
