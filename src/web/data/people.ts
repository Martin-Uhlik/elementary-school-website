import type { Person } from "./types";

// From the production pages (zsmp.cz, October 2026); the order of the array is the order on every page

export const people: Person[] = [
  {
    id: "uhlikova-ivana",
    titleBefore: "Mgr.",
    firstName: "Ivana",
    lastName: "Uhlíková",
    labels: ["Základní informace", "Učitelé"],
    position: "ředitelka",
    email: "uhlikova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "114",
      },
      {
        kind: "landline",
        number: "518 698 574",
      },
    ],
  },
  {
    id: "varechova-katerina",
    titleBefore: "Mgr.",
    firstName: "Kateřina",
    lastName: "Vařechová",
    labels: ["Základní informace", "Učitelé"],
    position: "zástupkyně ředitelky pro ZŠ",
    email: "varechova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "116",
      },
      {
        kind: "landline",
        number: "518 698 576",
      },
    ],
  },
  {
    id: "zezulova-jana",
    titleBefore: "Mgr.",
    firstName: "Jana",
    lastName: "Zezulová",
    labels: ["Základní informace", "Zástupkyně ředitelky pro MŠ", "Mateřská škola"],
    position: "zástupkyně ředitelky pro MŠ",
    email: "zezulova@zsmp.cz",
    phones: [
      {
        kind: "mobile",
        number: "739 357 820",
      },
    ],
  },
  {
    id: "polehnova-helena",
    firstName: "Helena",
    lastName: "Polehňová",
    labels: ["Základní informace", "Vedoucí školní jídelny"],
    position: "vedoucí školní jídelny",
    email: "polehnova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "119",
      },
      {
        kind: "landline",
        number: "518 698 579",
      },
      {
        kind: "mobile",
        number: "733 578 179",
      },
    ],
  },
  {
    id: "blazkova-marta",
    firstName: "Marta",
    lastName: "Blažková",
    labels: ["Základní informace", "Hospodářka"],
    position: "hospodářka",
    email: "blazkova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "111",
      },
      {
        kind: "landline",
        number: "518 698 571",
      },
    ],
  },
  {
    id: "lovecky-jaroslav",
    firstName: "Jaroslav",
    lastName: "Lovecký",
    labels: ["Základní informace", "Správní zaměstnanci"],
    position: "školník",
    email: "lovecky4@seznam.cz",
    phones: [
      {
        kind: "mobile",
        number: "602 723 104",
      },
    ],
  },
  {
    id: "santava-pavlina",
    firstName: "Pavlína",
    lastName: "Šantavá",
    labels: ["Základní informace", "Správní zaměstnanci", "Hala"],
    position: "správce haly",
    email: "santava@zsmp.cz",
    phones: [
      {
        kind: "mobile",
        number: "734 141 727",
      },
    ],
  },
  {
    id: "cihalikova-jana",
    titleBefore: "Mgr.",
    firstName: "Jana",
    lastName: "Číhalíková",
    labels: ["Učitelé"],
    email: "cihalikova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "118",
      },
      {
        kind: "landline",
        number: "518 698 578",
      },
    ],
  },
  {
    id: "dokoupilova-ivana",
    firstName: "Ivana",
    lastName: "Dokoupilová",
    labels: ["Učitelé"],
    email: "dokoupilova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "131",
      },
      {
        kind: "landline",
        number: "518 698 591",
      },
    ],
  },
  {
    id: "domanska-jitka",
    titleBefore: "Mgr.",
    firstName: "Jitka",
    lastName: "Domanská",
    labels: ["Učitelé", "Rada školy: zástupci školy"],
    email: "domanska@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "128",
      },
      {
        kind: "landline",
        number: "518 698 588",
      },
    ],
  },
  {
    id: "domanska-eva",
    titleBefore: "Mgr.",
    firstName: "Eva",
    lastName: "Domanská",
    labels: ["Učitelé"],
    email: "domanskaeva@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "128",
      },
      {
        kind: "landline",
        number: "518 698 588",
      },
    ],
  },
  {
    id: "hrancik-premysl",
    titleBefore: "Mgr.",
    firstName: "Přemysl",
    lastName: "Hrančík",
    labels: ["Učitelé"],
    email: "hrancik@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "117",
      },
      {
        kind: "landline",
        number: "518 698 577",
      },
    ],
  },
  {
    id: "hruskova-alena",
    titleBefore: "Mgr.",
    firstName: "Alena",
    lastName: "Hrušková",
    labels: ["Učitelé"],
    email: "hruskova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "129",
      },
      {
        kind: "landline",
        number: "518 698 589",
      },
    ],
  },
  {
    id: "krejcirikova-andrea",
    titleBefore: "Mgr.",
    firstName: "Andrea",
    lastName: "Krejčiříková",
    labels: ["Učitelé"],
    email: "krejcirikova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "112",
      },
      {
        kind: "landline",
        number: "518 698 572",
      },
    ],
  },
  {
    id: "lehnertova-jitka",
    titleBefore: "Mgr.",
    firstName: "Jitka",
    lastName: "Lehnertová",
    labels: ["Učitelé"],
    email: "lehnertova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "118",
      },
      {
        kind: "landline",
        number: "518 698 578",
      },
    ],
  },
  {
    id: "lekava-pavla",
    titleBefore: "Mgr.",
    firstName: "Pavla",
    lastName: "Lekavá",
    labels: ["Učitelé"],
    position: "výchovná poradkyně",
    email: "lekava@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "130",
      },
      {
        kind: "landline",
        number: "518 698 590",
      },
    ],
  },
  {
    id: "matejikova-lenka",
    titleBefore: "Mgr.",
    firstName: "Lenka",
    lastName: "Matějíková",
    labels: ["Učitelé"],
    position: "školní metodik prevence",
    email: "matejikova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "130",
      },
      {
        kind: "landline",
        number: "518 698 590",
      },
    ],
  },
  {
    id: "klobaskova-ivana",
    titleBefore: "Mgr.",
    firstName: "Ivana",
    lastName: "Klobásková",
    labels: ["Učitelé", "Rada školy: zástupci školy"],
    email: "klobaskova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "112",
      },
      {
        kind: "landline",
        number: "518 698 572",
      },
    ],
  },
  {
    id: "polaskova-dana",
    titleBefore: "Mgr.",
    firstName: "Dana",
    lastName: "Polášková",
    labels: ["Učitelé"],
    email: "polaskova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "117",
      },
      {
        kind: "landline",
        number: "518 698 572",
      },
    ],
  },
  {
    id: "stvanova-alena",
    titleBefore: "Mgr. Bc.",
    firstName: "Alena",
    lastName: "Štvánová",
    labels: ["Učitelé"],
    email: "stvanova@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "120",
      },
      {
        kind: "landline",
        number: "518 698 572",
      },
    ],
  },
  {
    id: "nekardova-michaela",
    titleBefore: "Ing.",
    firstName: "Michaela",
    lastName: "Nekardová",
    labels: ["Učitelé"],
    email: "nekardova@zsmp.cz",
  },
  {
    id: "slezak-rene",
    firstName: "René",
    lastName: "Slezák",
    labels: ["Učitelé"],
    email: "slezak@zsmp.cz",
    phones: [
      {
        kind: "internal",
        number: "131",
      },
      {
        kind: "landline",
        number: "518 698 591",
      },
    ],
  },
  {
    id: "vyskocilova-renata",
    firstName: "Renata",
    lastName: "Vyskočilová",
    labels: ["Školní družiny", "Družina"],
    position: "vychovatelka školní družiny",
    email: "vyskocilova@zsmp.cz",
    phones: [
      {
        kind: "landline",
        number: "518 698 571",
      },
    ],
  },
  {
    id: "smahajova-miroslava",
    firstName: "Miroslava",
    lastName: "Šmahajová",
    labels: ["Školní družiny", "Družina"],
    position: "vychovatelka školní družiny",
    email: "smahajova@zsmp.cz",
    phones: [
      {
        kind: "landline",
        number: "518 698 571",
      },
    ],
  },
  {
    id: "zapletalova-barbora",
    firstName: "Barbora",
    lastName: "Zapletalová",
    labels: ["Školní družiny", "Družina", "Rada školy: zástupci školy"],
    position: "vychovatelka školní družiny",
    email: "zapletalova@zsmp.cz",
    phones: [
      {
        kind: "landline",
        number: "518 698 571",
      },
    ],
  },
  {
    id: "asistentky-pedagogu",
    name: "Asistentky pedagogů",
    labels: ["Kontakt", "Asistentky pedagogů"],
    phones: [
      {
        kind: "internal",
        number: "120",
      },
      {
        kind: "landline",
        number: "518 698 580",
      },
    ],
  },
  {
    id: "kopp-martina",
    firstName: "Martina",
    lastName: "Kopp",
    labels: ["Asistentky pedagogů"],
    email: "kopp@zsmp.cz",
  },
  {
    id: "kureckova-kristyna",
    firstName: "Kristýna",
    lastName: "Kurečková",
    titleAfter: "DiS.",
    labels: ["Asistentky pedagogů"],
    email: "kureckova@zsmp.cz",
  },
  {
    id: "studnickova-haxton-marketa",
    firstName: "Markéta",
    lastName: "Studničková Haxton",
    labels: ["Asistentky pedagogů"],
    email: "haxton@zsmp.cz",
  },
  {
    id: "knihovna",
    name: "Knihovna",
    labels: ["Kontakt", "Knihovna"],
    phones: [
      {
        kind: "internal",
        number: "113",
      },
      {
        kind: "landline",
        number: "518 698 573",
      },
    ],
  },
  {
    id: "kuchyn",
    name: "Kuchyň",
    labels: ["Kontakt", "Kuchyň"],
    phones: [
      {
        kind: "internal",
        number: "121",
      },
      {
        kind: "landline",
        number: "518 698 581",
      },
    ],
  },
  {
    id: "kminkova-renata",
    firstName: "Renáta",
    lastName: "Kmínková",
    labels: ["Kuchyň"],
  },
  {
    id: "lekavy-radek",
    firstName: "Radek",
    lastName: "Lekavý",
    labels: ["Kuchyň"],
  },
  {
    id: "repikova-jana",
    firstName: "Jana",
    lastName: "Repíková",
    labels: ["Kuchyň"],
  },
  {
    id: "spravni-zamestnanci",
    name: "Správní zaměstnanci",
    labels: ["Kontakt", "Správní zaměstnanci"],
    phones: [
      {
        kind: "internal",
        number: "123",
      },
      {
        kind: "landline",
        number: "518 698 583",
      },
    ],
  },
  {
    id: "vranova-michaela",
    firstName: "Michaela",
    lastName: "Vránová",
    labels: ["Správní zaměstnanci"],
  },
  {
    id: "santava-alena",
    firstName: "Alena",
    lastName: "Šantavá",
    labels: ["Správní zaměstnanci"],
  },
  {
    id: "materska-skola-ulice-velkomoravska-409",
    name: "Mateřská škola - ulice Velkomoravská 409",
    labels: ["Kontakt", "Mateřská škola - ulice Velkomoravská 409"],
    phones: [
      {
        kind: "mobile",
        number: "737 008 186",
      },
    ],
  },
  {
    id: "materska-skola-ulice-sokolska",
    name: "Mateřská škola - ulice Sokolská",
    labels: ["Kontakt", "Mateřská škola - ulice Sokolská"],
    phones: [
      {
        kind: "mobile",
        number: "739 826 607",
      },
    ],
  },
  {
    id: "lidmanova-bronislava",
    firstName: "Bronislava",
    lastName: "Lidmanová",
    labels: ["Mateřská škola"],
    position: "učitelka",
    email: "lidmanova@zsmp.cz",
  },
  {
    id: "slavikova-veronika",
    titleBefore: "Bc.",
    firstName: "Veronika",
    lastName: "Slavíková",
    labels: ["Mateřská škola"],
    position: "RD",
    email: "slavikova@zsmp.cz",
  },
  {
    id: "sebestova-sarka",
    firstName: "Šárka",
    lastName: "Šebestová",
    labels: ["Mateřská škola"],
    position: "učitelka",
    email: "vavrincova@zsmp.cz",
  },
  {
    id: "zabelkova-marcela",
    firstName: "Marcela",
    lastName: "Zábelková",
    labels: ["Mateřská škola"],
    position: "učitelka",
    email: "zabelkova@zsmp.cz",
  },
  {
    id: "placha-miroslava",
    firstName: "Miroslava",
    lastName: "Plachá",
    labels: ["Mateřská škola"],
    position: "provozní pracovnice",
  },
  {
    id: "podraska-alzbeta",
    firstName: "Alžběta",
    lastName: "Podráská",
    labels: ["Mateřská škola"],
    position: "učitelka",
  },
  {
    id: "chudickova-pavla",
    firstName: "Pavla",
    lastName: "Chudíčková",
    labels: ["Mateřská škola"],
    position: "učitelka",
  },
  {
    id: "sladkova-veronika",
    firstName: "Veronika",
    lastName: "Sládková",
    labels: ["Mateřská škola"],
    position: "asistentka pedagoga",
  },
  {
    id: "koluchova-jana",
    firstName: "Jana",
    lastName: "Kolúchová",
    labels: ["Mateřská škola"],
    position: "asistentka pedagoga",
  },
  {
    id: "jochova-marie",
    firstName: "Marie",
    lastName: "Jochová",
    labels: ["Mateřská škola"],
    position: "provozní pracovnice",
  },
  {
    id: "cahova-pavlina",
    firstName: "Pavlína",
    lastName: "Cahová",
    labels: ["Rada školy: zástupci rodičů"],
  },
  {
    id: "janikova-barbora",
    firstName: "Barbora",
    lastName: "Janíková",
    labels: ["SRPDŠ"],
    position: "předsedkyně",
    email: "bara.janik@seznam.cz",
  },
  {
    id: "jindrova-veronika",
    firstName: "Veronika",
    lastName: "Jindrová",
    labels: ["Rada školy: zástupci rodičů", "SRPDŠ"],
    position: "místopředsedkyně",
    email: "Veronika.mickova@seznam.cz",
  },
  {
    id: "pavlickova-zuzana",
    firstName: "Zuzana",
    lastName: "Pavlíčková",
    labels: ["Rada školy: zástupci rodičů"],
  },
  {
    id: "horka-petra",
    titleBefore: "Mgr.",
    firstName: "Petra",
    lastName: "Horká",
    labels: ["Rada školy: zástupci zřizovatele"],
  },
  {
    id: "mertova-jolana",
    titleBefore: "Mgr.",
    firstName: "Jolana",
    lastName: "Mertová",
    labels: ["Rada školy: zástupci zřizovatele"],
  },
  {
    id: "tyzner-petr",
    firstName: "Petr",
    lastName: "Týzner",
    labels: ["Rada školy: zástupci zřizovatele"],
  },
  {
    id: "lovecka-dagmar",
    titleBefore: "Mgr.",
    firstName: "Dagmar",
    lastName: "Lovecká",
    labels: ["SRPDŠ"],
    position: "pokladník",
  },
];
