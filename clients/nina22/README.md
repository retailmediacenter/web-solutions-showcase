# NINA 22 — RMC Web Solutions / prvi klijentski demo

**Status:** samostalni funkcionalni HTML/CSS/JS demo, 29.09.2026. Sadržaj i fotografije čekaju odobrenje Marine. **Ovaj ZIP nije build postojećeg V47 generatora** i ne menja njegov kod. U folderu `adapter/` je predlog povezivanja koji treba prilagoditi stvarnoj završenoj V47 arhitekturi.

## Kako da odmah pogledaš sajt

Dvaput klikni na **`index.html`**. Sajt, slike i video su lokalni i ne koriste spoljnu biblioteku, CDN ili API. Mobilni prikaz možeš da testiraš u browser developer tools.

Uključeno: HERO (16:9 fotografija na mobilnom), sticky navigacija i mobilni CTA; šest kartica Usluge; četiri kartice Izdvajamo sa popup detaljima; Naš rad sa dostavljenim video-snimkom **mašinskog čišćenja hodnika**; demonstracioni promotivni materijal i rezervisano mesto za fotografije objekata; odvojena HYBRID sekcija dubinskog čišćenja **bez izmišljenih fotografija**; O nama; kontakt i funkcionalan demo-upit.

## Objavljivanje na GitHub Pages

1. Napravi nov repozitorijum, npr. `rmc-web-solutions-showcase` ili `nina22-demo`. Može da bude javan samo ako imaš Marininu dozvolu za objavljivanje dostavljenog promotivnog materijala i kontakt-podataka.
2. Raspakuj ZIP i **pošalji njegov sadržaj**, ne sam ZIP. `index.html` treba da bude u korenu repozitorijuma, zajedno sa `assets/`, `data/`, `scripts/` itd.
3. U repozitorijumu otvori **Settings → Pages → Build and deployment → Deploy from a branch**, izaberi `main` i `/(root)` pa sačuvaj. Sačekaj da GitHub objavi Pages link.
4. Demo ima `noindex, nofollow` meta-oznaku i `robots.txt` koji zabranjuje indeksiranje. Pre zvanične objave, uz odobrenje klijenta, ukloni tu zabranu i gornju demo traku.

Za kasnije preseljenje pod npr. `/web-solutions/demo/nina22/`, prekopiraj sadržaj foldera u tu putanju. Linkovi za slike, CSS, skripte i video su relativni (nema vezivanja za određeni domen).

## Kako se menjaju tekstovi i boje

**Jedini izvor tekstualnog sadržaja:** `data/site.json`. Tu su firma, SEO, HERO, sve usluge, popup tekstovi, reference, o nama, kontakt i HYBRID čišćenje. **Boje:** `data/theme.json`.

Sadržaj u `index.html` je *generisani izlaz*, zato promene u JSON fajlu zahtevaju ponovno generisanje. Na računaru sa instaliranim Node.js 18+ u korenu projekta pokreni:

```bash
npm run build
```

Nisu potrebni `npm install`, tokeni ni API ključevi. Skripta `scripts/build.mjs` ponovo pravi `index.html` i `assets/css/theme.css`. Ponovo pošalji izmenjene fajlove na GitHub. Ako se samo zameni postojeća fotografija identičnim imenom, build nije potreban.

## Slike i video

| Fajl | Poreklo / status | Akcija |
| --- | --- | --- |
| `assets/images/hero-zgrada-demo.webp` | Isečak iz dostavljene promotivne Instagram objave | **Zameniti** originalnom odobrenom 16:9 fotografijom zgrade. Trenutna slika u desktop HERO-u prikazuje portretni kadar unutar dizajna. |
| `assets/images/nina22-instagram-promo.webp` | Dostavljen promotivni materijal sa Instagram objave | Potvrditi da li treba da ostane u galeriji. **Ne prikazujemo ga kao dokaz da je određena zgrada klijent.** |
| `assets/video/odrzavanje-hodnika.mp4` | Dostavljeni video mašinskog čišćenja zajedničkih prostora | Već uključen; proveriti saglasnost za javno objavljivanje. |
| `assets/images/placeholder-building.svg` | Privremena ilustracija | Zameniti fotografijama zgrada i potvrđenim nazivima/referencama. |
| `assets/images/placeholder-cleaning.svg` | Privremena ilustracija sofe | Zameniti originalnim fotografijama i zasebnim videom dubinskog čišćenja kada stignu. |
| `assets/images/brand-mark.svg` | Privremena stilizovana oznaka NINA 22 | Zameniti tačnim originalnim logotipom kada ga Marina dostavi. |

Prateći poster videa je u `assets/images/ciscenje-hodnika-poster.webp`.

## Kontakt-formular — šta radi, a šta ne

Kontakt-formular proverava obavezna polja (**ime, telefon, usluga, poruka**), priprema personalizovan email za `nina22.agencija@gmail.com`, nudi dugme za otvaranje email aplikacije i alternativno kopiranje pripremljenog upita. Iz sekcije dubinskog čišćenja odgovarajuća usluga se unapred bira u formularu.

**Nema backend slanja niti se podaci čuvaju.** Formular korisniku izričito kaže da poruka **nije poslata** dok je sam ne pošalje iz email aplikacije. Za stvarnog klijenta pre objave povezati sa odobrenim RMC backendom/form-servisom, obezbediti zaštitu od spama i uskladiti tekst o obradi ličnih podataka.

Direktan klik na telefon, email i Instagram funkcioniše nezavisno od demo-formulara.

## Integracija sa Web Solutions nakon V47

- `adapter/web-solutions-mapping.json` sadrži **predložene** sekcije i mesta za mapiranje (Hero, Services, Izdvajamo, Primeri, Hybrid Secondary, About, Contact). Nazivi su kandidati, **nisu potvrđena imena postojećih modula**.
- Editor treba da menja klijentski sadržaj i reference na slike preko konačne sheme. Strukturu treba prilagoditi stvarnoj V47 završnoj verziji, **bez pravljenja paralelnog Registry-ja**.
- Advisor ostaje izvor poslovnog značenja i plana modula. Postojeći Business Registry zadržava samo poslovne činjenice i asset namespace; ne prenose se renderer, CTA niti redosled sekcija u njega.
- Ne kopirati `assets/css/site.css` ili `assets/js/site.js` preko produkcionih komponenti generatora bez mapiranja i testiranja. Ovo je privremena izolovana klijentska prezentacija.

## Otvorene stavke pre javne objave

- Marina potvrđuje finalan naziv, poslovne podatke i područje rada.
- Dostavlja **originalni** logo, fotografije objekata i zaseban video dubinskog čišćenja.
- Odobrava tekstove, pravo korišćenja materijala i sve tvrdnje o načinu rada. U demo nismo preuzeli tvrdnju o 24/7 dostupnosti kao potvrđenu garanciju.
- Proveriti status domena `nina22.rs` ako će se koristiti.
- Povezati kontakt-formu sa stvarnim slanjem i pripremiti informacije o privatnosti pre produkcije.

**Sve trenutno prikupljeno je u jednom klijentskom folderu.** Ovde ne uvodimo novu verziju Web Solutions generatora i ne ometamo postojeći Codex rad na V47.
