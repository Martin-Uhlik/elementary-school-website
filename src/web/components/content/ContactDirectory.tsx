"use client";

import { useDeferredValue, useState } from "react";
import { LuSearch } from "react-icons/lu";
import PersonCard, { ContactCard } from "./PersonCard";
import type { Person } from "@/lib/content/types";
import { isContact, personName } from "@/lib/content/format";

type Section = { label: string; people: Person[] };

// lower case, no diacritics and no spaces, so "sarka" finds "Šárka" and "518698" finds "518 698 ..."
const normalize = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, "");

const searchText = (person: Person, section: string) =>
  normalize(
    [
      section,
      personName(person),
      person.position,
      person.email,
      ...(person.phones ?? []).map((p) => p.number),
      ...(person.description ?? []),
    ].join(" "),
  );

// The Kontakty page: a search box over all sections; a section is hidden when nothing in it matches
const ContactDirectory = ({ sections }: { sections: Section[] }) => {
  const [query, setQuery] = useState("");
  const words = useDeferredValue(query).split(/\s+/).map(normalize).filter(Boolean);
  const matches = (person: Person, section: string) => {
    const text = searchText(person, section);
    return words.every((word) => text.includes(word));
  };

  const visible = sections
    .map(({ label, people }) => ({ label, people: people.filter((person) => matches(person, label)) }))
    .filter(({ people }) => people.length > 0);
  const found = visible.flatMap(({ people }) => people);
  const count = new Set(found.map((person) => person.id)).size;

  return (
    <>
      <div className="article">
        <div className="article__section contact-search">
          <h1>Kontakty</h1>
          <div className="contact-search__field">
            <LuSearch aria-hidden="true" focusable="false" />
            <input
              type="search"
              className="form-control"
              placeholder="Hledat jméno, předmět, e-mail nebo telefon"
              aria-label="Hledat v kontaktech"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <p className="contact-search__status" aria-live="polite">
            {words.length === 0 ? "" : visible.length === 0 ? "Nic nenalezeno." : `Nalezeno: ${count}`}
          </p>
        </div>
      </div>
      {visible.map(({ label, people }) => (
        <div className="article" key={label}>
          <section className="article__section" aria-label={label}>
            <h2 className="contact-section__title">{label}</h2>
            <div className="persons">
              {/* the section's own phone number comes first, then the people */}
              {people.filter(isContact).map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
              {people
                .filter((person) => !isContact(person))
                .map((person) => (
                  <PersonCard key={person.id} person={person} level={3} />
                ))}
            </div>
          </section>
        </div>
      ))}
    </>
  );
};

export default ContactDirectory;
