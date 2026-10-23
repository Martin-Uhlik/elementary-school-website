import { calendarEvents } from "@/data/calendar";
import { photos, puzzlePictures } from "@/data/photos";
import { sponsors } from "@/data/sponsors";

export const getSponsors = async () => sponsors;

export const getPhotos = async () => photos;

export const getPuzzlePictures = async () => puzzlePictures;

// Every school year with its events by date, oldest first
export const getSchoolYears = async () =>
  [...new Set(calendarEvents.map((e) => e.schoolYear))].sort().map((schoolYear) => ({
    schoolYear,
    events: calendarEvents.filter((e) => e.schoolYear === schoolYear).sort((a, b) => a.date.localeCompare(b.date)),
  }));
