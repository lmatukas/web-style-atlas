# Web Style Atlas — kaip išbandyti

**Naudoti galima jau dabar:** paruošta 12 dizaino krypčių, 24 A/B puslapių
pavyzdžiai ir 48 kompiuterio bei telefono peržiūros. Visas 24 krypčių planas dar
nebaigtas. [Darbų būsena](docs/STATUS.md).

[Peržiūrėk paruoštas kryptis](catalog/index.md),
[tikrą kompiuterio peržiūrą](styles/swiss-grid/preview.png) arba
[telefono peržiūrą](styles/swiss-grid/preview-mobile.png).
Interaktyvi galerija paleidžiama vietoje pagal žemiau pateiktas komandas;
patvirtinto viešai veikiančio galerijos adreso šiuo metu nėra.

## Paprasčiausias praktinis bandymas

Atidaryk atskirą naujos svetainės projektą savo programavimo agente ir įklijuok
šį promptą, pakeitęs laužtiniuose skliaustuose esančius duomenis:

```text
Šiame projekte sukurk [svetainės paskirtis] svetainę su [technologija / platforma].
Auditorija, turinys, esamas prekės ženklas ir turimos nuotraukos: [trumpas briefas].
Dizaino krypčių ieškok https://github.com/lmatukas/web-style-atlas.
Perskaityk START_HERE.md vartotojo kelią ir catalog/index.json viename repo commit.
Parodyk iki trijų tinkamų, vizualiai skirtingų paruoštų krypčių su tikromis
peržiūromis, trumpu pagrindimu ir vienu kompromisu. Man pasirinkus perskaityk tik
pasirinktos krypties instrukcijas bei pavyzdžius. Išlaikyk jos 3–5 skiriamuosius
bruožus, pritaikyk mano turinį ir esamą prekės ženklą. Įrašyk design-decision.md
su repo commit, stiliaus ID, A/B variantu, pakeitimais ir naudojamų failų teisėmis.
Sukurk veikiančią svetainę šiame projekte. Patikrink nuorodas, valdiklius,
kompiuterio ir telefono vaizdą. Atlaso nekeisk ir jo užduoties neregistruok.
```

Jei nenori rinktis, pasirinkimo sakinį pakeisk į „Pats pasirink tinkamiausią
paruoštą kryptį ir iškart įgyvendink.“ Galima nurodyti ir konkretų katalogo ID bei
A/B variantą. Agentui reikia prieigos prie repo arba atitinkamų failų;
viena nuoroda automatiškai neįdiegia įgūdžio.

Pirmam bandymui pakanka mažos vieno puslapio paslaugų svetainės be nuotraukų.
Patikrink, ar agentas pasiūlė tikras kryptis, ar pasirinkti bruožai matomi
rezultate, ar veikia nuorodos ir ar telefonas gauna patogų išdėstymą.

## Galerija savo kompiuteryje

Reikia Node.js 24 ir npm:

```sh
git clone https://github.com/lmatukas/web-style-atlas.git
cd web-style-atlas
npm ci
npm run build
npm run dev
```

Atidaryk **http://127.0.0.1:4173/**. Galima filtruoti, perjungti A/B ir
Desktop/Mobile, palyginti iki trijų krypčių ir pasirinkus spausti
**Copy selection prompt**. Į kopiją pridėk savo briefą ir perduok agentui.
Paleidimas naudoja esamas peržiūras; Chromium galerijai nereikalingas.

## Kas patikrinta ir kokios ribos

[P10 bandyme](docs/benchmarks/p10/RESULTS.md) tikras mažesnis agentas sukūrė
šešias atskiras svetaines: tris fiksuotus briefus, vieną briefą trimis kryptimis
ir React adaptaciją. Galutiniai rezultatai patikrinti 360, 768 ir 1440 px
pločiuose. Išsaugoti tikslūs promptai, šaltiniai, aptikti trūkumai ir pataisymai.
Tai ne visų modelių ar jų vietinių programų suderinamumo garantija; tikslų lygį
rodo [suderinamumo lentelė](docs/compatibility.md).

Automatinės prieinamumo patikros nepakeičia pilnos WCAG peržiūros. Pavyzdžių
įmonės ir duomenys išgalvoti; realias formas, mokėjimus ir kitas integracijas
reikia įgyvendinti savo projekte. Originalumui ar tinkamumui visiems prekės
ženklams garantijos nėra.

Nuosavas kodas ir tekstai licencijuoti [MIT](LICENSE). Nuotraukoms galioja jų
atskiros teisės: perskaityk pasirinkto stiliaus `assets.json`, teisių failą ir
[pranešimus](THIRD_PARTY_NOTICES.md). Šrifto failų nepridedame.

[English README ir patikrų komandos](README.md) ·
[Naujo stiliaus papildymo eiga](CONTRIBUTING.md).
