import type { ComponentType } from "react";
import type { Photo } from "@/data/types";
import JakRychlePises from "./JakRychlePises";
import KlikADvojklik from "./KlikADvojklik";
import PrehazeneLetopocty from "./PrehazeneLetopocty";
import RozhazeneBarvy from "./RozhazeneBarvy";
import RozhazenyText from "./RozhazenyText";
import SkladaniSlov from "./SkladaniSlov";
import Skladanka from "./Skladanka";
import ZnakyKlavesnice from "./ZnakyKlavesnice";

// Content an exercise may use; the page loads it on the server
export type ExerciseProps = { photos: Photo[] };

// Exercises that are already ported, by slug
export const exerciseComponents: Record<string, ComponentType<ExerciseProps>> = {
  skladanka: Skladanka,
  "klik-a-dvojklik": KlikADvojklik,
  "rozhazene-barvy": RozhazeneBarvy,
  "skladani-slov": SkladaniSlov,
  "znaky-klavesnice": ZnakyKlavesnice,
  "prehazene-letopocty": PrehazeneLetopocty,
  "rozhazeny-text": RozhazenyText,
  "jak-rychle-pises": JakRychlePises,
};
