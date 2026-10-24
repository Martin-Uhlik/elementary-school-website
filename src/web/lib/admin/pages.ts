import { navigation, type NavLink } from "@/lib/navigation";

const extra: Record<string, string> = { "/": "Hlavní strana", "/rodice/zapis": "Zápis do 1. třídy" };

// The menu name of a page of the site, for headings in the admin
export const pageName = (route: string) => {
  const links: NavLink[] = navigation.flatMap((item) => ("children" in item ? item.children : [item]));
  return links.find((link) => link.href === route)?.label ?? extra[route] ?? route;
};
