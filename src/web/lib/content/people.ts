import { people } from "@/data/people";
import type { Person, Phone } from "@/data/types";

// marks an entry that is a phone number of a place, not a person
export const CONTACT_LABEL = "Kontakt";

export const isContact = (person: Person) => person.labels.includes(CONTACT_LABEL);

export const personName = (person: Person) => {
  if (person.name) return person.name;
  const name = [person.titleBefore, person.firstName, person.lastName].filter(Boolean).join(" ");
  return person.titleAfter ? `${name}, ${person.titleAfter}` : name;
};

export const PHONE_KIND_LABELS: Record<Phone["kind"], string> = {
  internal: "vnitřní",
  landline: "vnitrostátní",
  mobile: "mobilní",
};

// Everyone with a label, in the order of data/people.ts
export const getPeople = async (label: string) => people.filter((p) => p.labels.includes(label));
