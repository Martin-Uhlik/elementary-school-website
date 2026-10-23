import Link from "next/link";

// Ported from html/informatika.html
const InformatikaPage = () => {
  return (
    <>
      <div className="body">
        <div className="article">
          <hr className="article__line" />
          <div className="article__section">
            <h1>Informatika</h1>

            <h2>Myš a klávesnice</h2>
            <table className="inf">
              <tbody>
                <tr>
                  <td>
                    <Link href="/informatika/mysak/skladanka">Skládanka</Link>
                  </td>
                  <td>
                    <Link href="/informatika/mysak/klik-a-dvojklik">Klik a dvojklik</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href="/informatika/mysak/rozhazene-barvy">Rozházené barvy</Link>
                  </td>
                  <td>
                    <Link href="/informatika/mysak/skladani-slov">Skládání slov</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href="/informatika/mysak/znaky-klavesnice">Znaky klávesnice</Link>
                  </td>
                  <td>
                    <Link href="/informatika/mysak/prehazene-letopocty">Přeházené letopočty</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href="/informatika/mysak/rozhazeny-text">Rozházený text</Link>
                  </td>
                  <td>
                    <Link href="/informatika/mysak/jak-rychle-pises">Jak rychle píšeš</Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />

            <h2>Práce s daty</h2>
            <table className="inf">
              <tbody>
                <tr>
                  <td>
                    <a href="https://pracesdaty.zcu.cz/index.php/co-jsou-data" target="_blank">
                      Víme, co jsou data (Známe data)
                    </a>
                  </td>
                  <td>
                    <a href="https://pracesdaty.zcu.cz/index.php/evidujeme-data" target="_blank">
                      Evidujeme data
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://pracesdaty.zcu.cz/index.php/kontrolujeme-data" target="_blank">
                      Kontrolujeme data
                    </a>
                  </td>
                  <td>
                    <a href="https://pracesdaty.zcu.cz/index.php/filtrujeme-tridime-a-radime" target="_blank">
                      Filtrujeme data
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://pracesdaty.zcu.cz/index.php/porovnavame-a-dokazeme-prezentovat" target="_blank">
                      Porovnáváme data
                    </a>
                  </td>
                  <td>
                    <a href="https://pracesdaty.zcu.cz/index.php/resime-problemy" target="_blank">
                      Řešíme data
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />

            <h2>Programování H</h2>
            <table className="inf">
              <tbody>
                <tr>
                  <td>
                    <a href="https://studio.code.org/hoc/1?lang=cs-CZ" target="_blank">
                      Bludiště programování
                    </a>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <a href="https://studio.code.org/flappy/1?lang=cs-CZ" target="_blank">
                      Flappy Bird programování
                    </a>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <a href="https://studio.code.org/s/frozen/lessons/1/levels/1?lang=cs-CZ" target="_blank">
                      Frozen programování
                    </a>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />

            <h2>Programování 1</h2>
            <table className="inf">
              <tbody>
                <tr>
                  <td>
                    <a href="informatika/programovani1/Kap1_zakovske_listy.pdf" target="_blank">
                      Kapitola 1, žákovské listy
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/268054172" target="_blank">
                      projekt Vlak
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="informatika/programovani1/Kap2_zakovske_listy.pdf" target="_blank">
                      Kapitola 2, žákovské listy
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/393947156" target="_blank">
                      projekt Digitální číslice
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="informatika/programovani1/Kap3_zakovske_listy.pdf" target="_blank">
                      Kapitola 3, žákovské listy
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/393947092" target="_blank">
                      projekt Písmena a slova
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/268054710" target="_blank">
                      projekt Kreslení
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/266483510" target="_blank">
                      projekt Navigace
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />

            <h2>Programování 2</h2>
            <table className="inf">
              <tbody>
                <tr>
                  <td>
                    <a href="informatika/programovani2/Kap4_zakovske_listy.pdf" target="_blank">
                      Kapitola 4, žákovské listy
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/393947092" target="_blank">
                      projekt Písmena a slova
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="informatika/programovani2/Kap5_zakovske_listy.pdf" target="_blank">
                      Kapitola 5, žákovské listy
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/323965909" target="_blank">
                      projekt Mosty
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="informatika/programovani2/Kap6_zakovske_listy.pdf" target="_blank">
                      Kapitola 6, žákovské listy
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/269484842" target="_blank">
                      projekt Tanec
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/268054968" target="_blank">
                      projekt Balónek na poušti
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />

            <h2>Programování 3</h2>
            <table className="inf">
              <tbody>
                <tr>
                  <td>
                    <a href="informatika/programovani3/Kap7_zakovske_listy.pdf" target="_blank">
                      Kapitola 7, žákovské listy
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/269484444/" target="_blank">
                      projekt Bludiště
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="informatika/programovani3/Kap8_zakovske_listy.pdf" target="_blank">
                      Kapitola 8, žákovské listy
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/269484201" target="_blank">
                      projekt Vesmír
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="informatika/programovani3/Kap9_zakovske_listy.pdf" target="_blank">
                      Kapitola 9, žákovské listy
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/268054710" target="_blank">
                      projekt Kreslení
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="informatika/programovani3/Kap10_zakovske_listy.pdf" target="_blank">
                      Kapitola 10, žákovské listy
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/266483510" target="_blank">
                      projekt Navigace
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="informatika/programovani3/Sbirka_uloh.pdf" target="_blank">
                      Sbírka úloh
                    </a>
                  </td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/393946912" target="_blank">
                      projekt Souřadnice
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/302050580" target="_blank">
                      projekt Animace
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/393947092" target="_blank">
                      projekt Písmena a slova
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/319289868" target="_blank">
                      projekt Pila
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/393946387" target="_blank">
                      projekt Házení kostkou
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/269483494" target="_blank">
                      projekt Autodráha
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/323965909" target="_blank">
                      projekt Mosty
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/269484842" target="_blank">
                      projekt Tanec
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/268054968" target="_blank">
                      projekt Balónek
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/393947008" target="_blank">
                      projekt Ke mně
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/301870071" target="_blank">
                      projekt Akvárium
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <a href="https://scratch.mit.edu/projects/269483720" target="_blank">
                      projekt Kouzelník
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />

            <h2>3D - Tinkercad - Autodesk</h2>
            <table className="inf">
              <tbody>
                <tr>
                  <td>
                    <a href="https://www.tinkercad.com/joinclass/5FXP5KC8F" target="_blank">
                      6. třída chlapci
                    </a>
                  </td>
                  <td>
                    <a href="https://www.tinkercad.com/joinclass/D5GD1Q69F" target="_blank">
                      6. třída děvčata
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://www.tinkercad.com/joinclass/Y6FU9WA1C" target="_blank">
                      7. třída chlapci
                    </a>
                  </td>
                  <td>
                    <a href="https://www.tinkercad.com/joinclass/3YUUHMK8P" target="_blank">
                      7. třída děvčata
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://www.tinkercad.com/joinclass/P8GWITA9W" target="_blank">
                      8. třída chlapci
                    </a>
                  </td>
                  <td>
                    <a href="https://www.tinkercad.com/joinclass/87UG1UUKR" target="_blank">
                      8. třída děvčata
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://www.tinkercad.com/joinclass/5W9N49J8A" target="_blank">
                      9. třída chlapci
                    </a>
                  </td>
                  <td>
                    <a href="https://www.tinkercad.com/joinclass/XKVHFTDEI" target="_blank">
                      9. třída děvčata
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />

            <h2>Teorie</h2>
            <table className="inf">
              <tbody>
                <tr>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT6roc_41_B" target="_blank">
                      41. Základní pojmy (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT6roc_41_C" target="_blank">
                      41. Základní pojmy (test)
                    </a>
                  </td>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT6roc_42_B" target="_blank">
                      42. Typy počítačů (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT6roc_42_C" target="_blank">
                      42. Typy počítačů (test)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT6roc_43_B" target="_blank">
                      43. Vnitřní stavba počítačů (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT6roc_43_C" target="_blank">
                      43. Vnitřní stavba počítačů (test)
                    </a>
                  </td>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT6roc_44_B" target="_blank">
                      44. Síť Internet (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT6roc_44_C" target="_blank">
                      44. Síť Internet (test)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT7roc_45_B" target="_blank">
                      45. Magnetická datová média (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT7roc_45_C" target="_blank">
                      45. Magnetická datová média (test)
                    </a>
                  </td>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT7roc_46_B" target="_blank">
                      46. Optická datová média (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/462-opticka-datova-media-test" target="_blank">
                      46. Optická datová média (test)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT7roc_47_B" target="_blank">
                      47. Elektronická datová média (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT7roc_47_C" target="_blank">
                      47. Elektronická datová média (test)
                    </a>
                  </td>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT7roc_48_B" target="_blank">
                      48. Základy počítačové grafiky (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT7roc_48_C" target="_blank">
                      48. Základy počítačové grafiky (test)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT7roc_49_B" target="_blank">
                      49. Grafické vlastnosti a formáty (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT7roc_49_C" target="_blank">
                      49. Grafické vlastnosti a formáty (test)
                    </a>
                  </td>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_50_B" target="_blank">
                      50. Vstupní periferní zařízení (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_50_C" target="_blank">
                      50. Vstupní periferní zařízení (test)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_51_B" target="_blank">
                      51. Výstupní periferní zařízení (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_51_C" target="_blank">
                      51. Výstupní periferní zařízení (test)
                    </a>
                  </td>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_52_B" target="_blank">
                      52. Rozhraní počítače (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_52_C" target="_blank">
                      52. Rozhraní počítače (test)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_53_B" target="_blank">
                      53. Základy počítačových sítí (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_53_C" target="_blank">
                      53. Základy počítačových sítí (test)
                    </a>
                  </td>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_54_B" target="_blank">
                      54. Topologie počítačových sítí (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_54_C" target="_blank">
                      54. Topologie počítačových sítí (test)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_55_B" target="_blank">
                      55. Síťové prvky (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT8roc_55_C" target="_blank">
                      55. Síťové prvky (test)
                    </a>
                  </td>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT9roc_56_B" target="_blank">
                      56. Software (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT9roc_56_C" target="_blank">
                      56. Software (test)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT9roc_57_B" target="_blank">
                      57. Operační systémy (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT9roc_57_C" target="_blank">
                      57. Operační systémy (test)
                    </a>
                  </td>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT9roc_58_B" target="_blank">
                      58. Škodlivý software (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT9roc_58_C" target="_blank">
                      58. Škodlivý software (test)
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT9roc_59_B" target="_blank">
                      59. Organizace a zálohování dat (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT9roc_59_C" target="_blank">
                      59. Organizace a zálohování dat (test)
                    </a>
                  </td>
                  <td>
                    <a href="https://dum.hajduch.net/VY_32_INOVACE_1ICT9roc_60_B" target="_blank">
                      60. Historie počítačů (studium)
                    </a>
                    <br />{" "}
                    <a href="https://dum.hajduch.net/602-historie-pocitacu-test" target="_blank">
                      60. Historie počítačů (test)
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default InformatikaPage;
