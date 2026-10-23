import { calendarEvents } from "@/data/calendar";
import { photos } from "@/data/photos";
import { sponsors } from "@/data/sponsors";

export const getSponsors = async () => sponsors;

export const getPhotos = async () => photos;

// The newest school year and its lines
export const getSchoolYear = async () => {
  const schoolYear =
    calendarEvents
      .map((e) => e.schoolYear)
      .sort()
      .at(-1) ?? "";
  return { schoolYear, events: calendarEvents.filter((e) => e.schoolYear === schoolYear) };
};
