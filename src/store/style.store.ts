import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StyleId } from "../features/tools/styleData";

interface StyleStore {
  savedStyleIds: StyleId[];
  toggleSavedStyle: (id: StyleId) => void;
  isSaved: (id: StyleId) => boolean;
}

export const useStyleStore = create<StyleStore>()(
  persist(
    (set, get) => ({
      savedStyleIds: [],
      toggleSavedStyle: (id) => {
        const { savedStyleIds } = get();
        set({
          savedStyleIds: savedStyleIds.includes(id)
            ? savedStyleIds.filter((s) => s !== id)
            : [...savedStyleIds, id],
        });
      },
      isSaved: (id) => get().savedStyleIds.includes(id),
    }),
    {
      name: "mipador-style-store",
    }
  )
);
