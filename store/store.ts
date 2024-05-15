import { create } from "zustand";

interface AppState {
    shortenedLink: string;
    setShortenedLink: (link: string) => void;

    isLinkCreatedModalOpen: boolean;
    setIsLinkCreatedModalOpen: (open: boolean) => void;

    linkId: string;
    setLinkId: (link: string) => void;

    isLinkDeleteModalOpen: boolean;
    setIsLinkDeleteModalOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => ({
    shortenedLink: "",
    setShortenedLink: (link) => set((state) => ({ shortenedLink: link })),

    isLinkCreatedModalOpen: false,
    setIsLinkCreatedModalOpen: (open) =>
        set((state) => ({ isLinkCreatedModalOpen: open })),

    linkId: "",
    setLinkId: (id) => set((state) => ({ linkId: id })),

    isLinkDeleteModalOpen: false,
    setIsLinkDeleteModalOpen: (open) =>
        set((state) => ({ isLinkDeleteModalOpen: open })),
}));
