export type NavLink = { href: string; label: string };
export type NavItem = NavLink | { label: string; prefix: string; children: NavLink[] };

// Main menu, ported from html/data/header.html
export const navigation: NavItem[] = [
  { href: "/", label: "Hlavní strana" },
  { href: "/uredni-deska", label: "Úřední deska" },
  { href: "/kontakty", label: "Kontakty" },
  {
    label: "Organizace",
    prefix: "/organizace",
    children: [
      { href: "/organizace/prubeh-skolniho-roku", label: "Průběh školního roku" },
      { href: "/organizace/rada-skoly", label: "Rada školy" },
      { href: "/organizace/srpds", label: "SRPDŠ" },
      { href: "/organizace/eduroam", label: "Eduroam" },
      { href: "/organizace/skola", label: "Škola" },
      { href: "/organizace/druzina", label: "Družina" },
      { href: "/organizace/materska-skola", label: "Mateřská škola" },
      { href: "/organizace/historie", label: "Historie" },
    ],
  },
  { href: "/dokumenty", label: "Dokumenty" },
  { href: "/foto-video", label: "Foto a Video" },
  { href: "/jidelna", label: "Jídelna" },
  {
    label: "Rodiče",
    prefix: "/rodice",
    children: [
      { href: "/rodice/oznameni-fromulare", label: "Oznámení, formuláře" },
      { href: "/rodice/odkazy", label: "Odkazy" },
      // { href: "/rodice/zapis", label: "Zápis do 1. třídy" },
    ],
  },
  { href: "/hala", label: "Hala" },
  { href: "/informatika", label: "Informatika" },
];

// pages that belong to a menu item without being listed in it
const aliases: Record<string, string> = {
  "/archiv": "/foto-video",
  "/galerie": "/foto-video",
};

export function isActive(pathname: string, item: NavItem): boolean {
  const path = Object.entries(aliases).find(([from]) => pathname.startsWith(from))?.[1] ?? pathname;
  if ("children" in item) return path.startsWith(item.prefix);
  return item.href === "/" ? path === "/" : path === item.href || path.startsWith(item.href + "/");
}
