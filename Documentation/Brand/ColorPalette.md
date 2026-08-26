# Color Palette

Zdroj: brand board (eukalyptus, broskvová, slonová kost, pistácie, hlína).  
Tyto hodnoty jsou závazné pro web, prezentace i sociální sítě.

## Core swatches

| Token        | Name (EN)  | Name (CS)     | Hex       | RGB              | Použití |
| ------------ | ---------- | ------------- | --------- | ---------------- | ------- |
| `eucalyptus` | Eucalyptus | Eukalyptus    | `#CDD4B1` | `205, 212, 177`  | Plochy, pruhy, měkké bloky, hover na světlém pozadí |
| `peach`      | Peach      | Broskvová     | `#FEECD0` | `254, 236, 208`  | Hero, teplé sekce, karty |
| `ivory`      | Ivory      | Slonová kost  | `#FFF9E2` | `255, 249, 226`  | Základní pozadí stránky |
| `pistachio`  | Pistachio  | Pistácie      | `#EBECCC` | `235, 236, 204`  | Střídavé sekce, jemný kontrast k ivory |
| `clay`       | Clay       | Hlína         | `#DCA278` | `220, 162, 120`  | Primární akcent, tlačítka, podtržení, logo |

## Derived tokens

Čistá paleta je světlá — pro text, stavy a kontrast z ní odvozujeme tmavší tóny (nečistá černá, ne chladná šedá).

| Token            | Hex       | Vznik                         | Použití |
| ---------------- | --------- | ----------------------------- | ------- |
| `ink`            | `#2C281F` | teplá kůra                    | Hlavní text, nadpisy |
| `ink-soft`       | `#5C5648` | zesvětlený ink                | Podnadpisy, odstavce |
| `bark`           | `#6B4F38` | ztmavený clay                 | Odkazy, ikony |
| `clay-deep`      | `#C48655` | clay −12 %                    | Hover tlačítka |
| `clay-press`     | `#B06F3E` | clay −22 %                    | Active / focus fill |
| `eucalyptus-deep`| `#9AA67A` | eukalyptus ztmavený           | Linky, chipy |
| `leaf`           | `#4F5840` | olivový z eukalyptu           | Patička, silný text na světlé zelené |
| `foam`           | `#FFFDF6` | ivory + bílý závoj            | Vnitřek karet, inputy |

## Contrast rules

- Běžný text vždy `ink` nebo `leaf` na `ivory` / `peach` / `pistachio` / `eucalyptus`.
- `clay` **není** barva písma na `ivory` — na malém textu neprojde kontrast.
- Primární tlačítko: pozadí `clay`, text `ink` (ne bílá).
- Sekundární tlačítko: průhledné / `foam`, rámeček `leaf`, text `ink`.
- Nepoužívat čistou černou `#000` ani chladnou šedou.

## Do / don’t

**Do**

- Teplé přechody `peach → ivory` nebo `pistachio → eucalyptus`.
- Hodně vzduchu, málo čar. Akcent `clay` jen na jedné věci v záběru (CTA, tečka, podtržení).
- Fotografie s eukalyptem, lnem, keramikou, denním světlem.

**Don’t**

- Neon, čistá bílá plocha, chladná ocel, fialové AI přechody.
- Celá stránka v `clay`.
- Bílý text na `peach` nebo `pistachio`.

## CSS

Tokeny žijí v [`colors.css`](./colors.css). Web je importuje jako jediný zdroj pravdy.
