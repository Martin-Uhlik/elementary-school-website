import type { Photo } from "./types";

export const photos: Photo[] = [
  { id: "carousel-1", src: "/data/images/carousel_1.jpg", alt: "Fotografie školy" },
  { id: "carousel-2", src: "/data/images/carousel_2.jpg", alt: "Chemická učebna" },
  { id: "carousel-3", src: "/data/images/carousel_3.jpg", alt: "Jazyková učebna" },
  { id: "carousel-4", src: "/data/images/carousel_4.jpg", alt: "Školní jídelna" },
  { id: "carousel-5", src: "/data/images/carousel_5.jpg", alt: "Školní jídelna" },
  { id: "carousel-6", src: "/data/images/carousel_6.jpg", alt: "Tělocvična" },
  { id: "carousel-7", src: "/data/images/carousel_7.jpg", alt: "Šatny" },
];

// Pictures for the Skládanka puzzle (informatika/mysak): our own illustrations, free to use
export const puzzlePictures: Photo[] = [
  { id: "puzzle-louka", src: "/data/images/puzzle/louka.svg", alt: "Obrázek: louka s domečkem, sluníčkem a beruškou" },
  {
    id: "puzzle-more",
    src: "/data/images/puzzle/more-dno.svg",
    alt: "Obrázek: mořské dno s rybkami, chobotnicí a krabem",
  },
  {
    id: "puzzle-vesmir",
    src: "/data/images/puzzle/vesmir.svg",
    alt: "Obrázek: vesmír s raketou, planetami a létajícím talířem",
  },
  {
    id: "puzzle-statek",
    src: "/data/images/puzzle/statek.svg",
    alt: "Obrázek: statek s kravičkou, slepičkou a prasátkem",
  },
  { id: "puzzle-zima", src: "/data/images/puzzle/zima.svg", alt: "Obrázek: zimní krajina se sněhulákem a chaloupkou" },
];
