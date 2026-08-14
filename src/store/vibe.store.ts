import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PaletteId } from "../features/tools/paletteData";

interface VibeStore {
  savedPaletteIds: PaletteId[];
  completedRituals: Record<string, string[]>;

  toggleSavedPalette: (id: PaletteId) => void;
  isSaved: (id: PaletteId) => boolean;

  toggleRitualDone: (paletteId: PaletteId, time: string) => void;
  isRitualDone: (paletteId: PaletteId, time: string) => boolean;
}

export const useVibeStore = create<VibeStore>()(
  persist(
    (set, get) => ({
      savedPaletteIds: [],
      completedRituals: {},

      toggleSavedPalette: (id) => {
        const { savedPaletteIds } = get();
        set({
          savedPaletteIds: savedPaletteIds.includes(id)
            ? savedPaletteIds.filter((p) => p !== id)
            : [...savedPaletteIds, id],
        });
      },
      isSaved: (id) => get().savedPaletteIds.includes(id),

      toggleRitualDone: (paletteId, time) => {
        const { completedRituals } = get();
        const done = completedRituals[paletteId] ?? [];
        set({
          completedRituals: {
            ...completedRituals,
            [paletteId]: done.includes(time)
              ? done.filter((t) => t !== time)
              : [...done, time],
          },
        });
      },
      isRitualDone: (paletteId, time) =>
        (get().completedRituals[paletteId] ?? []).includes(time),
    }),
    {
      name: "mipador-vibe-store",
    }
  )
);
