import { calendarEvents } from "@/data/calendar";
import { photos, puzzlePictures } from "@/data/photos";
import { sponsors } from "@/data/sponsors";

export const getSponsors = async () => sponsors;

export const getPhotos = async () => photos;

export const getPuzzlePictures = async () => puzzlePictures;

// The newest school year and its events by date
export const getSchoolYear = async () => {
  const schoolYear =
    calendarEvents
      .map((e) => e.schoolYear)
      .sort()
      .at(-1) ?? "";
  const events = calendarEvents.filter((e) => e.schoolYear === schoolYear).sort((a, b) => a.date.localeCompare(b.date));
  return { schoolYear, events };
};
