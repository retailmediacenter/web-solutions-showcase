# RMC Web Solutions — showcase

Ovaj repozitorijum sluzi za **demonstracione klijentske sajtove**. Izvorni kod Web Solutions generatora i Editora ostaje u zasebnom repozitorijumu.

## Sadrzaj

- `index.html` — ulazna showcase galerija.
- `clients/nina22/` — kompletan samostalni demo za NINA 22.
- `clients/nina22/data/site.json` — sadrzaj sajta, jedini izvor tekstova.
- `clients/nina22/data/theme.json` — paleta boja.
- `clients/nina22/adapter/web-solutions-mapping.json` — PREDLOG mapiranja, nije dokaz kompatibilnosti sa V47.

## Objavljivanje

1. Raspakovati ZIP pa postaviti **njegov sadrzaj** u koren GitHub repozitorijuma `web-solutions-showcase` (ne postavljati ZIP kao fajl).
2. GitHub: Settings > Pages > Build and deployment > Deploy from a branch > `main` > `/(root)` > Save.
3. Otvoriti Pages adresu repozitorijuma: koren prikazuje galeriju; `clients/nina22/` otvara klijentski demo.

**Oprez:** GitHub Pages objava je javna. Pre objavljivanja proveriti dozvole Marine za promotivni materijal, snimke i kontakt podatke. Sajtovi u ovom paketu imaju `noindex`, ali to ne znaci privatni pristup.

## NINA 22 — lokalno uredjivanje

U folderu `clients/nina22/` procitati detaljan `README.md`. Zamena teksta vrsi se u `data/site.json`, zamena boja u `data/theme.json` i zatim u tom istom folderu pokretanjem `npm run build` (Node 18+; nema dodatnih paketa). Za nove slike moguce je zameniti datoteke istim imenom u `assets/images/`.

## Sledeci koraci

- Originalni logo, foto objekata i video dubinskog ciscenja nakon dostave Marine.
- Provera i odobravanje sadrzaja pre produkcione verzije.
- Povezivanje forme sa odobrenim backendom pre realnog prijema upita; trenutna forma samo priprema email.
- Naknadno stvarno mapiranje na zavrsenu V47 arhitekturu i Editor. NE kopirati klijentski JS/CSS preko Web Solutions generatora.
- Kasnije migracija statickog showcase sadrzaja pod `retailmediacenter.com/web-solutions/demo/`.

Nijedna izmena iz ovog repozitorijuma ne menja razvojnu granu postojeceg Web Solutions generatora.
