// Myšák – "Malé etudy pro klávesnici a myš" (originally by EDGERING.ORG, 2012), rewritten for this site
export type Exercise = {
  slug: string;
  number: number;
  title: string;
  task: string;
  hint?: string;
  info: string;
};

export const exercises: Exercise[] = [
  {
    slug: "skladanka",
    number: 1,
    title: "Skládanka",
    task: "Úkolem je složit skládanku přetahováním dílků pomocí myši.",
    hint: "Posuvníky si můžeš měnit počet dílů. Dílky lze také prohodit kliknutím na dva z nich.",
    info: "Trénink jemné motoriky při práci s myší. Cvičení používá obvyklé ovládací prvky – klikání, tažení a skrolování. Prověřuje schopnost orientace a organizace objektů v prostoru okna. Variace dílků znázorňuje komutační pravidla násobilky.",
  },
  {
    slug: "klik-a-dvojklik",
    number: 2,
    title: "Klik a dvojklik",
    task: "Kliknutím rozsviť žlutá a fialová pole.",
    hint: "Fialové pole rozsvítíš kliknutím, žluté dvojklikem. Pozor na šedá pole, kliknutí na ně celý obrazec zamíchá!",
    info: "Koordinované používání kliku a dvojkliku může sloužit jednak ke zklidnění a soustředěnosti a zároveň trénuje přesnost při umisťování kurzoru myši. Při snaze dosáhnout co nejnižšího času splnění dochází k rozhodování o ideální strategii na základě symetrického uspořádání.",
  },
  {
    slug: "rozhazene-barvy",
    number: 3,
    title: "Rozházené barvy",
    task: "Tvým úkolem je označit myší všechny dvojice stejných barev.",
    hint: "Klikni postupně na dvě pole se stejnou barvou.",
    info: "Cvičení aktivuje obě mozkové hemisféry a odhaluje cit a míru schopnosti rozlišovat odstíny barev. Vícerozměrné mřížky nabízejí větší škálu odstínů jedné barvy a umožní tak odhalit vysokou rozlišovací schopnost u toho, kdo cvičení zvládne.",
  },
  {
    slug: "skladani-slov",
    number: 4,
    title: "Skládání slov",
    task: "Úkolem je poskládat co nejvíce slov. Písmenka se přetahují myší.",
    hint: "Písmenko můžeš také přesunout kliknutím na něj a pak na místo, kam patří. Nápověda ukáže první a poslední písmeno.",
    info: "Cvičení trénuje jemnou motoriku při přetahování objektů myší. Při hledání slov se posiluje přirozená dovednost vnímání slov jako celku, čímž je aktivováno zároveň centrum řeči (Brocovo centrum).",
  },
  {
    slug: "znaky-klavesnice",
    number: 6,
    title: "Znaky klávesnice",
    task: "Úkolem je opsat co nejvíce slov v co nejkratším čase.",
    hint: "Správně opsané slovo se samo započítá. Enter u chybného opisu se počítá jako chyba.",
    info: "Toto cvičení nabízí nekonečné množství kombinací všech viditelných znaků, které nabízí klávesnice. Po správném opsání se slovo započítá, stejně tak každý neplatný pokus. Různé úrovně obtížnosti se liší použitými skupinami znaků.",
  },
  {
    slug: "prehazene-letopocty",
    number: 10,
    title: "Přeházené letopočty",
    task: "Pomocí schránky a klávesnice vzestupně uspořádej jednotlivé události.",
    hint: "Kromě schránky (Ctrl+X, Ctrl+V) jsou k dispozici jen klávesy Delete, Backspace, Enter a šipky. Myš nepoužívej, kliknutí do textu události znovu zamíchá.",
    info: "Cvičení je zaměřeno na používání schránky. Kromě toho testuje orientaci v textu a schopnost organizace v prostoru okna. V textu je znepřístupněno psaní, aby bylo nutné veškeré úpravy provádět pomocí kopírování nebo přesouvání. Práci značně zjednodušuje znalost kombinace kurzorových kláves společně s klávesou Ctrl.",
  },
  {
    slug: "rozhazeny-text",
    number: 11,
    title: "Rozházený text",
    task: "Tvým úkolem je sestavit rozházený text bajky do původní podoby.",
    hint: "Odstraň zalomení řádků, přebytečné mezery a znaky, které do textu nepatří, a nezapomeň na mezery za čárkami.",
    info: "Cvičení prověřuje pokročilou orientaci v textu. Od úrovně 4 nabízí kromě mezer a prázdných řádků navíc nástrahy v podobě znaků, které do textu nepatří. Nejvyšší úroveň přidá do textu 60 procent poruch.",
  },
  {
    slug: "jak-rychle-pises",
    number: 12,
    title: "Jak rychle píšeš?",
    task: "Zjisti, jak rychle píšeš!",
    hint: "Zvol obtížnost a rychlost, stiskni Start a piš znaky, které se objevují.",
    info: "Cvičení, pomocí kterého lze monitorovat vývoj orientace na klávesnici. Díky rozložení na jednotlivé znaky lze sledovat a zároveň trénovat specifické oblasti znaků.",
  },
];

export const getExercise = (slug: string) => exercises.find((e) => e.slug === slug);
